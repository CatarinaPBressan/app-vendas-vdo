from flask import Blueprint

from flask_restful import Api

from app_vendedor.api.v0.users import LoginAPI


def init_app(app, api_template):
    api_v0 = Blueprint("api_v0", __name__)
    api = Api(api_v0)
    api.add_resource(LoginAPI, api_template, "/users/")
    app.register_blueprint(api_v0, url_prefix=api_template.format(version="v0"))
