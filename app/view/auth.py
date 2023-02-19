from flask import session, redirect, url_for

"""
https://stackoverflow.com/questions/59156895/cannot-import-name-mydb-from-partially-initialized-module-connection-in-pyth
"""


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
