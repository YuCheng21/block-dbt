import logging

from flask import Flask, render_template, g, request, make_response, Blueprint
from easydict import EasyDict as edict

from app.config.flask_cfg import config as flask_config
from app.config.logger_cfg import console_logger, file_logger
from app.config.base import settings
from app.config.api import url
from app.config.endpoint import endpoint

# from app.controller.user import user
# from app.controller.oauth import oauth
# from app.controller.exp import exp
from app.routes.web import user, oauth, exp

from app.middleware.authenticate import Authenticate


def create_app():
    app = MyFlask(__name__)
    app.config.from_object(flask_config[settings.mode])
    app.static_folder = settings.project_path.joinpath('app', 'static').absolute()
    app.template_folder = settings.project_path.joinpath('app', 'views').absolute()

    app.register_middleware(oauth, Authenticate.user())
    app.register_middleware(exp, Authenticate.user())

    app.register_blueprint(user)
    app.register_blueprint(oauth)
    app.register_blueprint(exp)

    app.logger.setLevel(logging.DEBUG)
    app.logger.addHandler(console_logger())
    app.logger.addHandler(file_logger())

    app.my_route = app.get_my_route()

    @app.before_request
    def before_request():
        g.website_name = settings.website_name
        g.url = url
        g.endpoint = endpoint

        g.route = app.my_route

    @app.errorhandler(404)
    def page_not_found(e):
        title = '訪問頁面失敗'
        return render_template('./404.html', **locals())

    @app.route('/file/plain-text/<file_name>')
    def plain_text(file_name):
        content = request.args.get('file_content') if request.args.get('file_content') is not None else 'empty'
        response = make_response(content)
        # response.headers['Content-Disposition'] = f"attachment; filename={file_name}"  # directly download
        response.mimetype = 'text/plain'
        return response

    return app, settings


class MyFlask(Flask):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.my_route = None

    @staticmethod
    def register_middleware(app: Blueprint, middleware_func):
        @app.before_request
        @middleware_func
        def before_request():
            pass

    def get_my_route(self) -> edict:
        rules_by_endpoint = self.url_map.__dict__['_rules_by_endpoint']
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
