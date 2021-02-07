import pytest

from backoffice.models.pedidos import status
from backoffice.models import produtos


def test_transicoes_do_pedido_produto_none():
    transicoes = status.get_maquina_estados_produto(None)

    assert len(transicoes) == 1
    assert status.TRANSICAO_CANCELAMENTO in transicoes


@pytest.mark.parametrize(
    "produto", [_produto for _produto in produtos.PRODUTOS.values()],
)
def test_transicoes_do_pedido_de_acordo_com_produto(produto: produtos.Produto):
    transicoes = status.get_maquina_estados_produto(produto)

    _transicoes_produto = status.mapa_transicoes[produto.tipo_produto]
    assert len(transicoes) == len(_transicoes_produto) + 1
    assert status.TRANSICAO_CANCELAMENTO in transicoes

    for _transicao in _transicoes_produto:
        assert _transicao in transicoes
