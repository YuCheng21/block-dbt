import requests
from flask import session
from app.config.exception import elist

"""
https://requests.readthedocs.io/en/latest/user/advanced/
"""


class MyRequest:
    def __init__(self):
        self.session = requests.Session()

    def basic_auth(self):
        self.session.auth = (session.get('account'), session.get('password'))
        return self

    def get(self, url, timeout=5, *args, **kwargs):
        try:
            return self.session.get(url=url, timeout=timeout, *args, **kwargs)
        except requests.ReadTimeout:
            raise Exception(elist.timeout)

    def post(self, url, content='urlencoded', timeout=5, *args, **kwargs):
        try:
            if content == 'urlencoded':
                headers = {'Content-Type': 'application/x-www-form-urlencoded'}
                return self.session.post(url=url, headers=headers, timeout=timeout, *args, **kwargs)
        except requests.ReadTimeout:
            raise Exception(elist.timeout)

