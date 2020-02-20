import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration


def init_app(app):
    sentry_dsn = app.config.get("SENTRY_DSN")
    if sentry_dsn:
        sentry_sdk.init(
            dsn=sentry_dsn, integrations=[FlaskIntegration()],
        )
