import typing

import enum

from backoffice.models import produtos


class ESTADOS(str, enum.Enum):
    # Compartilhado entre todos os tipos de produtos
    NOVO = "novo"
    CANCELADO = "cancelado"
    COMPLETO = "completo"

    # Cartão de crédito
    ANALISE_CREDITO = "analise_credito"
    AGUARDANDO_ANALISE = "aguardando_analise"

    # Seguro/Consorcio
    COTACAO = "cotacao"
    AGUARDANDO_RESPOSTA_COTACAO = "aguardando_resposta_cliente"
    EMITIR_PROPOSTA = "emitir_proposta"
    VISTORIA = "vistoria"


class TRANSICOES(str, enum.Enum):
    # Compartilhado entre todos os tipos de produtos
    INICIAR = "iniciar"
    CANCELAR = "cancelar"

    # Cartão de crédito
    APROVAR_ANALISE = "aprovar"
    AGUARDAR_ANALISE = "aguardar_analise"
    REPROVAR_ANALISE = "reprovar"

    # Seguro/Consorcio
    ENVIAR_COTACAO = "enviar_cotacao"
    COTACAO_APROVADA = "cotacao_aprovada"
    PROPOSTA_EMITIDA = "proposta_emitida"
    APROVADO_VISTORIA = "aprovado_vistoria"


ESTADOS_LABELS: typing.Dict[str, str] = {
    ESTADOS.NOVO.value: "Novo",
    ESTADOS.CANCELADO.value: "Cancelado",
    ESTADOS.COMPLETO.value: "Completo",
    # Cartão de Crédito
    ESTADOS.ANALISE_CREDITO.value: "Análise de Crédito",
    ESTADOS.AGUARDANDO_ANALISE.value: "Aguardando Análise",
    # Seguro/Consorcio
    ESTADOS.COTACAO.value: "Em Cotação",
    ESTADOS.AGUARDANDO_RESPOSTA_COTACAO.value: "Aguardando Resposta do Cliente",
    ESTADOS.EMITIR_PROPOSTA.value: "Emitir Proposta",
    ESTADOS.VISTORIA.value: "Em Vistoria",
}


class Transicao(typing.TypedDict):
    trigger: TRANSICOES
    source: ESTADOS
    dest: ESTADOS


mapa_estados: typing.Dict[produtos.TIPO_PRODUTO, typing.List[ESTADOS]] = {
    produtos.TIPO_PRODUTO.CARTAO_DE_CREDITO: [
        ESTADOS.ANALISE_CREDITO,
        ESTADOS.AGUARDANDO_ANALISE,
    ],
    produtos.TIPO_PRODUTO.SEGURO: [
        ESTADOS.COTACAO,
        ESTADOS.AGUARDANDO_RESPOSTA_COTACAO,
        ESTADOS.EMITIR_PROPOSTA,
        ESTADOS.VISTORIA,
    ],
    produtos.TIPO_PRODUTO.CONSORCIO: [
        ESTADOS.COTACAO,
        ESTADOS.AGUARDANDO_RESPOSTA_COTACAO,
    ],
}


def get_estados_produto(produto: produtos.Produto) -> typing.List[ESTADOS]:
    """
    Pega a lista de estados para o produto.

    Retorna a lista de estados definidas no mapa_estados para cada tipo de
    pedido (ref: models.produtos), mais os estados NOVO, COMPLETO e CANCELADO.

    produto_slug pode ser None para facilitar criar pedidos de teste. Nesse caso essa
    função retorna somente os estados NOVO, COMPLETO e CANCELADO.
    """

    estados: typing.List[ESTADOS] = [ESTADOS.NOVO, ESTADOS.COMPLETO, ESTADOS.CANCELADO]

    if produto is not None:
        estados.extend(mapa_estados[produto.tipo_produto])

    return estados


