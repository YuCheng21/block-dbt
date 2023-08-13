from app.model.request import MyRequest as req
from app.config.api import url, status_code
from app.config.exception import exception_code


class Exp:
    def __init__(
            self,
            id: str = None,
            address: str = None,
            name: str = None,
            content: str = None,
            researchers: str = None,
            state: str = None
    ) -> None:
        self.id = id
        self.address = address
        self.name = name
        self.content = content
        self.researchers = researchers
        self.state = state

    @staticmethod
    def all_exp():
        result = req().basic_auth().get(url=url.exp.index)

        if result.status_code is not status_code.ok:
            raise Exception(exception_code.fail)

        return result.json()

    @classmethod
    def store(cls, data):
        payload = {
            'name': data['expName'],
            'information': data['expContent'],
            'date': data['expTime'],
            'subcount': data['expSub'],
        }
        result = req().basic_auth().post(url=url.exp.store, data=payload, timeout=30)

        if result.status_code is not status_code.ok:
            raise Exception(exception_code.fail)

        json = result.json()
        return cls(address=json['expaddress'], name=json['_name'],
                   content=json['_content'], researchers=json['_Researchers_name'])

    def show(self):
        pass

    @classmethod
    def start(cls, data):
        payload = {
            'scaddress': data['address'],
        }
        result = req().basic_auth().post(url=url.exp.start, data=payload, timeout=30)

        if result.status_code is not status_code.ok:
            raise Exception(exception_code.fail)

        return status_code.ok

    @staticmethod
    def register(data):
        payload = {
            'scaddress': data['address'],
            'id': data['type'],
            'hospital': data['location']
        }
        result = req().basic_auth().post(url=url.exp.sign_up, data=payload, timeout=30)

        if result.status_code is not status_code.ok:
            raise Exception(exception_code.fail)

        return status_code.ok

    @staticmethod
    def sign_exp(data):
        payload = {
            'scaddress': data['smartContractAddress'],
            'list': data['expList'],
        }
        result = req().basic_auth().post(url=url.exp.sign_exp, data=payload, timeout=30)

        if result.status_code is not status_code.ok:
            raise Exception(exception_code.fail)

        return status_code.ok

    @staticmethod
    def sign_sub(data):
        payload = {
            'scaddress': data['address'],
        }
        result = req().basic_auth().post(url=url.exp.sign_sub, data=payload, timeout=30)

        if result.status_code is not status_code.ok:
            raise Exception(exception_code.fail)

        return status_code.ok
