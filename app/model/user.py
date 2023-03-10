from flask import session
from app.model.request import MyRequest as req
from app.config.api import url, status_code
from app.config.exception import exception_code
from base64 import b64encode


class UserModel:
    def __init__(self, user_data):
        self.account = user_data['account']
        self.password = user_data['password']

    @property
    def account(self):
        return self.__account

    @account.setter
    def account(self, account):
        assert type(account) == str
        self.__account = account

    @property
    def password(self):
        return self.__password

    @password.setter
    def password(self, password):
        self.__password = password

    def __repr__(self):
        return f'User({self.account}, {self.password})'

    @property
    def basic_auth(self):
        token = b64encode(f"{self.account}:{self.password}".encode('utf-8')).decode("ascii")
        return f'Basic {token}'

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
        session['basic_auth'] = self.basic_auth
        session.permanent = True

    @staticmethod
    def remove_session():
        session.pop('account', None)
        session.pop('password', None)
        session.pop('basic_auth', None)
