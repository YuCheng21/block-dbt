import asyncio

from flask import Blueprint, render_template, request, flash, redirect, url_for, abort, current_app
from app.config.exception import exception_code
from app.config.endpoint import endpoint
from app.model.exp import Exp


def index():
    if request.method == 'GET':
        title = '所有實驗'
        return render_template('./exp/public/index.html', **locals())
    abort(404)


def show(id, state):
    if request.method == 'GET':
        title = '檢視實驗'
        if state in ['build', 'auth']:
            return render_template('./exp/public/build.html', **locals())
        elif state in ['experiment']:
            return render_template('./exp/public/experiment.html', **locals())
        elif state in ['subject']:
            return render_template('./exp/public/subject.html', **locals())
        elif state in ['running']:
            return render_template('./exp/public/running.html', **locals())
        elif state in ['finish']:
            return render_template('./exp/public/finish.html', **locals())
        abort(404)
    elif request.method == 'POST':
        if state in ['experiment']:
            print('TODO')
        elif state in ['subject']:
            file_consent = request.files.getlist('consentData')
            args = request.values.to_dict()
            try:
                # Exp.register(args)
                # Exp.upload_file(args, file_consent)
                results = asyncio.run(Exp.sign_up_and_upload_file(args, file_consent))
            except Exception as e:
                if e.args[0] in exception_code.dict().values():
                    flash(e.args[0], category='error')
                    return redirect(request.referrer)
                current_app.logger.error(f'error msg: {e}')
                abort(404)
            else:
                flash('成功', category='success')
                return redirect(url_for(endpoint.exp.public.index))
    abort(404)


# public = Blueprint('public', __name__, url_prefix='/public')
# public.add_url_rule(rule='/', endpoint=None, view_func=index, methods=['GET'])
# public.add_url_rule(rule='/index', endpoint=None, view_func=index, methods=['GET'])
# public.add_url_rule(rule='/show/<state>/<id>', endpoint=None, view_func=show, methods=['GET', 'POST'])
