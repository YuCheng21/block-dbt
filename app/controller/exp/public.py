import asyncio

from flask import render_template, request, flash, redirect, url_for, abort
from app.config.endpoint import endpoint
from app.model.exp import Exp


class PublicController:
    def index(self):
        if request.method == 'GET':
            title = '所有實驗'
            return render_template('./exp/public/index.html', **locals())
        abort(404)

    def show(self, id, state):
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
        elif request.method == 'POST':
            if state in ['experiment']:
                print('TODO')
            elif state in ['subject']:
                file_consent = request.files.getlist('consentData')
                args = request.values.to_dict()
                # Exp.register(args)
                # Exp.upload_file(args, file_consent)
                results = asyncio.run(Exp.sign_up_and_upload_file(args, file_consent))
                flash('成功', category='success')
                return redirect(url_for(endpoint.exp.public.index))
        abort(404)
