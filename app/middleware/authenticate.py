from flask import session, redirect, url_for


class Authenticate:
    @staticmethod
    def user(*arg, **kw):
        def decorator(func):
            def wrapper(*args, **kwargs):
                if kw.get('basic_auth') is not None:
                    basic_auth = kw.get('basic_auth')
                else:
                    basic_auth = session.get('basic_auth')
                if kw.get('url') is not None:
                    url = kw.get('url')
                else:
                    url = url_for('user.login')

                if basic_auth is None:
                    return redirect(url)

                return func(*args, **kwargs)

            wrapper.__name__ = func.__name__
            return wrapper

        return decorator
