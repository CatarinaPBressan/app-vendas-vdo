from flask import Blueprint, render_template

bp = Blueprint("backoffice", __name__)


@bp.route("/health_check")
def health_check():
    return "OK"


@bp.route("/sistema/")
@bp.route("/sistema/<path:_>/")
def frontend(_=None):
    return render_template("index.html")


def init_app(app):
    app.register_blueprint(bp, url_prefix="")
