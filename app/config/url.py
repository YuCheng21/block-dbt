from pydantic import BaseSettings, HttpUrl
from .base import settings


class Url(BaseSettings):
    base_url = settings.base_url
    login: HttpUrl = f'{base_url}/login'
    sign_up: HttpUrl = f'{base_url}/register'
    all_exp: HttpUrl = f'{base_url}/explist'
    new_exp: HttpUrl = f'{base_url}/newexp'


class StatusCode(BaseSettings):
    ok = 200
    non_authoritative = 203


url = Url()
status_code = StatusCode()
