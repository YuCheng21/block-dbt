from flask import Blueprint

import app.controller.user as user_controller
import app.controller.oauth as oauth_controller
import app.controller.exp as exp_controller
import app.controller.exp.public as exp_public_controller
import app.controller.exp.parent as exp_parent_controller
import app.controller.exp.private as exp_private_controller


user = Blueprint('user', __name__, url_prefix='/user')
user.add_url_rule(rule='/sign_up', endpoint=None, view_func=user_controller.sign_up, methods=['GET', 'POST'])
user.add_url_rule(rule='/login', endpoint=None, view_func=user_controller.login, methods=['GET', 'POST'])
user.add_url_rule(rule='/logout', endpoint=None, view_func=user_controller.logout, methods=['POST'])

oauth = Blueprint('oauth', __name__, url_prefix='/oauth')
oauth.add_url_rule(rule='/', endpoint=None, view_func=oauth_controller.index, methods=['GET'])
oauth.add_url_rule(rule='/store', endpoint=None, view_func=oauth_controller.store, methods=['GET', 'POST'])
oauth.add_url_rule(rule='/authenticate', endpoint=None, view_func=oauth_controller.authenticate, methods=['GET', 'POST'])

public = Blueprint('public', __name__, url_prefix='/public')
public.add_url_rule(rule='/', endpoint=None, view_func=exp_public_controller.index, methods=['GET'])
public.add_url_rule(rule='/index', endpoint=None, view_func=exp_public_controller.index, methods=['GET'])
public.add_url_rule(rule='/show/<state>/<id>', endpoint=None, view_func=exp_public_controller.show, methods=['GET', 'POST'])

parent = Blueprint('parent', __name__, url_prefix='/parent')
parent.add_url_rule(rule='/', endpoint=None, view_func=exp_parent_controller.index, methods=['GET'])
parent.add_url_rule(rule='/index', endpoint=None, view_func=exp_parent_controller.index, methods=['GET'])
parent.add_url_rule(rule='/build', endpoint=None, view_func=exp_parent_controller.build, methods=['GET', 'POST'])
parent.add_url_rule(rule='/build/update/<id>', endpoint=None, view_func=exp_parent_controller.update4build, methods=['GET', 'POST'])
parent.add_url_rule(rule='/build/auth/<id>', endpoint=None, view_func=exp_parent_controller.build2auth, methods=['GET'])
parent.add_url_rule(rule='/experiment/subject/<id>', endpoint=None, view_func=exp_parent_controller.exp2sub, methods=['GET'])
parent.add_url_rule(rule='/subject/object/<id>', endpoint=None, view_func=exp_parent_controller.obj4sub, methods=['GET', 'POST'])
parent.add_url_rule(rule='/subject/start/<id>', endpoint=None, view_func=exp_parent_controller.start4sub, methods=['GET', 'POST'])
parent.add_url_rule(rule='/running/object/<id>', endpoint=None, view_func=exp_parent_controller.obj4run, methods=['GET', 'POST'])
parent.add_url_rule(rule='/sign_up/<address>/<type>/<location>', endpoint=None, view_func=exp_parent_controller.sign_up, methods=['GET'])

private = Blueprint('private', __name__, url_prefix='/private')
private.add_url_rule(rule='/', endpoint=None, view_func=exp_private_controller.index, methods=['GET'])
private.add_url_rule(rule='/index', endpoint=None, view_func=exp_private_controller.index, methods=['GET'])
private.add_url_rule(rule='/show/<state>/<id>', endpoint=None, view_func=exp_private_controller.show, methods=['GET', 'POST'])
private.add_url_rule(rule='/running/scan/<id>', endpoint=None, view_func=exp_private_controller.scan4run, methods=['GET', 'POST'])
private.add_url_rule(rule='/running/<id>', endpoint=None, view_func=exp_private_controller.form4run, methods=['GET', 'POST'])
private.add_url_rule(rule='/consent/<id>', endpoint=None, view_func=exp_private_controller.consent, methods=['GET'])

exp = Blueprint('exp', __name__, url_prefix='/exp')
exp.register_blueprint(public)
exp.register_blueprint(parent)
exp.register_blueprint(private)
