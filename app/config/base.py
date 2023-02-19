from pydantic import BaseSettings, HttpUrl
from pathlib import Path


class Settings(BaseSettings):
    website_name = '基於區塊鏈的雙盲測驗平台'
    project_name: str = 'block-dbt'
    project_path: Path = Path('./')
    base_url: HttpUrl = 'http://127.0.0.1:15000'
    secret_key: str = 'YOUR SECRET_KEY'
    session_cookie_name: str = f'{project_name}-session'

    class Config:
        env_file = '.env'


settings = Settings()
