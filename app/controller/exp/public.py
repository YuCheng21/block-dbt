import asyncio

from flask import Blueprint, render_template, request, flash, redirect, url_for, abort, current_app
from app.config.exception import exception_code
from app.config.endpoint import endpoint
from app.model.exp import Exp


app = Blueprint('public', __name__)


@app.route('/exp/public/index', methods=['GET'])
@app.route('/exp/public', methods=['GET'])
@app.route('/exp', methods=['GET'])
@app.route('/', methods=['GET'])
def index():
    if request.method == 'GET':
        title = '所有實驗'
        return render_template('./exp/public/index.html', **locals())
    abort(404)


@app.route('/exp/public/show/<state>/<id>', methods=['GET', 'POST'])
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
