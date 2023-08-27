from app.config.base import settings
import datetime


class BaseConfig:
    SECRET_KEY = settings.secret_key
    JSON_AS_ASCII = False
    SESSION_COOKIE_NAME = settings.session_cookie_name
    SESSION_REFRESH_EACH_REQUEST = True
    PERMANENT_SESSION_LIFETIME = datetime.timedelta(minutes=30)
    MAX_CONTENT_LENGTH = 16 * 1000 * 1000


class DevelopmentConfig(BaseConfig):
    DEBUG = True


class ProductionConfig(BaseConfig):
    DEBUG = False


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig
}
