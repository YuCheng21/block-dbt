from flask import Blueprint, render_template, request, flash, redirect, url_for, session, abort, current_app, g

app = Blueprint('user', __name__)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        title = '註冊'
        return render_template('./user/register.html', **locals())
    elif request.method == 'POST':
        # TODO: Do register action
        # TODO: if sign-up success
        flash('註冊成功', category='success-toast')
        return redirect(url_for('user.login'))
        # TODO: if sign-up failed
        flash('註冊失敗', category='error')
        return redirect(url_for('user.register'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        title = '登入'
        return render_template('./user/login.html', **locals())
    elif request.method == 'POST':
        # TODO: if login success condition == True, then do login action
        flash('登入成功', category='success-toast')
        return redirect(url_for('root.index'))
        # TODO: if login success condition == False
        flash('登入失敗', category='error')
        return redirect(url_for('user.login'))


@app.route('/user/update', methods=['POST'])
def update():
    if request.method != 'POST':
        abort(404)
    # TODO: Do user update action
    # TODO: if update failed
    flash('更新失敗', category='error')
    # TODO: if update success
    flash('更新成功', category='success')
    return redirect(request.referrer)


@app.route('/user/logout', methods=['POST'])
def logout():
    if request.method != 'POST':
        abort(404)
    # TODO: Do user logout action
    flash('登出成功！', category='success-toast')
    return redirect(url_for('user.login'))
