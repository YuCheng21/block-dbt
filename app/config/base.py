from pydantic import BaseSettings, HttpUrl
from pathlib import Path
from enum import Enum


class Mode(str, Enum):
    development = 'development'
    production = 'production'


class Settings(BaseSettings):
    mode: Mode = 'development'
    website_name: str = '區塊鏈雙盲測驗平台'
    project_name: str = 'block-dbt'
    project_path: Path = Path('./')
    api_url: HttpUrl = 'http://127.0.0.1:15000'
    app_host: str = '0.0.0.0'
    app_port: int = 80
    secret_key: str = 'YOUR SECRET_KEY'
    session_cookie_name: str = f'{project_name}-session'

    class Config:
        env_file = '.env'


settings = Settings()
