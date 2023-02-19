from flask import Blueprint, render_template, request, flash, redirect, url_for, session, abort, current_app, g
from ...model.user import UserModel
from ..auth import auth
from ...config.exception import elist

app = Blueprint('user', __name__)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        title = '註冊'
        return render_template('./user/register.html', **locals())
    elif request.method == 'POST':
        try:
            form_data = request.values.to_dict()
            user_info = UserModel.sign_up(form_data)
        except Exception as e:
            if e.args[0] in elist.dict().values():
                flash(e.args[0], category='error')
                return redirect(url_for('user.register'))
            print(e)
            abort(404)
        else:
            flash('註冊成功', category='success-toast')
            return redirect(url_for('user.login'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        title = '登入'
        return render_template('./user/login.html', **locals())
    elif request.method == 'POST':
        try:
            form_data = request.values.to_dict()
            user_info = UserModel.get_user(form_data)
        except Exception as e:
            if e.args[0] in elist.dict().values():
                flash(e.args[0], category='error')
                return redirect(url_for('user.login'))
            print(e)
            abort(404)
        else:
            user_info.save_session(user_info)
            flash('登入成功', category='success-toast')
            return redirect(url_for('root.index'))


@app.route('/user/update', methods=['POST'])
@auth
def update():
    if request.method == 'POST':
        # TODO: Do user update action
        # TODO: if update failed
        flash('更新失敗', category='error')
        # TODO: if update success
        flash('更新成功', category='success')
        return redirect(request.referrer)
    abort(404)


@app.route('/user/logout', methods=['POST'])
@auth
def logout():
    if request.method == 'POST':
        UserModel.remove_session()
        flash('登出成功！', category='success-toast')
        return redirect(url_for('user.login'))
    abort(404)


@app.route('/user/profile', methods=['GET', 'POST'])
@auth
def profile():
    if request.method == 'GET':
        title = '個人資料'
        return render_template('./user/profile.html', **locals())
    elif request.method == 'POST':
        # TODO: update profile action
        # TODO: if update failed
        flash('更新失敗', category='error')
        # TODO: if update success
        flash('更新成功', category='success')
        return redirect(request.referrer)
    abort(404)
