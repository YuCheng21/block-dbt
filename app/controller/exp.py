from json import loads as json_loads
import asyncio

from flask import Blueprint, render_template, request, flash, redirect, url_for, abort, current_app
from app.config.exception import exception_code
from app.model.exp import Exp
from app.model.topic import Topic

app = Blueprint('exp', __name__)


@app.route('/', methods=['GET'])
@app.route('/index', methods=['GET'])
@app.route('/exp', methods=['GET'])
def index():
    if request.method == 'GET':
        title = '所有實驗'
        return render_template('./exp/index.html', **locals())
    abort(404)


@app.route('/exp/user', methods=['GET'])
def user():
    if request.method == 'GET':
        title = '實驗管理'
        return render_template('./exp/user.html', **locals())
    abort(404)


@app.route('/exp/join', methods=['GET'])
def join():
    if request.method == 'GET':
        title = '我的實驗'
        return render_template('./exp/join/exp.html', **locals())
    abort(404)


@app.route('/exp/participate/<id>', methods=['GET'])
def participate(id):
    if request.method == 'GET':
        title = id
        return render_template('./exp/participate.html', **locals())
    abort(404)


@app.route('/exp/join/<id>', methods=['GET', 'POST'])
def content(id):
    if request.method == 'GET':
        title = id
        return render_template('./exp/join/content.html', **locals())
    elif request.method == 'POST':
        try:
            form_data = request.values.to_dict()
            exp = Exp.sign_exp(form_data)
        except Exception as e:
            if e.args[0] in exception_code.dict().values():
                flash(e.args[0], category='error')
                return redirect(url_for('exp.store'))
            current_app.logger.error(f'error msg: {e}')
            abort(404)
        else:
            flash('新增成功', category='success-toast')
            return redirect(url_for('exp.index'))
    abort(404)


@app.route('/exp/store', methods=['GET', 'POST'])
def store():
    if request.method == 'GET':
        title = '新增實驗'
        return render_template('./exp/add.html', **locals())
    elif request.method == 'POST':
        try:
            form_data = request.values.to_dict()
            exp = Exp.store(form_data)
        except Exception as e:
            if e.args[0] in exception_code.dict().values():
                flash(e.args[0], category='error')
                return redirect(url_for('exp.store'))
            current_app.logger.error(f'error msg: {e}')
            abort(404)
        else:
            flash('新增成功', category='success-toast')
            return redirect(url_for('exp.user'))


@app.route('/exp/show/<state>/<id>', methods=['GET', 'POST'])
def show(id, state):
    if request.method == 'GET':
        title = '檢視實驗'
        if state in ['s-form', 's-auth']:
            return render_template('./exp/state/s-form.html', **locals())
        elif state in ['s-exp']:
            return render_template('./exp/state/s-exp.html', **locals())
        elif state in ['s-sub']:
            return render_template('./exp/state/s-sub.html', **locals())
        elif state in ['s-run']:
            return render_template('./exp/state/s-run.html', **locals())
        elif state in ['s-over']:
            return render_template('./exp/state/s-over.html', **locals())
        abort(404)
    elif request.method == 'POST':
        if state in ['s-exp']:
            print('TODO')
        elif state in ['s-sub']:
            file_consent = request.files.getlist('consentData')
            args = request.values.to_dict()
            try:
                # Exp.register(args)
                # Exp.upload_file(args, file_consent)
                results = asyncio.run(Exp.register_and_upload_file(args, file_consent))
            except Exception as e:
                if e.args[0] in exception_code.dict().values():
                    flash(e.args[0], category='error')
                    return redirect(url_for('exp.index'))
                current_app.logger.error(f'error msg: {e}')
                abort(404)
            else:
                flash('成功', category='success')
                return redirect(url_for('exp.index'))
    abort(404)


