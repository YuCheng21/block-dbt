from flask import Blueprint, render_template, request, flash, redirect, url_for, abort, current_app, make_response
from app.config.exception import exception_code
from app.config.endpoint import endpoint
from app.model.exp import Exp
from app.model.form import Form


app = Blueprint('private', __name__)


@app.route('/exp/private/index', methods=['GET'])
@app.route('/exp/private', methods=['GET'])
def index():
    if request.method == 'GET':
        title = '我的實驗'
        return render_template('./exp/private/index.html', **locals())
    abort(404)


@app.route('/exp/private/show/<state>/<id>', methods=['GET', 'POST'])
def show(id, state):
    if request.method == 'GET':
        title = id
        if state in ['experiment']:
            return render_template('./exp/private/experiment.html', **locals())
        elif state in ['subject']:
            return render_template('./exp/private/subject.html', **locals())
        elif state in ['running']:
            return render_template('./exp/private/running.html', **locals())
    elif request.method == 'POST':
        if state in ['experiment']:
            try:
                form_data = request.values.to_dict()
                exp = Exp.sign_exp(form_data)
            except Exception as e:
                if e.args[0] in exception_code.dict().values():
                    flash(e.args[0], category='error')
                    return redirect(request.referrer)
                current_app.logger.error(f'error msg: {e}')
                abort(404)
            else:
                flash('新增成功', category='success-toast')
                return redirect(url_for(endpoint.exp.public.index))
    abort(404)


@app.route('/exp/private/running/scan/<id>', methods=['GET', 'POST'])
def scan4run(id):
    if request.method == 'GET':
        title = '掃描實驗物'
        return render_template('./exp/private/running-scan.html', **locals())
    elif request.method == 'POST':
        try:
            form_data = request.values.to_dict()
            data = dict(address=id, form_data=form_data)
            exp = Exp.scan_obj(data)
        except Exception as e:
            if e.args[0] in exception_code.dict().values():
                flash(e.args[0], category='error')
                return redirect(request.referrer)
            current_app.logger.error(f'error msg: {e}')
            abort(404)
        else:
            flash(f'受測人員: <br>{exp.text}', category='success')
            return redirect(request.referrer)


@app.route('/exp/private/running/<id>', methods=['GET', 'POST'])
def form4run(id):
    if request.method == 'GET':
        title = '填寫問卷'
        return render_template('./exp/private/running-form.html', **locals())
    elif request.method == 'POST':
        try:
            form_data = request.values.to_dict()
            Form.submit(form_data, id)
        except Exception as e:
            if e.args[0] in exception_code.dict().values():
                flash(e.args[0], category='error')
                return redirect(request.referrer)
            current_app.logger.error(f'error msg: {e}')
            abort(404)
        else:
            flash('成功', category='success-toast')
            return redirect(url_for(endpoint.exp.public.index))


@app.route('/exp/private/consent/<id>', methods=['GET'])
def consent(id):
    if request.method == 'GET':
        data = dict(address=id)
        try:
            result = Exp.download_consent(data)
        except Exception as e:
            if e.args[0] in exception_code.dict().values():
                flash(e.args[0], category='error')
                return redirect(request.referrer)
            current_app.logger.error(f'error msg: {e}')
            abort(404)
        else:
            response = make_response(result.content)
            response.mimetype = 'application/pdf'
            return response
