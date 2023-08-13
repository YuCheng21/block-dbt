from flask import Blueprint, render_template, request, flash, redirect, url_for, abort, current_app
from app.config.exception import exception_code
from app.model.oauth import OAuth


app = Blueprint('oauth', __name__)


@app.route('/oauth', methods=['GET'])
def index():
    if request.method == 'GET':
        title = '權威機構'
        return render_template('./oauth/index.html', **locals())
    abort(404)


@app.route('/oauth/store', methods=['GET', 'POST'])
def store():
    if request.method == 'GET':
        title = '新增權威機構'
        return render_template('./oauth/store.html', **locals())
    elif request.method == 'POST':
        try:
            form_data = request.values.to_dict()
            oauth = OAuth.store(form_data)
        except Exception as e:
            if e.args[0] in exception_code.dict().values():
                flash(e.args[0], category='error')
                return redirect(url_for('oauth.store'))
            current_app.logger.error(f'error msg: {e}')
            abort(404)
        else:
            flash('新增成功', category='success-toast')
            return redirect(url_for('oauth.index'))


@app.route('/oauth/authenticate', methods=['GET', 'POST'])
def authenticate():
    if request.method == 'GET':
        title = '驗證實驗'
        return render_template('./oauth/authenticate.html', **locals())
    abort(404)


@app.route('/oauth/authenticate/<id>', methods=['GET'])
def authenticate_id(id):
    if request.method == 'GET':
        data = dict(address=id)
        try:
            OAuth.start(data)
        except Exception as e:
            if e.args[0] in exception_code.dict().values():
                flash(e.args[0], category='error')
                return redirect(url_for('oauth.authenticate'))
            current_app.logger.error(f'error msg: {e}')
            abort(404)
        else:
            flash('成功', category='success')
            return redirect(url_for('oauth.authenticate'))