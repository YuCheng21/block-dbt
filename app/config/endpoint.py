from pydantic import BaseModel


class Public(BaseModel):
    index = 'exp.public.index'
    show = 'exp.public.show'


class Parent(BaseModel):
    user = 'exp.parent.user'
    store = 'exp.parent.store'
    update = 'exp.parent.update'
    subject = 'exp.parent.subject'
    add_object = 'exp.parent.add_object'
    sign_up = 'exp.parent.sign_up'
    submit = 'exp.parent.submit'
    start = 'exp.parent.start'
    obj_list = 'exp.parent.obj_list'


class Private(BaseModel):
    join = 'exp.private.join'
    content = 'exp.private.content'
    form = 'exp.private.form'


class Exp(BaseModel):
    public = Public()
    parent = Parent()
    private = Private()


class User(BaseModel):
    sign_up = 'user.sign_up'
    login = 'user.login'
    logout = 'user.logout'
    update = 'user.update'


class OAuth(BaseModel):
    index = 'oauth.index'
    store = 'oauth.store'
    authenticate = 'oauth.authenticate'
    authenticate_id = 'oauth.authenticate_id'


class Endpoint(BaseModel):
    exp = Exp()
    user = User()
    oauth = OAuth()
    plain_text = 'plain_text'


endpoint = Endpoint()
if __name__ == '__main__':
    from pprint import pprint
    pprint(endpoint.dict())
