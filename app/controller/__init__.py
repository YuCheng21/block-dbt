from sys import _getframe
import logging

from flask import Flask, render_template, g, request, make_response, flash, redirect, current_app
from easydict import EasyDict as edict

from app.config.flask_cfg import config as flask_config
from app.config.logger_cfg import console_logger, file_logger
from app.config.base import settings
from app.config.api import url
from app.config.exception import exception_code
from app.config.endpoint import endpoint


def create_app():
    app = Flask(__name__)
    app.config.from_object(flask_config[settings.mode])
    app.static_folder = settings.project_path.joinpath('app', 'static').absolute()
    app.template_folder = settings.project_path.joinpath('app', 'views').absolute()

    app.logger.setLevel(logging.DEBUG)
    app.logger.addHandler(console_logger())
    app.logger.addHandler(file_logger())

    with app.app_context():
        from app.routes.web import init_blueprint
        init_blueprint()
        app.my_route = get_my_route()

    @app.before_request
    def before_request():
        g.route = app.my_route

        g.website_name = settings.website_name
        g.url = url
        g.debug = app.config.get('DEBUG')

        g.endpoint = endpoint

    @app.errorhandler(404)
    def not_found(e):
        title = '訪問頁面失敗'
        return render_template('./404.html', **locals())

    @app.errorhandler(500)
    def internal_server_error(e):
        title = '伺服器錯誤'
        return render_template('./500.html', **locals())

    # @app.errorhandler(Exception)
    # def handle_exception(exception):
    #     if exception.args[0] in exception_code.dict().values():
    #         flash(exception.args[0], category='error')
    #         return redirect(request.referrer)
    #     current_app.logger.error(f'error msg: {exception}')
    #     title = '例外錯誤'
    #     return render_template('./exception.html', **locals())

    @app.route('/file/plain-text/<file_name>')
    def plain_text(file_name):
        content = request.args.get('file_content') if request.args.get('file_content') is not None else 'empty'
        response = make_response(content)
        # response.headers['Content-Disposition'] = f"attachment; filename={file_name}"  # directly download
        response.mimetype = 'text/plain'
        return response

    return app, settings


def get_my_route() -> edict:
    rules_by_endpoint = current_app.url_map.__dict__['_rules_by_endpoint']
    my_rules = [dict(endpoint=v[0].endpoint, rule=v[0].rule, args=list(v[0].arguments)
                     ) for k, v in rules_by_endpoint.items()]
    my_route = {}
    for k, v in enumerate(my_rules):
        ll = v['endpoint'].split('.')
        point = my_route
        while len(ll) != 0:
            point = point.setdefault(ll[0], {})
            ll.pop(0)
        point.setdefault('endpoint', v['endpoint'])
        point.setdefault('rule', v['rule'])
        point.setdefault('args', v['args'])
    return edict(my_route)


class BasicController:
    def add_decorator(self, decorator):
        self_name = _getframe().f_code.co_name  # add_decorator
        for attribute in dir(self):
            attribute_value = getattr(self, attribute)
            if attribute.startswith('__') is False and attribute != self_name:
                if callable(attribute_value) is True:
                    setattr(self, attribute, decorator(attribute_value))
                else:
                    getattr(attribute_value, self_name)(decorator)
