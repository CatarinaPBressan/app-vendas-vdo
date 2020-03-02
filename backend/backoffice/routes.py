from flask import Blueprint, render_template

bp = Blueprint("backoffice", __name__)


@bp.route("/promotores/<path:_>")
@bp.route("/promotores/")
def promotores(_=None):
    return render_template("index_promotores.html")


@bp.route("/backoffice/<path:_>")
@bp.route("/backoffice/")
def backoffice(_=None):
    return render_template("index_backoffice.html")


@bp.route("/hello_world/")
def hello_world():
    return "Hello World!"


def init_app(app):
    app.register_blueprint(bp, url_prefix="")
