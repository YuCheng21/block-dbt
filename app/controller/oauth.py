from flask import Blueprint, render_template, request, flash, redirect, url_for, abort, current_app
from app.config.exception import exception_code
from app.config.endpoint import endpoint
from app.model.oauth import OAuth


def index():
    if request.method == 'GET':
        title = '權威機構'
        return render_template('./oauth/index.html', **locals())
    abort(404)


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
                return redirect(request.referrer)
            current_app.logger.error(f'error msg: {e}')
            abort(404)
        else:
            flash('新增成功', category='success-toast')
            return redirect(url_for(endpoint.oauth.index))


def authenticate():
    if request.method == 'GET':
        title = '驗證實驗'
        return render_template('./oauth/authenticate.html', **locals())
    elif request.method == 'POST':
        form_data = request.values.to_dict()
        data = dict(address=form_data['id'])
        try:
            OAuth.start(data)
        except Exception as e:
            if e.args[0] in exception_code.dict().values():
                flash(e.args[0], category='error')
                return redirect(request.referrer)
            current_app.logger.error(f'error msg: {e}')
            abort(404)
        else:
            flash('成功', category='success')
            return redirect(url_for(endpoint.oauth.authenticate))
    abort(404)


# oauth = Blueprint('oauth', __name__, url_prefix='/oauth')
# oauth.add_url_rule(rule='/', endpoint=None, view_func=index, methods=['GET'])
# oauth.add_url_rule(rule='/store', endpoint=None, view_func=store, methods=['GET', 'POST'])
# oauth.add_url_rule(rule='/authenticate', endpoint=None, view_func=authenticate, methods=['GET', 'POST'])
