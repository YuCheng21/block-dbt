from flask import Blueprint, render_template, request, flash, redirect, url_for, session, abort, current_app, g

app = Blueprint('exp', __name__)


@app.route('/exp/user', methods=['GET'])
def user():
    if request.method == 'GET':
        title = '實驗管理'
        return render_template('./exp/user.html', **locals())
    abort(404)


@app.route('/exp/add', methods=['GET', 'POST'])
def add():
    if request.method == 'GET':
        title = '新增實驗'
        return render_template('./exp/add.html', **locals())
    elif request.method == 'POST':
        form_data = request.values.to_dict()
        # TODO: add exp action
        # TODO: if add exp failed
        flash('新增失敗', category='error')
        # TODO: if add exp success
        flash('新增成功', category='success-toast')
        return redirect(url_for('exp.user'))
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
        form_data = request.values.to_dict()
        # TODO: update exp action
        # TODO: if update exp failed
        flash('更新失敗', category='error')
        # TODO: if update exp success
        flash('更新成功', category='success-toast')
        return redirect(url_for('root.index'))
    abort(404)


@app.route('/exp/delete/<id>', methods=['GET'])
def delete(id):
    if request.method == 'GET':
        # TODO: Do exp delete action
        flash('刪除成功', category='success')
        return redirect(request.referrer)
    abort(404)