@app.route('/exp/update/<id>', methods=['GET', 'POST'])
def update(id):
    if request.method == 'GET':
        title = '編輯實驗'
        return render_template('./exp/update.html', **locals())
    elif request.method == 'POST':
        try:
            form_data = request.values.to_dict()
            multiple_choice = json_loads(form_data['MCTable'])
            short_answer = json_loads(form_data['SATable'])
            # for _, value in enumerate(multiple_choice):
            #     data = dict(address=id, content=value['multipleChoice'], value=value['maxScore'])
            #     Topic.store_mc(data)
            # for _, value in enumerate(short_answer):
            #     data = dict(address=id, content=value['shortAnswer'])
            #     Topic.store_sa(data)
            results = asyncio.run(Topic.store_mc_and_sa(id, multiple_choice, short_answer))
        except Exception as e:
            if e.args[0] in exception_code.dict().values():
                flash(e.args[0], category='error')
                return redirect(url_for('exp.index'))
            current_app.logger.error(f'error msg: {e}')
            abort(404)
        else:
            flash('新增成功', category='success-toast')
            return redirect(url_for('exp.index'))


@app.route('/exp/subject/<id>', methods=['GET'])
def subject(id):
    if request.method == 'GET':
        data = dict(address=id)
        try:
            Exp.sign_sub(data)
        except Exception as e:
            if e.args[0] in exception_code.dict().values():
                flash(e.args[0], category='error')
                return redirect(url_for('exp.user'))
            current_app.logger.error(f'error msg: {e}')
            abort(404)
        else:
            flash('成功', category='success')
            return redirect(url_for('exp.user'))


@app.route('/exp/object/<id>', methods=['GET', 'POST'])
def add_object(id):
    if request.method == 'GET':
        title = '新增實驗物'
        return render_template('./exp/object.html', **locals())
    elif request.method == 'POST':
        try:
            form_data = request.values.to_dict()
            data = dict(address=id, group=form_data['group'])
            Exp.add_obj(data)
        except Exception as e:
            if e.args[0] in exception_code.dict().values():
                flash(e.args[0], category='error')
                return redirect(url_for('exp.user'))
            current_app.logger.error(f'error msg: {e}')
            abort(404)
        else:
            flash('成功', category='success')
            return redirect(url_for('exp.add_object', id=id))
    abort(404)

@app.route('/exp/destroy/<id>', methods=['GET'])
def destroy(id):
    if request.method == 'GET':
        # TODO: Do exp delete action
        flash('刪除成功', category='success')
        return redirect(request.referrer)
    abort(404)


@app.route('/exp/register/<address>/<type>/<location>', methods=['GET'])
def register(address, type, location):
    if request.method == 'GET':
        data = dict(address=address, type=type, location=location)
        try:
            Exp.register(data)
        except Exception as e:
            if e.args[0] in exception_code.dict().values():
                flash(e.args[0], category='error')
                return redirect(url_for('exp.index'))
            current_app.logger.error(f'error msg: {e}')
            abort(404)
        else:
            flash('成功', category='success')
            return redirect(url_for('exp.index'))

# ============================================================

@app.route('/exp/topic/<id>', methods=['GET'])
def submit(id):
    if request.method == 'GET':
        data = dict(address=id)
        try:
            Topic.confirm(data)
        except Exception as e:
            if e.args[0] in exception_code.dict().values():
                flash(e.args[0], category='error')
                return redirect(url_for('exp.user'))
            current_app.logger.error(f'error msg: {e}')
            abort(404)
        else:
            flash('成功', category='success')
            return redirect(url_for('exp.user'))

@app.route('/exp/start/<id>', methods=['GET', 'POST'])
def start(id):
    if request.method == 'GET':
        title = '開始實驗'
        return render_template('./exp/start.html', **locals())
    elif request.method == 'POST':
        form_data = request.values.to_dict()
        data = dict(address=id, date=form_data['date'])
        try:
            Exp.start(data)
        except Exception as e:
            if e.args[0] in exception_code.dict().values():
                flash(e.args[0], category='error')
                return redirect(url_for('exp.user'))
            current_app.logger.error(f'error msg: {e}')
            abort(404)
        else:
            flash('成功', category='success')
            return redirect(url_for('exp.user'))

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
                return redirect(url_for('exp.index'))
            current_app.logger.error(f'error msg: {e}')
            abort(404)
        else:
            flash('成功', category='success-toast')
            return redirect(url_for('exp.index'))