import asyncio

from flask import render_template, request, flash, redirect, url_for, abort
from app.config.endpoint import endpoint
from app.model.exp import Exp
from app.controller import BasicController


class PublicController(BasicController):
    def index(self):
        if request.method == 'GET':
            title = '所有實驗'
            return render_template('./exp/public/index.html', **locals())
        abort(404)

    def build(self, id):
        title = '檢視實驗'
        if request.method == 'GET':
            return render_template('./exp/public/build.html', **locals())
        elif request.method == 'POST':
            pass
        abort(404)

    def auth(self, id):
        title = '檢視實驗'
        if request.method == 'GET':
            return render_template('./exp/public/build.html', **locals())
        elif request.method == 'POST':
            pass
        abort(404)

    def experiment(self, id):
        title = '檢視實驗'
        if request.method == 'GET':
            return render_template('./exp/public/experiment.html', **locals())
        elif request.method == 'POST':
            pass
        abort(404)

    def subject(self, id):
        title = '檢視實驗'
        if request.method == 'GET':
            return render_template('./exp/public/subject.html', **locals())
        elif request.method == 'POST':
            file_consent = request.files.getlist('consentData')
            args = request.values.to_dict()
            # Exp.register(args)
            # Exp.upload_file(args, file_consent)
            results = asyncio.run(Exp.sign_up_and_upload_file(args, file_consent))
            flash('成功', category='success')
            return redirect(url_for(endpoint.exp.public.index))
        abort(404)

    def running(self, id):
        title = '檢視實驗'
        if request.method == 'GET':
            return render_template('./exp/public/running.html', **locals())
        elif request.method == 'POST':
            pass
        abort(404)

    def finish(self, id):
        title = '檢視實驗'
        if request.method == 'GET':
            return render_template('./exp/public/finish.html', **locals())
        elif request.method == 'POST':
            pass
        abort(404)
