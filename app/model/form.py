import asyncio
from functools import partial

from flask import session

from app.helpers.request import make_func_async
from app.helpers.request import MyRequest as req
from app.config.api import url, status_code
from app.config.exception import exception_code


class Form:
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
    def store_mc(cls, data, account=None, password=None):
        payload = {
            'scaddress': data['address'],
            'question': data['content'],
            'scale': data['value']
        }
        result = req().basic_auth(account=account, password=password).post(
            url=url.topic.store_mc, data=payload, timeout=30
        )

        if result.status_code is not status_code.ok:
            raise Exception(exception_code.fail)

        # json = result.json()
        return cls(dtype='MC', content=payload['question'], value=payload['scale'])

    @classmethod
    def store_sa(cls, data, account=None, password=None):
        payload = {
            'scaddress': data['address'],
            'question': data['content'],
        }
        result = req().basic_auth(account=account, password=password).post(
            url=url.topic.store_sa, data=payload, timeout=30
        )

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
            'subaddress': data['subId']
        }

        result = req().basic_auth().post(url=url.exp.submit, data=payload, timeout=30)

        if result.status_code is not status_code.ok:
            raise Exception(exception_code.fail)

        return status_code.ok

    @staticmethod
    async def store_mc_and_sa(id, mc_data, sa_data):
        auth = [session.get('account'), session.get('password')]
        mc = []
        for _, value in enumerate(mc_data):
            data = dict(address=id, content=value['multipleChoice'], value=value['maxScore'])
            mc += [partial(Form.store_mc, data, *auth)]
        sa = []
        for _, value in enumerate(sa_data):
            data = dict(address=id, content=value['shortAnswer'])
            sa += [partial(Form.store_sa, data, *auth)]

        loop = asyncio.get_event_loop()
        tasks = []
        for i_func in mc + sa:
            tasks += [loop.create_task(make_func_async(func=i_func, loop=loop))]
        results = await asyncio.gather(*tasks)
        return results
