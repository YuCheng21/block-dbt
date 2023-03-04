from flask import Flask, render_template, g, request, make_response, Blueprint
import logging

from app.config.flask_cfg import config as flask_config
from app.config.logger_cfg import console_logger, file_logger
from app.config.base import settings
from app.config.api import url

from app.controller.user import app as user
from app.controller.exp import app as exp

from app.middleware.authenticate import Authenticate


def create_app(config_name):
    app = MyFlask(__name__)
    app.config.from_object(flask_config[config_name])
    app.static_folder = settings.project_path.joinpath('app', 'static').absolute()
    app.template_folder = settings.project_path.joinpath('app', 'views').absolute()

    app.register_middleware(exp, Authenticate.user())

    app.register_blueprint(user)
    app.register_blueprint(exp)

    app.logger.setLevel(logging.DEBUG)
    app.logger.addHandler(console_logger())
    app.logger.addHandler(file_logger())

    @app.before_request
    def before_request():
        g.website_name = settings.website_name
        g.url = url

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

    return app


class MyFlask(Flask):
    @staticmethod
    def register_middleware(app: Blueprint, middleware_func):
        @app.before_request
        @middleware_func
        def before_request():
            pass
