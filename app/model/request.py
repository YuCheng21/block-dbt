import requests
from ..config.exception import elist

"""
https://requests.readthedocs.io/en/latest/user/advanced/
"""


class MyRequest:
    def __init__(self):
        self.session = requests.Session()
        # self.session.auth = ('user', 'pass')

    def get(self, url, params, timeout=5, *args, **kwargs):
        try:
            return self.session.get(url=url, params=params, timeout=timeout, *args, **kwargs)
        except requests.ReadTimeout:
            raise Exception(elist.timeout)

    def post(self, url, params, timeout=5, *args, **kwargs):
        try:
            return self.session.post(url=url, params=params, timeout=timeout, *args, **kwargs)
        except requests.ReadTimeout:
            raise Exception(elist.timeout)


req = MyRequest()
