from backoffice.api import v0


def init_app(app):
    v0.init_app(app, "/api/{version}")
