from flask import session, redirect, url_for
from ..model.request import req
from ..config.url import url, status_code
from ..config.exception import elist


class UserModel:
    def __init__(self, user_data):
        self.password = user_data['password']

    @classmethod
    def get_user(cls, user_data):
        payload = {
            'account': user_data['account'],
            'password': user_data['password']
        }
        result = req.post(url=url.login, data=payload)

        if result.status_code is not status_code.ok:
            raise Exception(elist.fail)
        cls.account = user_data['account']
        cls.password = user_data['password']
        return cls

    def sign_up(self):
        payload = {
            'password': self.password
        }
        result = req.post(url=url.sign_up, data=payload, timeout=30)

        if result.status_code is not status_code.ok:
            raise Exception(elist.fail)
        return result.json()['account']

    def save_session(self):
        session['account'] = self.account
        session['password'] = self.password
        session.permanent = True

    @staticmethod
    def remove_session():
        session.pop('account', None)
        session.pop('password', None)

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
