from flask import g
from flask_restful import Resource

from app_vendedor.auth import basic_auth


class LoginAPI(Resource):

    decorators = [basic_auth.login_required]

    def post(self):
        token = g.usuario.generate_auth_token()
        return {"token": token.decode("ascii")}
