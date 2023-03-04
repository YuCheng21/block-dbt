from flask import session, redirect, url_for
from app.model.request import MyRequest as req
from app.config.api import url, status_code
from app.config.exception import exception_code
from base64 import b64encode


class UserModel:
    def __init__(self, user_data):
        self.account = user_data['account']
        self.password = user_data['password']

    @classmethod
    def sign_up(cls, userdata):
        payload = {
            'password': userdata['password']
        }
        result = req().post(url=url.user.sign_up, data=payload, timeout=30)

        if result.status_code is not status_code.ok:
            raise Exception(exception_code.fail)
        json = result.json()
        return cls({
            'account': json['account'],
            'password': payload['password']
        })

    def login(self):
        payload = {
            'account': self.account,
            'password': self.password
        }
        result = req().post(url=url.user.login, data=payload)

        if result.status_code is not status_code.ok:
            raise Exception(exception_code.fail)

    def save_session(self):
        session['account'] = self.account
        session['password'] = self.password
        session['basic_auth'] = self.basic_auth(self.account, self.password)
        session.permanent = True

    @staticmethod
    def remove_session():
        session.pop('account', None)
        session.pop('password', None)
        session.pop('basic_auth', None)

    @staticmethod
    def auth(func):
        def wrapper(*args, **kwargs):
            account = session.get('account')
            if account is None:
                return redirect(url_for('user.login'))
            password = session.get('password')
            if password is None:
                return redirect(url_for('user.login'))

            return func(*args, **kwargs)

        wrapper.__name__ = func.__name__
        return wrapper

    @staticmethod
    def basic_auth(account, password):
        token = b64encode(f"{account}:{password}".encode('utf-8')).decode("ascii")
        return f'Basic {token}'
