import functools

from flask import redirect, flash, request, current_app, abort

from app.config.exception import exception_code


class ExceptionHandler:
    @staticmethod
    def web(*arg, **kw):
        def decorator(func):
            @functools.wraps(func)
            def wrapper(*args, **kwargs):

                try:
                    return func(*args, **kwargs)
                except Exception as exception:
                    if str(exception) in exception_code.dict().values():
                        flash(exception.args[0], category='error')
                        return redirect(request.referrer)
                    if hasattr(exception, 'code'):
                        return abort(exception.code)
                    current_app.logger.error(f'error msg: {exception}')
                    abort(500)

            return wrapper
        return decorator
