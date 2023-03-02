from flask import Blueprint, render_template, request, flash, redirect, url_for, session, abort, current_app, g, \
    make_response
from app.model.user import UserModel
from app.model.exp import Exp
from app.config.url import url

app = Blueprint('root', __name__)


@app.route('/', methods=['GET'])
@app.route('/index', methods=['GET'])
@app.route('/exp', methods=['GET'])
@UserModel.auth
def index():
    if request.method == 'GET':
        title = '所有實驗'
        target = url.all_exp
        return render_template('./root/index.html', **locals())
    abort(404)


# TODO: Delete This
@app.route('/temp', methods=['GET'])
def temp():
    return Exp.all_exp()


@app.route('/file/plain-text/<file_name>')
def plain_text(file_name):
    content = request.args.get('file_content') if request.args.get('file_content') is not None else 'empty'
    response = make_response(content)
    # response.headers['Content-Disposition'] = f"attachment; filename={file_name}"  # directly download
    response.mimetype = 'text/plain'
    return response
