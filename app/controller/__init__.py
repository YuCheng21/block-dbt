from flask import Flask, render_template, g
import logging

from ..config.flask_cfg import config as flask_config
from ..config.logger_cfg import console_logger, file_logger
from ..config.base import settings

from app.controller.root import app as root
from app.controller.user import app as user
from app.controller.exp import app as exp


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(flask_config[config_name])
    app.static_folder = settings.project_path.joinpath('app', 'static').absolute()
    app.template_folder = settings.project_path.joinpath('app', 'views').absolute()

    app.register_blueprint(root)
    app.register_blueprint(user)
    app.register_blueprint(exp)

    app.logger.setLevel(logging.DEBUG)
    app.logger.addHandler(console_logger())
    app.logger.addHandler(file_logger())

    @app.before_request
    def before_request():
        g.website_name = settings.website_name

    @app.errorhandler(404)
    def page_not_found(e):
        title = '訪問頁面失敗'
        return render_template('./404.html', **locals())

    return app
