from pydantic import BaseModel


class ExceptionCode(BaseModel):
    timeout = '執行超時'
    fail = '執行失敗'


exception_code = ExceptionCode()
