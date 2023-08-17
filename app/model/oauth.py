from app.helpers.request import MyRequest as req
from app.config.api import url, status_code
from app.config.exception import exception_code


class OAuth:
    def __init__(self):
        pass

    @staticmethod
    def store(data):
        payload = {
            'authadd': data['account']
        }
        result = req().basic_auth().post(url=url.oauth.store, data=payload, timeout=30)

        if result.status_code is not status_code.ok:
            raise Exception(exception_code.fail)

        return status_code.ok

    @classmethod
    def start(cls, data):
        payload = {
            'sc': data['address'],
        }
        result = req().basic_auth().post(url=url.oauth.authenticate, data=payload, timeout=30)

        if result.status_code is not status_code.ok:
            raise Exception(exception_code.fail)

        return status_code.ok
