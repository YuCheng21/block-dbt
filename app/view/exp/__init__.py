from flask import Blueprint, render_template, request, flash, redirect, url_for, session, abort, current_app, g

app = Blueprint('exp', __name__)


@app.route('/exp/user', methods=['GET'])
def user():
    if request.method == 'GET':
        title = '我的實驗'
        return render_template('./exp/user.html', **locals())
    abort(404)


@app.route('/exp/add', methods=['GET', 'POST'])
def add():
    if request.method == 'GET':
        title = '新增實驗'
        return render_template('./exp/add.html', **locals())
    elif request.method == 'POST':
        # TODO: add exp action
        return '/exp/add POST'
    abort(404)


@app.route('/exp/show/<id>', methods=['GET'])
def show(id):
    if request.method == 'GET':
        title = '檢視實驗'
        return render_template('./exp/show.html', **locals())
    abort(404)


@app.route('/exp/update/<id>', methods=['GET', 'POST'])
def update(id):
    if request.method == 'GET':
        title = '編輯實驗'
        return render_template('./exp/update.html', **locals())
    elif request.method == 'POST':
        # TODO: update exp action
        return '/exp/update/<id> POST'
    abort(404)


@app.route('/exp/delete/<id>', methods=['GET'])
def delete(id):
    if request.method == 'GET':
        # TODO: Do exp delete action
        flash('刪除成功', category='success')
        return redirect(request.referrer)
    abort(404)
