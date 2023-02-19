from pydantic import BaseSettings


class ExceptionList(BaseSettings):
    timeout = '執行超時'
    fail = '執行失敗'


elist = ExceptionList()
