from pydantic import BaseModel, HttpUrl
from app.config.base import settings


class Exp(BaseModel):
    index: HttpUrl = f'{settings.base_url}/explist'
    store: HttpUrl = f'{settings.base_url}/newexp'


class User(BaseModel):
    login: HttpUrl = f'{settings.base_url}/login'
    sign_up: HttpUrl = f'{settings.base_url}/register'


class Url(BaseModel):
    base: HttpUrl = f'{settings.base_url}'
    exp = Exp()
    user = User()


url = Url()


class StatusCode(BaseModel):
    ok = 200
    non_authoritative = 203


status_code = StatusCode()
