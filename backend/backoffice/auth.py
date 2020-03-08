from flask import g

from backoffice.base import token_auth, login_manager
from backoffice.models import Usuario


@token_auth.verify_token
def verify_token(token):
    usuario = Usuario.get_user_via_token(token)
    if not usuario:
        return False
    usuario.token = token
    g.usuario = usuario
    return True


@login_manager.user_loader
def user_loader(user_id):
    return Usuario.query.get(user_id)


def init_app(_):
    pass
