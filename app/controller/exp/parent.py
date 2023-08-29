from json import loads as json_loads
import asyncio

from flask import render_template, request, flash, redirect, url_for, abort
from app.config.endpoint import endpoint
from app.model.exp import Exp
from app.model.form import Form
from app.controller import BasicController


class ParentController(BasicController):
    def index(self):
        if request.method == 'GET':
            title = '實驗管理'
            return render_template('./exp/parent/index.html', **locals())
        abort(404)

    def build(self):
        if request.method == 'GET':
            title = '新增實驗'
            return render_template('./exp/parent/build.html', **locals())
        elif request.method == 'POST':
            form_data = request.values.to_dict()
            exp = Exp.store(form_data)
            flash('新增成功', category='success-toast')
            return redirect(url_for(endpoint.exp.parent.index))
        abort(404)

    def update4build(self, id):
        if request.method == 'GET':
            title = '編輯問卷'
            return render_template('./exp/parent/build-form.html', **locals())
        elif request.method == 'POST':
            form_data = request.values.to_dict()
            multiple_choice = json_loads(form_data['MCTable'])
            short_answer = json_loads(form_data['SATable'])
            # for _, value in enumerate(multiple_choice):
            #     data = dict(address=id, content=value['multipleChoice'], value=value['maxScore'])
            #     Form.store_mc(data)
            # for _, value in enumerate(short_answer):
            #     data = dict(address=id, content=value['shortAnswer'])
            #     Form.store_sa(data)
            results = asyncio.run(Form.store_mc_and_sa(id, multiple_choice, short_answer))
            flash('新增成功', category='success-toast')
            return redirect(url_for(endpoint.exp.parent.index))
        abort(404)

    def build2auth(self, id):
        if request.method == 'GET':
            data = dict(address=id)
            Form.confirm(data)
            flash('成功', category='success')
            return redirect(url_for(endpoint.exp.parent.index))
        abort(404)

    def exp2sub(self, id):
        if request.method == 'GET':
            data = dict(address=id)
            Exp.sign_sub(data)
            flash('成功', category='success')
            return redirect(url_for(endpoint.exp.parent.index))
        abort(404)

    def obj4sub(self, id):
        if request.method == 'GET':
            title = '新增實驗物'
            return render_template('./exp/parent/subject-object.html', **locals())
        elif request.method == 'POST':
            form_data = request.values.to_dict()
            data = dict(address=id, form_data=form_data)
            Exp.add_obj(data)
            flash('成功', category='success')
            return redirect(url_for(endpoint.exp.parent.obj4sub, id=id))
        abort(404)

    def start4sub(self, id):
        if request.method == 'GET':
            title = '開始實驗'
            return render_template('./exp/parent/subject.html', **locals())
        elif request.method == 'POST':
            form_data = request.values.to_dict()
            data = dict(address=id, date=form_data['date'])
            Exp.start(data)
            flash('成功', category='success')
            return redirect(url_for(endpoint.exp.parent.index))
        abort(404)

    def obj4run(self, id):
        if request.method == 'GET':
            title = '實驗物清單'
            return render_template('./exp/parent/running.html', **locals())

    def run2finish(self, id):
        if request.method == 'GET':
            data = dict(address=id)
            Exp.force_unblind(data)
            flash('成功', category='success')
            return redirect(url_for(endpoint.exp.parent.index))
        abort(404)

    def sign_up(self, address, type, location):
        if request.method == 'GET':
            data = dict(address=address, type=type, location=location)
            Exp.sign_up(data)
            flash('成功', category='success')
            return redirect(url_for(endpoint.exp.public.index))
        abort(404)
