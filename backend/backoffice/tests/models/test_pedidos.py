"""
Testes do modelo de Pedido
"""
import os


from backoffice.models import pedidos


def test_get_diretorio(app):
    app.instance_path = "/some/path"

    pedido = pedidos.Pedido(eid="XYZ")

    assert pedido.get_diretorio_arquivo("key") == "/some/path/pedidos/XYZ/key"


def test_get_diretorio(app):
    app.instance_path = "./some/relative/path"

    pedido = pedidos.Pedido(eid="XYZ")

    assert (
        pedido.get_diretorio_arquivo("key")
        == f"{os.getcwd()}/some/relative/path/pedidos/XYZ/key"
    )
