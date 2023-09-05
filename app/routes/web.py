from flask import Blueprint, current_app, g

from app.controller import BasicController
from app.controller.user import UserController
from app.controller.oauth import OAuthController
from app.controller.exp import ExpController
from app.middleware.authenticate import Authenticate
from app.middleware.exception import ExceptionHandler


class Controller(BasicController):
    def __init__(self):
        super().__init__()
        self.user = UserController()
        self.oauth = OAuthController()
        self.exp = ExpController()


def init_blueprint():
    ctrl = Controller()

    ctrl.add_decorator(ExceptionHandler.web())
    ctrl.oauth.add_decorator(Authenticate.user())
    ctrl.exp.add_decorator(Authenticate.user())

    '''
    Blueprint(name, import_name, static_folder, static_url_path, template_folder, url_prefix)
    blueprint.add_url_rule(rule, endpoint, view_func, methods)
    '''
    # User Blueprint
    user = Blueprint('user', __name__, url_prefix='/user')
    user.add_url_rule('/', None, ctrl.user.login, methods=['GET', 'POST'])
    user.add_url_rule('/login', None, ctrl.user.login, methods=['GET', 'POST'])
    user.add_url_rule('/sign_up', None, ctrl.user.sign_up, methods=['GET', 'POST'])
    user.add_url_rule('/logout', None, ctrl.user.logout, methods=['POST'])

    # OAuth Blueprint
    oauth = Blueprint('oauth', __name__, url_prefix='/oauth')
    oauth.add_url_rule('/', None, ctrl.oauth.index, methods=['GET'])
    oauth.add_url_rule('/store', None, ctrl.oauth.store, methods=['GET', 'POST'])
    oauth.add_url_rule('/authenticate', None, ctrl.oauth.authenticate, methods=['GET'])
    oauth.add_url_rule('/auth/<id>', None, ctrl.oauth.auth, methods=['GET', 'POST'])

    # Exp Blueprint
    ## Public Blueprint
    public = Blueprint('public', __name__, url_prefix='/public')
    public.add_url_rule('/', None, ctrl.exp.public.index, methods=['GET'])
    public.add_url_rule('/index', None, ctrl.exp.public.index, methods=['GET'])
    # public.add_url_rule('/show/<state>/<id>', None, ctrl.exp.public.show, methods=['GET', 'POST'])
    public.add_url_rule('/show/build/<id>', None, ctrl.exp.public.build, methods=['GET', 'POST'])
    public.add_url_rule('/show/auth/<id>', None, ctrl.exp.public.auth, methods=['GET', 'POST'])
    public.add_url_rule('/show/experiment/<id>', None, ctrl.exp.public.experiment, methods=['GET', 'POST'])
    public.add_url_rule('/show/subject/<id>', None, ctrl.exp.public.subject, methods=['GET', 'POST'])
    public.add_url_rule('/show/running/<id>', None, ctrl.exp.public.running, methods=['GET', 'POST'])
    public.add_url_rule('/show/finish/<id>', None, ctrl.exp.public.finish, methods=['GET', 'POST'])

    ## Parent Blueprint
    parent = Blueprint('parent', __name__, url_prefix='/parent')
    parent.add_url_rule('/', None, ctrl.exp.parent.index, methods=['GET'])
    parent.add_url_rule('/index', None, ctrl.exp.parent.index, methods=['GET'])
    parent.add_url_rule('/build', None, ctrl.exp.parent.build, methods=['GET', 'POST'])
    parent.add_url_rule('/build/store/<id>', None, ctrl.exp.parent.store4build, methods=['GET', 'POST'])
    parent.add_url_rule('/build/destroy/<id>', None, ctrl.exp.parent.destroy4build, methods=['GET', 'POST'])
    parent.add_url_rule('/build/auth/<id>', None, ctrl.exp.parent.build2auth, methods=['GET'])
    parent.add_url_rule('/experiment/subject/<id>', None, ctrl.exp.parent.exp2sub, methods=['GET'])
    # parent.add_url_rule('/sign_up/<address>/<type>/<location>', None, ctrl.exp.parent.sign_up, methods=['GET'])
    parent.add_url_rule('/sign_up/<address>/<location>', None, ctrl.exp.parent.experiment, methods=['GET'])
    parent.add_url_rule('/subject/object/<id>', None, ctrl.exp.parent.obj4sub, methods=['GET', 'POST'])
    parent.add_url_rule('/subject/start/<id>', None, ctrl.exp.parent.start4sub, methods=['GET', 'POST'])
    parent.add_url_rule('/running/object/<id>', None, ctrl.exp.parent.obj4run, methods=['GET', 'POST'])
    parent.add_url_rule('/running/finish/<id>', None, ctrl.exp.parent.run2finish, methods=['GET'])

    ## Private Blueprint
    private = Blueprint('private', __name__, url_prefix='/private')
    private.add_url_rule('/', None, ctrl.exp.private.index, methods=['GET'])
    private.add_url_rule('/index', None, ctrl.exp.private.index, methods=['GET'])
    # private.add_url_rule('/show/<state>/<id>', None, ctrl.exp.private.show, methods=['GET', 'POST'])
    private.add_url_rule('/show/experiment/<id>', None, ctrl.exp.private.experiment, methods=['GET', 'POST'])
    private.add_url_rule('/show/subject/<id>', None, ctrl.exp.private.subject, methods=['GET', 'POST'])
    private.add_url_rule('/show/running/<id>', None, ctrl.exp.private.running, methods=['GET', 'POST'])
    private.add_url_rule('/running/scan/<id>', None, ctrl.exp.private.scan4run, methods=['GET', 'POST'])
    private.add_url_rule('/running/<id>', None, ctrl.exp.private.form4run, methods=['GET', 'POST'])
    private.add_url_rule('/consent/<id>', None, ctrl.exp.private.consent, methods=['GET'])

    ## Exp Blueprint
    exp = Blueprint('exp', __name__, url_prefix='/exp')
    exp.add_url_rule('/', None, ctrl.exp.public.index, methods=['GET'])
    exp.register_blueprint(public)
    exp.register_blueprint(parent)
    exp.register_blueprint(private)

    # Register Before Request
    # register_before_request(oauth, Authenticate.user())
    # register_before_request(exp, Authenticate.user())

    # Register Route
    current_app.add_url_rule('/', None, ctrl.exp.public.index, methods=['GET'])
    current_app.register_blueprint(user)
    current_app.register_blueprint(oauth)
    current_app.register_blueprint(exp)


def register_before_request(app: Blueprint, decorator):
    empty_func = lambda: None
    return app.before_request(decorator(empty_func))
