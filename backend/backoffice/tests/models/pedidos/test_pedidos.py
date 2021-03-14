"""
Testes do modelo de Pedido
"""
import os

from unittest import mock
import pytest

from backoffice.models import pedido_logs, pedidos, produtos, db
from backoffice.models.pedidos import status


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

    assert pedido.validar_dados_cotacao("cotacao") == (
        produto.tipo_produto
        in [produtos.TIPO_PRODUTO.SEGURO, produtos.TIPO_PRODUTO.CONSORCIO]
    )


@pytest.mark.parametrize(
    "produto_slug", [_produto_slug for _produto_slug in produtos.PRODUTOS.keys()],
)
def test_validar_dados_cotacao_outra_key(produto_slug: str):
    pedido = pedidos.Pedido(produto_slug=produto_slug)

    assert pedido.validar_dados_cotacao("blah") is False


def test_salvar_cotacao(app):
    app.instance_path = "path/to/instance"
    pedido = pedidos.Pedido()
    db.session.add(pedido)
    db.session.commit()

    file = mock.Mock()
    file.filename = "xxx.txt"

    with mock.patch("os.path.exists", return_value=False) as exists_mock:
        with mock.patch("os.makedirs") as makedirs_mock:
            url_cotacao = pedido.salvar_cotacao(file)
            makedirs_mock.assert_called_once_with(
                f"{os.getcwd()}/path/to/instance/pedidos/{pedido.eid}/cotacao"
            )
        exists_mock.asssert_has_calls(
            [
                mock.call(
                    f"{os.getcwd()}/path/to/instance/pedidos/{pedido.eid}/cotacao/"
                    f"{file.filename}"
                ),
                mock.call(
                    f"{os.getcwd()}/path/to/instance/pedidos/{pedido.eid}/cotacao"
                ),
            ]
        )

    file.save.assert_called_once_with(
        f"{os.getcwd()}/path/to/instance/pedidos/{pedido.eid}/cotacao/{file.filename}"
    )

    assert pedido.arquivo_cotacao_url == url_cotacao


def test_logs_automaticos_pedido_sem_produto(app):
    pedido = pedidos.Pedido()

    # Log de criação
    assert len(pedido.logs) == 1

    pedido.trigger(status.TRANSICOES.CANCELAR.value)

    # Log criação + transição
    assert len(pedido.logs) == 2
    log_cancelado: pedido_logs.PedidoLog = pedido.logs[-1]
    assert (
        status.ESTADOS_LABELS[status.ESTADOS.CANCELADO.value] in log_cancelado.mensagem
    )


