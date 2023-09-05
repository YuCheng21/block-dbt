from flask import render_template, request, flash, redirect, url_for, abort, make_response
from app.config.endpoint import endpoint
from app.model.exp import Exp
from app.model.form import Form
from app.controller import BasicController


class PrivateController(BasicController):
    def index(self):
        if request.method == 'GET':
            title = '我的實驗'
            return render_template('./exp/private/index.html', **locals())
        abort(404)

    # def show(self, id, state):
    #     if request.method == 'GET':
    #         title = id
    #         if state in ['experiment']:
    #             return render_template('./exp/private/experiment.html', **locals())
    #         elif state in ['subject']:
    #             return render_template('./exp/private/subject.html', **locals())
    #         elif state in ['running']:
    #             return render_template('./exp/private/running.html', **locals())
    #     elif request.method == 'POST':
    #         if state in ['experiment']:
    #             form_data = request.values.to_dict()
    #             exp = Exp.sign_exp(form_data)
    #             flash('新增成功', category='success-toast')
    #             return redirect(url_for(endpoint.exp.public.index))
    #     abort(404)

    def experiment(self, id):
        title = id
        if request.method == 'GET':
            return render_template('./exp/private/experiment.html', **locals())
        elif request.method == 'POST':
            form_data = request.values.to_dict()
            exp = Exp.sign_exp(form_data)
            flash('新增成功', category='success-toast')
            return redirect(url_for(endpoint.exp.public.index))
        abort(404)

    def subject(self, id):
        title = id
        if request.method == 'GET':
            return render_template('./exp/private/subject.html', **locals())
        elif request.method == 'POST':
            pass
        abort(404)

    def running(self, id):
        title = id
        if request.method == 'GET':
            return render_template('./exp/private/running.html', **locals())
        elif request.method == 'POST':
            pass
        abort(404)

    def scan4run(self, id):
        if request.method == 'GET':
            title = '掃描實驗物'
            return render_template('./exp/private/running-scan.html', **locals())
        elif request.method == 'POST':
            form_data = request.values.to_dict()
            data = dict(address=id, form_data=form_data)
            exp = Exp.scan_obj(data)
            result = exp.json()
            message = f'受測人員: {result.get("0").get("subject")}<br><br>實驗人員: {result.get("0").get("experimenter")}'
            flash(message, category='success')
            return redirect(request.referrer)
        abort(404)

    def form4run(self, id):
        if request.method == 'GET':
            title = '填寫問卷'
            return render_template('./exp/private/running-form.html', **locals())
        elif request.method == 'POST':
            form_data = request.values.to_dict()
            Form.submit(form_data, id)
            flash('成功', category='success-toast')
            return redirect(url_for(endpoint.exp.public.index))
        abort(404)

    def consent(self, id):
        if request.method == 'GET':
            data = dict(address=id)
            result = Exp.download_consent(data)
            response = make_response(result.content)
            response.mimetype = 'application/pdf'
            return response
        abort(404)
