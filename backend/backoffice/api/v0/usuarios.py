from flask import g
from flask_restful import Resource

from backoffice.auth import basic_auth, token_auth
from backoffice.api.v0.schemas import usuario_schema


class LoginAPI(Resource):
    @basic_auth.login_required
    def post(self):
        usuario = g.usuario
        usuario.token = usuario.generate_auth_token()
        return {"usuario": usuario_schema.dump(usuario)}

    @token_auth.login_required
    def get(self):
        return {"usuario": usuario_schema.dump(g.usuario)}
