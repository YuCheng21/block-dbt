from flask import Blueprint, render_template, request, flash, redirect, url_for, abort, current_app
from app.config.exception import exception_code
from app.config.endpoint import endpoint
from app.model.exp import Exp
from app.model.topic import Topic


app = Blueprint('private', __name__)


@app.route('/exp/join', methods=['GET'])
def join():
    if request.method == 'GET':
        title = '我的實驗'
        return render_template('./exp/join/exp.html', **locals())
    abort(404)


@app.route('/exp/join/<state>/<id>', methods=['GET', 'POST'])
def content(id, state):
    if request.method == 'GET':
        title = id
        if state in ['s-exp']:
            return render_template('./exp/join/s-exp.html', **locals())
        elif state in ['s-run']:
            return render_template('./exp/join/s-run.html', **locals())
    elif request.method == 'POST':
        if state in ['s-exp']:
            try:
                form_data = request.values.to_dict()
                exp = Exp.sign_exp(form_data)
            except Exception as e:
                if e.args[0] in exception_code.dict().values():
                    flash(e.args[0], category='error')
                    return redirect(url_for(endpoint.exp.private.content, id=id, state=state))
                current_app.logger.error(f'error msg: {e}')
                abort(404)
            else:
                flash('新增成功', category='success-toast')
                return redirect(url_for(endpoint.exp.public.index))
        elif state in ['s-run']:
            try:
                exp = Exp.scan_obj(data=dict(address=id))
            except Exception as e:
                if e.args[0] in exception_code.dict().values():
                    flash(e.args[0], category='error')
                    return redirect(url_for(endpoint.exp.private.content, id=id, state=state))
                current_app.logger.error(f'error msg: {e}')
                abort(404)
            else:
                flash('新增成功', category='success-toast')
                return redirect(url_for(endpoint.exp.private.join))
    abort(404)


@app.route('/exp/form/<id>', methods=['GET', 'POST'])
def form(id):
    if request.method == 'GET':
        title = '填寫問卷'
        return render_template('./exp/form.html', **locals())
    elif request.method == 'POST':
        try:
            form_data = request.values.to_dict()
            Topic.submit(form_data, id)
        except Exception as e:
            if e.args[0] in exception_code.dict().values():
                flash(e.args[0], category='error')
                return redirect(url_for(endpoint.exp.public.index))
            current_app.logger.error(f'error msg: {e}')
            abort(404)
        else:
            flash('成功', category='success-toast')
            return redirect(url_for(endpoint.exp.public.index))
