from pydantic import BaseModel


class ExceptionCode(BaseModel):
    fail = '執行失敗'
    timeout = '執行超時'
    max_retry = '無法連線'
    unknown_type = '未知類型'


exception_code = ExceptionCode()
