from app.controller.controller import MyController
from app.controller.exp.public import PublicController
from app.controller.exp.parent import ParentController
from app.controller.exp.private import PrivateController


class ExpController(MyController):
    def __init__(self):
        super().__init__()
        self.public = PublicController()
        self.parent = ParentController()
        self.private = PrivateController()
