from flask import g

from app_vendedor.base import basic_auth
from app_vendedor.models import Usuario


@basic_auth.verify_password
def verify_password(username, password):
    usuario = Usuario.query.filter_by(username=username).first()
    if not usuario or not usuario.verify_password(password):
        return False
    g.usuario = usuario
    return True


def init_app(app):
    pass
