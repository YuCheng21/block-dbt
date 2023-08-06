from pydantic import BaseModel, HttpUrl
from app.config.base import settings


class Exp(BaseModel):
    index: HttpUrl = f'{settings.api_url}/explist'
    self: HttpUrl = f'{settings.api_url}/getmyExp'
    store: HttpUrl = f'{settings.api_url}/newexp'
    start: HttpUrl = f'{settings.api_url}/startExp'
    sign_up: HttpUrl = f'{settings.api_url}/expRegister'
    number: HttpUrl = f'{settings.api_url}/getMember'
    submit: HttpUrl = f'{settings.api_url}/fillQuestion'
    data: HttpUrl = f'{settings.api_url}/getResult'


class User(BaseModel):
    login: HttpUrl = f'{settings.api_url}/login'
    sign_up: HttpUrl = f'{settings.api_url}/register'


class Topic(BaseModel):
    index: HttpUrl = f'{settings.api_url}/getQuestionaire'
    store_mc: HttpUrl = f'{settings.api_url}/setNewOptions'
    destroy: HttpUrl = f'{settings.api_url}/deleteOptions'
    store_sa: HttpUrl = f'{settings.api_url}/setNewFillinOptions'
    submit: HttpUrl = f'{settings.api_url}/checkQuestionaire'


class OAuth(BaseModel):
    store: HttpUrl = f'{settings.api_url}/newauth'
    authenticate: HttpUrl = f'{settings.api_url}/auth'


class Url(BaseModel):
    base: HttpUrl = f'{settings.api_url}'
    exp = Exp()
    user = User()
    topic = Topic()
    oauth = OAuth()


url = Url()


class StatusCode(BaseModel):
    ok = 200
    non_authoritative = 203
    flow_error = 400
    account_error = 401
    account_duplicate = 600


status_code = StatusCode()
