from pydantic import BaseModel


class ExceptionCode(BaseModel):
    timeout = '執行超時'
    fail = '執行失敗'
    unknown_type = '未知類型'


exception_code = ExceptionCode()
