from pydantic import BaseModel, HttpUrl
from app.config.base import settings


class Exp(BaseModel):
    index: HttpUrl = f'{settings.api_url}/explist'
    sign_exp: HttpUrl = f'{settings.api_url}/explist'
    sign_sub: HttpUrl = f'{settings.api_url}/recruitsubject'
    upload: HttpUrl = f'{settings.api_url}/sendConsent'
    download: HttpUrl = f'{settings.api_url}/downloadConsent'
    location: HttpUrl = f'{settings.api_url}/getHospital'
    add_object: HttpUrl = f'{settings.api_url}/newitem'
    self: HttpUrl = f'{settings.api_url}/getmyExp'
    store: HttpUrl = f'{settings.api_url}/newexp'
    start: HttpUrl = f'{settings.api_url}/startExp'
    object_list: HttpUrl = f'{settings.api_url}/getItemlist'
    scan_object: HttpUrl = f'{settings.api_url}/scanitem'
    sign_up: HttpUrl = f'{settings.api_url}/expRegister'
    number: HttpUrl = f'{settings.api_url}/getMember'
    submit: HttpUrl = f'{settings.api_url}/fillQuestion'
    data: HttpUrl = f'{settings.api_url}/getResult'
    n_object: HttpUrl = f'{settings.api_url}/itemlength'
    force_unblind: HttpUrl = f'{settings.api_url}/unblind_Ave'
    object_limit: HttpUrl = f'{settings.api_url}/itemcount'
    in_exp: HttpUrl = f'{settings.api_url}/getGroupResult'
    all_result: HttpUrl = f'{settings.api_url}/getResultdetailed'


class User(BaseModel):
    login: HttpUrl = f'{settings.api_url}/login'
    sign_up: HttpUrl = f'{settings.api_url}/register'


class Topic(BaseModel):
    index: HttpUrl = f'{settings.api_url}/getQuestionaire'
    store_mc: HttpUrl = f'{settings.api_url}/setNewOptions'
    store_sa: HttpUrl = f'{settings.api_url}/setNewFillinOptions'
    destroy_mc: HttpUrl = f'{settings.api_url}/deleteOptions'
    destroy_sa: HttpUrl = f'{settings.api_url}/deletefillinOptions'
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
