from flask import Blueprint


from app.controller.exp.public import app as public
from app.controller.exp.parent import app as parent
from app.controller.exp.private import app as private

app = Blueprint('exp', __name__)

app.register_blueprint(public)
app.register_blueprint(parent)
app.register_blueprint(private)
