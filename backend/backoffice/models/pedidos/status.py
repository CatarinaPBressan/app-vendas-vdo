import typing

import enum

from backoffice.models import produtos


class ESTADOS(str, enum.Enum):
    # Compartilhado entre todos os tipos de produtos
    NOVO = "novo"
    CANCELADO = "cancelado"

    # Cartão de crédito
    COMPLETO = "completo"
    ANALISE_CREDITO = "analise_credito"
    REPROVADO = "reprovado"
    EM_ANDAMENTO = "em_andamento"

    # Seguro
    COTACAO = "cotacao"
    AGUARDANDO_RESPOSTA_COTACAO = "aguardando_resposta_cliente"
    EMITIR_PROPOSTA = "emitir_proposta"
    VISTORIA = "vistoria"


class TRANSICOES(str, enum.Enum):
    # Compartilhado entre todos os tipos de produtos
    INICIAR = "iniciar"
    CANCELAR = "cancelar"

    # Cartão de crédito
    APROVAR = "aprovar"
    COMPLETAR = "completar"
    REPROVAR = "reprovar"

    # Seguro
    ENVIAR_COTACAO = "enviar_cotacao"
    COTACAO_APROVADA = "cotacao_aprovada"
    PROPOSTA_EMITIDA = "proposta_emitida"
    APROVADO_VISTORIA = "aprovado_vistoria"


class Transicao(typing.TypedDict):
    trigger: TRANSICOES
    source: ESTADOS
    dest: ESTADOS


mapa_transicoes: typing.Dict[produtos.TipoProduto, typing.List[Transicao]] = {
    produtos.TipoProduto.CARTAO_DE_CREDITO: [
        {
            "source": ESTADOS.NOVO.value,
            "trigger": TRANSICOES.INICIAR.value,
            "dest": ESTADOS.ANALISE_CREDITO.value,
        },
        {
            "source": ESTADOS.ANALISE_CREDITO.value,
            "trigger": TRANSICOES.APROVAR.value,
            "dest": ESTADOS.EM_ANDAMENTO.value,
        },
        {
            "source": ESTADOS.EM_ANDAMENTO.value,
            "trigger": TRANSICOES.COMPLETAR.value,
            "dest": ESTADOS.COMPLETO.value,
        },
        {
            "source": ESTADOS.ANALISE_CREDITO.value,
            "trigger": TRANSICOES.REPROVAR.value,
            "dest": ESTADOS.REPROVADO.value,
        },
    ],
    produtos.TipoProduto.SEGURO: [
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
}

TRANSICAO_CANCELAMENTO: Transicao = {
    "source": "*",
    "trigger": TRANSICOES.CANCELAR.value,
    "dest": ESTADOS.CANCELADO.value,
}


def get_maquina_estados_produto(
    produto: typing.Optional[produtos.Produto] = None,
) -> typing.List[Transicao]:
    """
    Pega a lista de transições para o produto_slug.

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
