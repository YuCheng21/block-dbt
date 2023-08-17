from app.helpers.request import MyRequest as req
from app.config.api import url, status_code
from app.config.exception import exception_code


class Topic:
    def __init__(self, dtype: str, content: str, value: str = None) -> None:
        self.dtype = dtype
        self.content = content
        self.value = value

    @staticmethod
    def all_topic():
        result = req().basic_auth().get(url=url.topic.index)

        if result.status_code is not status_code.ok:
            raise Exception(exception_code.fail)

        return result.json()

    @classmethod
    def store_mc(cls, data):
        payload = {
            'scaddress': data['address'],
            'question': data['content'],
            'scale': data['value']
        }
        result = req().basic_auth().post(url=url.topic.store_mc, data=payload, timeout=30)

        if result.status_code is not status_code.ok:
            raise Exception(exception_code.fail)

        # json = result.json()
        return cls(dtype='MC', content=payload['question'], value=payload['scale'])

    @classmethod
    def store_sa(cls, data):
        payload = {
            'scaddress': data['address'],
            'question': data['content'],
        }
        result = req().basic_auth().post(url=url.topic.store_sa, data=payload, timeout=30)

        if result.status_code is not status_code.ok:
            raise Exception(exception_code.fail)

        # json = result.json()
        return cls(dtype='SA', content=payload['question'])

    @staticmethod
    def confirm(data):
        payload = {
            'scaddress': data['address'],
        }
        result = req().basic_auth().post(url=url.topic.submit, data=payload, timeout=30)

        if result.status_code is not status_code.ok:
            raise Exception(exception_code.fail)

        return status_code.ok

    @staticmethod
    def submit(data, id):
        payload = {
            'scaddress': id,
            'q1': data['MCTable'],
            'q2': data['SATable'],
        }

        result = req().basic_auth().post(url=url.exp.submit, data=payload, timeout=30)

        if result.status_code is not status_code.ok:
            raise Exception(exception_code.fail)

        return status_code.ok