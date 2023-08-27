from flask import render_template, request, flash, redirect, url_for, abort
from app.model.user import UserModel
from app.config.endpoint import endpoint
from app.middleware.authenticate import Authenticate


def sign_up():
    if request.method == 'GET':
        title = '註冊'
        return render_template('./user/sign_up.html', **locals())
    elif request.method == 'POST':
        form_data = request.values.to_dict()
        user = UserModel.sign_up(form_data)
        flash('註冊成功', category='success-toast')
        return redirect(url_for(endpoint.user.login, account=user.account))
    abort(404)


def login():
    if request.method == 'GET':
        title = '登入'
        return render_template('./user/login.html', **locals())
    elif request.method == 'POST':
        form_data = request.values.to_dict()
        user = UserModel(form_data)
        user.login()
        user.save_session()
        flash('登入成功', category='success-toast')
        return redirect(url_for(endpoint.exp.public.index))
    abort(404)


@Authenticate.user()
def logout():
    if request.method == 'POST':
        UserModel.remove_session()
        flash('登出成功！', category='success-toast')
        return redirect(url_for(endpoint.user.login))
    abort(404)
