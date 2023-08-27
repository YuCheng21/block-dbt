from app.controller import MyFlask

from flask import Blueprint

from app.middleware.authenticate import Authenticate

import app.controller.user as user_ctrl
import app.controller.oauth as oauth_ctrl
import app.controller.exp.public as exp_public_ctrl
import app.controller.exp.parent as exp_parent_ctrl
import app.controller.exp.private as exp_private_ctrl

# User Blueprint
user = Blueprint('user', __name__, url_prefix='/user')
user.add_url_rule(rule='/sign_up', endpoint=None, view_func=user_ctrl.sign_up, methods=['GET', 'POST'])
user.add_url_rule(rule='/login', endpoint=None, view_func=user_ctrl.login, methods=['GET', 'POST'])
user.add_url_rule(rule='/logout', endpoint=None, view_func=user_ctrl.logout, methods=['POST'])

# OAuth Blueprint
oauth = Blueprint('oauth', __name__, url_prefix='/oauth')
oauth.add_url_rule(rule='/', endpoint=None, view_func=oauth_ctrl.index, methods=['GET'])
oauth.add_url_rule(rule='/store', endpoint=None, view_func=oauth_ctrl.store, methods=['GET', 'POST'])
oauth.add_url_rule(rule='/authenticate', endpoint=None, view_func=oauth_ctrl.authenticate, methods=['GET', 'POST'])

# Exp Blueprint
## Public Blueprint
public = Blueprint('public', __name__, url_prefix='/public')
public.add_url_rule(rule='/', endpoint=None, view_func=exp_public_ctrl.index, methods=['GET'])
public.add_url_rule(rule='/index', endpoint=None, view_func=exp_public_ctrl.index, methods=['GET'])
public.add_url_rule(rule='/show/<state>/<id>', endpoint=None, view_func=exp_public_ctrl.show, methods=['GET', 'POST'])

## Parent Blueprint
parent = Blueprint('parent', __name__, url_prefix='/parent')
parent.add_url_rule(rule='/', endpoint=None, view_func=exp_parent_ctrl.index, methods=['GET'])
parent.add_url_rule(rule='/index', endpoint=None, view_func=exp_parent_ctrl.index, methods=['GET'])
parent.add_url_rule(rule='/build', endpoint=None, view_func=exp_parent_ctrl.build, methods=['GET', 'POST'])
parent.add_url_rule(rule='/build/update/<id>', endpoint=None, view_func=exp_parent_ctrl.update4build,
                    methods=['GET', 'POST'])
parent.add_url_rule(rule='/build/auth/<id>', endpoint=None, view_func=exp_parent_ctrl.build2auth, methods=['GET'])
parent.add_url_rule(rule='/experiment/subject/<id>', endpoint=None, view_func=exp_parent_ctrl.exp2sub, methods=['GET'])
parent.add_url_rule(rule='/subject/object/<id>', endpoint=None, view_func=exp_parent_ctrl.obj4sub,
                    methods=['GET', 'POST'])
parent.add_url_rule(rule='/subject/start/<id>', endpoint=None, view_func=exp_parent_ctrl.start4sub,
                    methods=['GET', 'POST'])
parent.add_url_rule(rule='/running/object/<id>', endpoint=None, view_func=exp_parent_ctrl.obj4run,
                    methods=['GET', 'POST'])
parent.add_url_rule(rule='/sign_up/<address>/<type>/<location>', endpoint=None, view_func=exp_parent_ctrl.sign_up,
                    methods=['GET'])

## Private Blueprint
private = Blueprint('private', __name__, url_prefix='/private')
private.add_url_rule(rule='/', endpoint=None, view_func=exp_private_ctrl.index, methods=['GET'])
private.add_url_rule(rule='/index', endpoint=None, view_func=exp_private_ctrl.index, methods=['GET'])
private.add_url_rule(rule='/show/<state>/<id>', endpoint=None, view_func=exp_private_ctrl.show, methods=['GET', 'POST'])
private.add_url_rule(rule='/running/scan/<id>', endpoint=None, view_func=exp_private_ctrl.scan4run,
                     methods=['GET', 'POST'])
private.add_url_rule(rule='/running/<id>', endpoint=None, view_func=exp_private_ctrl.form4run, methods=['GET', 'POST'])
private.add_url_rule(rule='/consent/<id>', endpoint=None, view_func=exp_private_ctrl.consent, methods=['GET'])

## Exp Blueprint
exp = Blueprint('exp', __name__, url_prefix='/exp')
exp.register_blueprint(public)
exp.register_blueprint(parent)
exp.register_blueprint(private)


def set_blueprint(app: MyFlask):
    app.register_middleware(oauth, Authenticate.user())
    app.register_middleware(exp, Authenticate.user())

    app.register_blueprint(user)
    app.register_blueprint(oauth)
    app.register_blueprint(exp)
