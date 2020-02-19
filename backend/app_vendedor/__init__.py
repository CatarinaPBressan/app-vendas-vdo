from flask import Flask

from app_vendedor import settings, base, routes, logging, \
    context_processors, models


def create_app(extra_config=None):
    app = Flask(__name__)

    settings.init_app(app, extra_config)
    logging.init_app(app)
    base.init_app(app)
    routes.init_app(app)

    models.init_app(app)

    return app
