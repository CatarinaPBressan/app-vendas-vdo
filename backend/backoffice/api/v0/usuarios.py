from flask import g, request
from flask_restful import Resource

from backoffice.models import Usuario
from backoffice.auth import token_auth
from backoffice.api.v0.schemas import usuario_schema


class LoginAPI(Resource):
    def post(self):
        usuario_data = usuario_schema.load(request.json)
        username = usuario_data["username"]
        password = usuario_data["password"]
        usuario = Usuario.query.filter_by(username=username).first()
        if not usuario or not usuario.verify_password(password):
            return {"error": "Unauthorized"}, 401

        usuario.token = usuario.generate_auth_token()
        g.usuario = usuario
        return {"usuario": usuario_schema.dump(usuario)}

    @token_auth.login_required
    def get(self):
        return {"usuario": usuario_schema.dump(g.usuario)}
