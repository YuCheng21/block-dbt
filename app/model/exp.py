from ..model.request import MyRequest as req
from ..config.url import url, status_code
from ..config.exception import elist


class Exp:
    def __init__(self):
        pass

    @staticmethod
    def all_exp():
        result = req().basic_auth().get(url=url.all_exp)

        if result.status_code is not status_code.ok:
            raise Exception(elist.fail)

        return result.json()

    def new_exp(self):
        pass

    def show_exp(self):
        pass
