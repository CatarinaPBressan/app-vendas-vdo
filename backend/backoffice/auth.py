from flask import g

from backoffice.base import basic_auth, token_auth
from backoffice.models import Usuario


@basic_auth.verify_password
def verify_password(username, password):
    usuario = Usuario.query.filter_by(username=username).first()
    if not usuario or not usuario.verify_password(password):
        return False
    g.usuario = usuario
    return True


@token_auth.verify_token
def verify_token(token):
    usuario = Usuario.get_user_via_token(token)
    if not usuario:
        return False
    g.usuario = usuario
    return True


def init_app(app):
    pass
