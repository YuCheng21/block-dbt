import requests
from ..config.exception import elist

"""
https://requests.readthedocs.io/en/latest/user/advanced/
"""


class MyRequest:
    def __init__(self):
        self.session = requests.Session()
        # self.session.auth = ('user', 'pass')

    def get(self, *args, **kwargs):
        try:
            return self.session.get(*args, **kwargs, timeout=5)
        except requests.ReadTimeout:
            raise Exception(elist.timeout)

    def post(self, *args, **kwargs):
        try:
            return self.session.post(*args, **kwargs, timeout=5)
        except requests.ReadTimeout:
            raise Exception(elist.timeout)


req = MyRequest()
