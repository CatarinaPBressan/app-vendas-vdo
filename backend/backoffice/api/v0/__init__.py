from flask import Blueprint

from flask_restful import Api

from backoffice.api.v0.usuarios import LoginAPI
from backoffice.api.v0.pedidos import (
    PedidosAPI,
    PedidoAPI,
    UploadArquivoProdutoAPI,
    DownloadArquivoProdutoAPI,
)


def init_app(app, api_template):
    api_v0 = Blueprint("api_v0", __name__)
    api = Api(api_v0)
    api.add_resource(LoginAPI, "/usuarios/")
    api.add_resource(PedidosAPI, "/pedidos/")
    api.add_resource(PedidoAPI, "/pedidos/<string:pedido_eid>/")
    api.add_resource(
        UploadArquivoProdutoAPI,
        "/pedidos/<string:pedido_eid>"
        "/arquivos/<string:produto_key>/<string:nome_arquivo>",
    )
    api.add_resource(
        DownloadArquivoProdutoAPI,
        "/pedidos/<string:pedido_eid>"
        "/arquivos/<string:produto_key>/<string:nome_arquivo>",
    )

    app.register_blueprint(api_v0, url_prefix=api_template.format(version="v0"))
