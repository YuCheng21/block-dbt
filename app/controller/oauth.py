from flask import render_template, request, flash, redirect, url_for, abort
from app.config.endpoint import endpoint
from app.model.oauth import OAuth
from app.controller.controller import MyController


class OAuthController(MyController):
    def index(self):
        if request.method == 'GET':
            title = '權威機構'
            return render_template('./oauth/index.html', **locals())
        abort(404)

    def store(self):
        if request.method == 'GET':
            title = '新增權威機構'
            return render_template('./oauth/store.html', **locals())
        elif request.method == 'POST':
            form_data = request.values.to_dict()
            oauth = OAuth.store(form_data)
            flash('新增成功', category='success-toast')
            return redirect(url_for(endpoint.oauth.index))
        abort(404)

    def authenticate(self):
        if request.method == 'GET':
            title = '驗證實驗'
            return render_template('./oauth/authenticate.html', **locals())
        elif request.method == 'POST':
            form_data = request.values.to_dict()
            data = dict(address=form_data['id'])
            OAuth.start(data)
            flash('成功', category='success')
            return redirect(url_for(endpoint.oauth.authenticate))
        abort(404)
