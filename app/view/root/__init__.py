from flask import Blueprint, render_template, request, flash, redirect, url_for, session, abort, current_app, g, \
    make_response
from ..auth import auth

app = Blueprint('root', __name__)


@app.route('/', methods=['GET'])
@app.route('/index', methods=['GET'])
@app.route('/exp', methods=['GET'])
@auth
def index():
    if request.method == 'GET':
        title = '所有實驗'
        return render_template('./root/index.html', **locals())
    abort(404)


@app.route('/file/plain-text/<file_name>')
def plain_text(file_name, file_content='lorem'):
    response = make_response(file_content)
    # response.headers['Content-Disposition'] = f"attachment; filename={file_name}"  # directly download
    response.mimetype = 'text/plain'
    return response
