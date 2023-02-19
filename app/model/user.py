from flask import session
from ..model.request import req
from ..config.url import url
from ..config.exception import elist


class UserModel:
    def __init__(self, user_data):
        self.account = user_data['account']
        self.password = user_data['password']

    @classmethod
    def get_user(cls, user_data):
        payload = {
            'Account': user_data['account'],
            'password': user_data['password']
        }
        result = req.get(url=url.login, params=payload)

        if result.json()['status'] is not True:
            raise Exception(elist.fail)
        cls.account = user_data['account']
        cls.password = user_data['password']
        return cls

    def sign_up(self):
        payload = {
            'Account': self.account,
            'password': self.password
        }
        result = req.post(url=url.sign_up, params=payload, timeout=30)

        if result.json()['status'] is not True:
            raise Exception(elist.fail)

    def save_session(self):
        session['account'] = self.account
        session['password'] = self.password
        session.permanent = True

    @staticmethod
    def remove_session():
        session.pop('account', None)
        session.pop('password', None)
