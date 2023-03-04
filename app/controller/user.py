from flask import Blueprint, render_template, request, flash, redirect, url_for, session, abort, current_app, g
from app.model.user import UserModel
from app.config.exception import exception_code

app = Blueprint('user', __name__)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        title = '註冊'
        return render_template('./user/register.html', **locals())
    elif request.method == 'POST':
        try:
            form_data = request.values.to_dict()
            user = UserModel.sign_up(form_data)
        except Exception as e:
            if e.args[0] in exception_code.dict().values():
                flash(e.args[0], category='error')
                return redirect(url_for('user.register'))
            current_app.logger.error(f'error msg: {e}')
            abort(404)
        else:
            flash('註冊成功', category='success-toast')
            return redirect(url_for('user.login', account=user.account))


@app.route('/login', methods=['GET', 'POST'])
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
                return redirect(url_for('user.login'))
            current_app.logger.error(f'error msg: {e}')
            abort(404)
        else:
            user.save_session()
            flash('登入成功', category='success-toast')
            return redirect(url_for('root.index'))


@app.route('/user/logout', methods=['POST'])
@UserModel.auth
def logout():
    if request.method == 'POST':
        UserModel.remove_session()
        flash('登出成功！', category='success-toast')
        return redirect(url_for('user.login'))
    abort(404)


@app.route('/user/update', methods=['POST'])
@UserModel.auth
def update():
    if request.method == 'POST':
        # TODO: Do user update action
        # TODO: if update failed
        flash('更新失敗', category='error')
        # TODO: if update success
        flash('更新成功', category='success')
        return redirect(request.referrer)
    abort(404)