@pytest.mark.parametrize(
    "produto_slug,transicao,status_inicial,status_final",
    [
        (
            "cartao-de-credito",
            status.TRANSICOES.INICIAR,
            status.ESTADOS.NOVO,
            status.ESTADOS.ANALISE_CREDITO,
        ),
        (
            "cartao-de-credito",
            status.TRANSICOES.APROVAR_ANALISE,
            status.ESTADOS.ANALISE_CREDITO,
            status.ESTADOS.COMPLETO,
        ),
        (
            "cartao-de-credito",
            status.TRANSICOES.REPROVAR_ANALISE,
            status.ESTADOS.ANALISE_CREDITO,
            status.ESTADOS.CANCELADO,
        ),
        (
            "cartao-de-credito",
            status.TRANSICOES.AGUARDAR_ANALISE,
            status.ESTADOS.ANALISE_CREDITO,
            status.ESTADOS.AGUARDANDO_ANALISE,
        ),
        (
            "cartao-de-credito",
            status.TRANSICOES.APROVAR_ANALISE,
            status.ESTADOS.AGUARDANDO_ANALISE,
            status.ESTADOS.COMPLETO,
        ),
        (
            "cartao-de-credito",
            status.TRANSICOES.REPROVAR_ANALISE,
            status.ESTADOS.AGUARDANDO_ANALISE,
            status.ESTADOS.CANCELADO,
        ),
        (
            "seguro-vida",
            status.TRANSICOES.INICIAR,
            status.ESTADOS.NOVO,
            status.ESTADOS.COTACAO,
        ),
        (
            "seguro-vida",
            status.TRANSICOES.ENVIAR_COTACAO,
            status.ESTADOS.COTACAO,
            status.ESTADOS.AGUARDANDO_RESPOSTA_COTACAO,
        ),
        (
            "seguro-vida",
            status.TRANSICOES.COTACAO_APROVADA,
            status.ESTADOS.AGUARDANDO_RESPOSTA_COTACAO,
            status.ESTADOS.EMITIR_PROPOSTA,
        ),
        (
            "seguro-vida",
            status.TRANSICOES.PROPOSTA_EMITIDA,
            status.ESTADOS.EMITIR_PROPOSTA,
            status.ESTADOS.VISTORIA,
        ),
        (
            "seguro-vida",
            status.TRANSICOES.APROVADO_VISTORIA,
            status.ESTADOS.VISTORIA,
            status.ESTADOS.COMPLETO,
        ),
        (
            "seguro-residencial",
            status.TRANSICOES.INICIAR,
            status.ESTADOS.NOVO,
            status.ESTADOS.COTACAO,
        ),
        (
            "seguro-residencial",
            status.TRANSICOES.ENVIAR_COTACAO,
            status.ESTADOS.COTACAO,
            status.ESTADOS.AGUARDANDO_RESPOSTA_COTACAO,
        ),
        (
            "seguro-residencial",
            status.TRANSICOES.COTACAO_APROVADA,
            status.ESTADOS.AGUARDANDO_RESPOSTA_COTACAO,
            status.ESTADOS.EMITIR_PROPOSTA,
        ),
        (
            "seguro-residencial",
            status.TRANSICOES.PROPOSTA_EMITIDA,
            status.ESTADOS.EMITIR_PROPOSTA,
            status.ESTADOS.VISTORIA,
        ),
        (
            "seguro-residencial",
            status.TRANSICOES.APROVADO_VISTORIA,
            status.ESTADOS.VISTORIA,
            status.ESTADOS.COMPLETO,
        ),
        (
            "seguro-automotivo",
            status.TRANSICOES.INICIAR,
            status.ESTADOS.NOVO,
            status.ESTADOS.COTACAO,
        ),
        (
            "seguro-automotivo",
            status.TRANSICOES.ENVIAR_COTACAO,
            status.ESTADOS.COTACAO,
            status.ESTADOS.AGUARDANDO_RESPOSTA_COTACAO,
        ),
        (
            "seguro-automotivo",
            status.TRANSICOES.COTACAO_APROVADA,
            status.ESTADOS.AGUARDANDO_RESPOSTA_COTACAO,
            status.ESTADOS.EMITIR_PROPOSTA,
        ),
        (
            "seguro-automotivo",
            status.TRANSICOES.PROPOSTA_EMITIDA,
            status.ESTADOS.EMITIR_PROPOSTA,
            status.ESTADOS.VISTORIA,
        ),
        (
            "seguro-automotivo",
            status.TRANSICOES.APROVADO_VISTORIA,
            status.ESTADOS.VISTORIA,
            status.ESTADOS.COMPLETO,
        ),
        (
            "consorcio",
            status.TRANSICOES.INICIAR,
            status.ESTADOS.NOVO,
            status.ESTADOS.COTACAO,
        ),
        (
            "consorcio",
            status.TRANSICOES.ENVIAR_COTACAO,
            status.ESTADOS.COTACAO,
            status.ESTADOS.AGUARDANDO_RESPOSTA_COTACAO,
        ),
        (
            "consorcio",
            status.TRANSICOES.COTACAO_APROVADA,
            status.ESTADOS.AGUARDANDO_RESPOSTA_COTACAO,
            status.ESTADOS.COMPLETO,
        ),
    ],
)
def test_log_automaticos_pedido_produto(
    app, produto_slug, transicao, status_inicial, status_final
):
    pedido = pedidos.Pedido(produto_slug=produto_slug, status=status_inicial.value)

    assert len(pedido.logs) == 1

    pedido.trigger(transicao.value)

    # Log criação + transição
    assert len(pedido.logs) == 2
    log_transicao: pedido_logs.PedidoLog = pedido.logs[-1]
    assert status.ESTADOS_LABELS[status_final.value] in log_transicao.mensagem
