from flask import render_template, request, flash, redirect, url_for, abort, current_app
from app.model.user import UserModel
from app.config.exception import exception_code
from app.config.endpoint import endpoint
from app.middleware.authenticate import Authenticate


def sign_up():
    if request.method == 'GET':
        title = '註冊'
        return render_template('./user/sign_up.html', **locals())
    elif request.method == 'POST':
        try:
            form_data = request.values.to_dict()
            user = UserModel.sign_up(form_data)
        except Exception as e:
            if e.args[0] in exception_code.dict().values():
                flash(e.args[0], category='error')
                return redirect(request.referrer)
            current_app.logger.error(f'error msg: {e}')
            abort(404)
        else:
            flash('註冊成功', category='success-toast')
            return redirect(url_for(endpoint.user.login, account=user.account))


def login():
    if request.method == 'GET':
        title = '登入'
        return render_template('./user/login.html', **locals())
    elif request.method == 'POST':
        try:
            form_data = request.values.to_dict()
            user = UserModel(form_data)
            user.login()
        except Exception as e:
            if e.args[0] in exception_code.dict().values():
                flash(e.args[0], category='error')
                return redirect(request.referrer)
            current_app.logger.error(f'error msg: {e}')
            abort(404)
        else:
            user.save_session()
            flash('登入成功', category='success-toast')
            return redirect(url_for(endpoint.exp.public.index))


@Authenticate.user()
def logout():
    if request.method == 'POST':
        UserModel.remove_session()
        flash('登出成功！', category='success-toast')
        return redirect(url_for(endpoint.user.login))
    abort(404)
