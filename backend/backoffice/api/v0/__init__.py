from flask import Blueprint

from flask_restful import Api

from backoffice.api.v0 import usuarios, pedidos


def init_app(app, api_template):
    api_v0 = Blueprint("api_v0", __name__)
    api = Api(api_v0)
    api.add_resource(usuarios.LoginAPI, "/usuarios/")
    api.add_resource(pedidos.PedidosAPI, "/pedidos/")
    api.add_resource(pedidos.PedidoAPI, "/pedidos/<string:pedido_eid>/")
    api.add_resource(
        pedidos.UploadArquivoProdutoAPI,
        "/pedidos/<string:pedido_eid>"
        "/arquivos/<string:produto_key>/<string:nome_arquivo>",
    )
    api.add_resource(
        pedidos.DownloadArquivoProdutoAPI,
        "/pedidos/<string:pedido_eid>"
        "/arquivos/<string:produto_key>/<string:nome_arquivo>",
    )
    api.add_resource(pedidos.PedidoLogAPI, "/pedidos/<string:pedido_eid>/logs")

    app.register_blueprint(api_v0, url_prefix=api_template.format(version="v0"))
