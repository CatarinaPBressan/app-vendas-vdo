from flask import Blueprint

from flask_restful import Api

from backoffice.api.v0.usuarios import LoginAPI
from backoffice.api.v0.pedidos import PedidosAPI, PedidoAPI


def init_app(app, api_template):
    api_v0 = Blueprint("api_v0", __name__)
    api = Api(api_v0)
    api.add_resource(LoginAPI, "/usuarios/")
    api.add_resource(PedidosAPI, "/pedidos/")
    api.add_resource(PedidoAPI, "/pedidos/<string:pedido_eid>/")

    app.register_blueprint(api_v0, url_prefix=api_template.format(version="v0"))
