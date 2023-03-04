from app.model.request import MyRequest as req
from app.config.url import url, status_code
from app.config.exception import elist


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
            raise Exception(elist.fail)

        return result.json()

    @classmethod
    def store(cls, data):
        payload = {
            'name': data['expName'],
            'information': data['expContent']
        }
        result = req().basic_auth().post(url=url.exp.store, data=payload, timeout=30)

        if result.status_code is not status_code.ok:
            raise Exception(elist.fail)

        json = result.json()
        return cls(address=json['expaddress'], name=payload['name'], content=payload['information'])

    def show(self):
        pass
