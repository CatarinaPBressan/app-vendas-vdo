"""
Testes do modelo de Pedido
"""
import os

import pytest

from backoffice.models import pedidos, produtos


def test_get_diretorio(app):
    app.instance_path = "/some/path"

    pedido = pedidos.Pedido(eid="XYZ")

    assert pedido.get_diretorio_arquivo("key") == "/some/path/pedidos/XYZ/key"


def test_get_diretorio_relativo(app):
    app.instance_path = "./some/relative/path"

    pedido = pedidos.Pedido(eid="XYZ")

    assert (
        pedido.get_diretorio_arquivo("key")
        == f"{os.getcwd()}/some/relative/path/pedidos/XYZ/key"
    )


@pytest.mark.parametrize(
    "produto_slug,produto",
    [
        (_produto_slug, _produto)
        for _produto_slug, _produto in produtos.PRODUTOS.items()
    ],
)
def test_validar_dados_cotacao_tipos_produto(
    produto_slug: str, produto: produtos.Produto
):
    pedido = pedidos.Pedido(produto_slug=produto_slug)

    # Pedidos de seguro devem aceitar a cotação
    assert pedido.validar_dados_cotacao("cotacao") == (
        produto.tipo_produto == produtos.TipoProduto.SEGURO
    )


@pytest.mark.parametrize(
    "produto_slug", [_produto_slug for _produto_slug in produtos.PRODUTOS.keys()],
)
def test_validar_dados_cotacao_outra_key(produto_slug: str):
    pedido = pedidos.Pedido(produto_slug=produto_slug)

    assert pedido.validar_dados_cotacao("blah") is False
