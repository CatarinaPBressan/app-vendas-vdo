from flask import g

from backoffice.base import token_auth
from backoffice.models import Usuario


@token_auth.verify_token
def verify_token(token):
    usuario = Usuario.get_user_via_token(token)
    if not usuario:
        return False
    usuario.token = token
    g.usuario = usuario
    return True


def init_app(_):
    pass