mapa_transicoes: typing.Dict[produtos.TIPO_PRODUTO, typing.List[Transicao]] = {
    produtos.TIPO_PRODUTO.CARTAO_DE_CREDITO: [
        {
            "source": ESTADOS.NOVO.value,
            "trigger": TRANSICOES.INICIAR.value,
            "dest": ESTADOS.ANALISE_CREDITO.value,
        },
        ###
        {
            "source": ESTADOS.ANALISE_CREDITO.value,
            "trigger": TRANSICOES.APROVAR_ANALISE.value,
            "dest": ESTADOS.COMPLETO.value,
        },
        {
            "source": ESTADOS.ANALISE_CREDITO.value,
            "trigger": TRANSICOES.REPROVAR_ANALISE.value,
            "dest": ESTADOS.CANCELADO.value,
        },
        {
            "source": ESTADOS.ANALISE_CREDITO.value,
            "trigger": TRANSICOES.AGUARDAR_ANALISE.value,
            "dest": ESTADOS.AGUARDANDO_ANALISE.value,
        },
        ###
        {
            "source": ESTADOS.AGUARDANDO_ANALISE.value,
            "trigger": TRANSICOES.APROVAR_ANALISE.value,
            "dest": ESTADOS.COMPLETO.value,
        },
        {
            "source": ESTADOS.AGUARDANDO_ANALISE.value,
            "trigger": TRANSICOES.REPROVAR_ANALISE.value,
            "dest": ESTADOS.CANCELADO.value,
        },
    ],
    produtos.TIPO_PRODUTO.SEGURO: [
        {
            "source": ESTADOS.NOVO.value,
            "trigger": TRANSICOES.INICIAR.value,
            "dest": ESTADOS.COTACAO.value,
        },
        {
            "source": ESTADOS.COTACAO.value,
            "trigger": TRANSICOES.ENVIAR_COTACAO.value,
            "dest": ESTADOS.AGUARDANDO_RESPOSTA_COTACAO.value,
        },
        {
            "source": ESTADOS.AGUARDANDO_RESPOSTA_COTACAO.value,
            "trigger": TRANSICOES.COTACAO_APROVADA.value,
            "dest": ESTADOS.EMITIR_PROPOSTA.value,
        },
        {
            "source": ESTADOS.EMITIR_PROPOSTA.value,
            "trigger": TRANSICOES.PROPOSTA_EMITIDA.value,
            "dest": ESTADOS.VISTORIA.value,
        },
        {
            "source": ESTADOS.VISTORIA.value,
            "trigger": TRANSICOES.APROVADO_VISTORIA.value,
            "dest": ESTADOS.COMPLETO.value,
        },
    ],
    produtos.TIPO_PRODUTO.CONSORCIO: [
        {
            "source": ESTADOS.NOVO.value,
            "trigger": TRANSICOES.INICIAR.value,
            "dest": ESTADOS.COTACAO.value,
        },
        {
            "source": ESTADOS.COTACAO.value,
            "trigger": TRANSICOES.ENVIAR_COTACAO.value,
            "dest": ESTADOS.AGUARDANDO_RESPOSTA_COTACAO.value,
        },
        {
            "source": ESTADOS.AGUARDANDO_RESPOSTA_COTACAO.value,
            "trigger": TRANSICOES.COTACAO_APROVADA.value,
            "dest": ESTADOS.COMPLETO.value,
        },
    ],
}

TRANSICAO_CANCELAMENTO: Transicao = {
    "source": "*",
    "trigger": TRANSICOES.CANCELAR.value,
    "dest": ESTADOS.CANCELADO.value,
}


def get_transicoes_produto(
    produto: typing.Optional[produtos.Produto] = None,
) -> typing.List[Transicao]:
    """
    Pega a lista de transições para o produto.

    Retorna a lista de transições definidas no mapa_transicoes para cada tipo de
    pedido (ref: models.produtos), mais a transição de cancelamento.

    produto_slug pode ser None para facilitar criar pedidos de teste. Nesse caso essa
    função retorna somente a transição de cancelamento. (NOVO -- cancelar --> CANCELADO)
    """

    transicoes: typing.List[Transicao] = []

    if produto is not None:
        transicoes.extend(mapa_transicoes[produto.tipo_produto])

    transicoes.append(TRANSICAO_CANCELAMENTO)

    return transicoes
