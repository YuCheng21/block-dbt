from flask import Blueprint, render_template, request, flash, redirect, url_for, session, abort, current_app, g

app = Blueprint('root', __name__)


@app.route('/', methods=['GET'])
@app.route('/index', methods=['GET'])
@app.route('/exp', methods=['GET'])
def index():
    if request.method == 'GET':
        title = '所有實驗'
        return render_template('./root/index.html', **locals())
    abort(404)
