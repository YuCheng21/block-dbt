from pydantic import BaseModel


class Public(BaseModel):
    index = 'exp.public.index'
    build = 'exp.public.build'
    auth = 'exp.public.auth'
    experiment = 'exp.public.experiment'
    subject = 'exp.public.subject'
    running = 'exp.public.running'
    finish = 'exp.public.finish'


class Parent(BaseModel):
    index = 'exp.parent.index'
    build = 'exp.parent.build'
    store4build = 'exp.parent.store4build'
    destroy4build = 'exp.parent.destroy4build'
    exp2sub = 'exp.parent.exp2sub'
    obj4sub = 'exp.parent.obj4sub'
    experiment = 'exp.parent.experiment'
    build2auth = 'exp.parent.build2auth'
    start4sub = 'exp.parent.start4sub'
    obj4run = 'exp.parent.obj4run'


class Private(BaseModel):
    index = 'exp.private.index'
    experiment = 'exp.private.experiment'
    subject = 'exp.private.subject'
    running = 'exp.private.running'
    form4run = 'exp.private.form4run'
    scan4run = 'exp.private.scan4run'
    consent = 'exp.private.consent'


class Exp(BaseModel):
    public = Public()
    parent = Parent()
    private = Private()


class User(BaseModel):
    sign_up = 'user.sign_up'
    login = 'user.login'
    logout = 'user.logout'


class OAuth(BaseModel):
    index = 'oauth.index'
    store = 'oauth.store'
    authenticate = 'oauth.authenticate'
    auth = 'oauth.auth'


class Endpoint(BaseModel):
    exp = Exp()
    user = User()
    oauth = OAuth()
    plain_text = 'plain_text'


endpoint = Endpoint()
if __name__ == '__main__':
    from pprint import pprint
    pprint(endpoint.dict())
