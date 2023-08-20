import requests
from flask import session
from app.config.exception import exception_code


class MyRequest:
    def __init__(self):
        self.session = requests.Session()

    def basic_auth(self, account=None, password=None):
        account = session.get('account') if account is None else account
        password = session.get('password') if password is None else password
        self.session.auth = (account, password)
        return self

    def request(self, *args, **kwargs):
        try:
            result = self.session.request(*args, **kwargs)
        except requests.ReadTimeout:
            raise Exception(exception_code.timeout)
        finally:
            self.session.close()
        return result

    def get(self, url, timeout=5, *args, **kwargs):
        return self.request(method='GET', url=url, timeout=timeout, *args, **kwargs)

    def post(self, url, content_type='urlencoded', timeout=5, *args, **kwargs):
        if not content_type == 'urlencoded':
            raise Exception(exception_code.unknown_type)
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        kw = {**{'method': 'POST', 'url': url, 'headers': headers, 'timeout': timeout}, **kwargs}
        return self.request(*args, **kw)


async def make_func_async(func, loop):
    result = await loop.run_in_executor(None, func)
    return result
