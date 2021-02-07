import { TIPOS_PRODUTO } from "./produtos";

export const PEDIDO_STATUS = {
  NOVO: "novo",
  COMPLETO: "completo",
  CANCELADO: "cancelado",

  // Cartão de crédito
  ANALISE_CREDITO: "analise_credito",
  AGUARDANDO_ANALISE: "aguardando_analise",

  // Seguro
  COTACAO: "cotacao",
  AGUARDANDO_RESPOSTA_COTACAO: "aguardando_resposta_cliente",
  EMITIR_PROPOSTA: "emitir_proposta",
  VISTORIA: "vistoria",
};

export const PEDIDO_STATUS_LABELS = {
  [PEDIDO_STATUS.NOVO]: "Novo",
  [PEDIDO_STATUS.CANCELADO]: "Cancelado",
  [PEDIDO_STATUS.COMPLETO]: "Completo",

  // Cartão de Crédito
  [PEDIDO_STATUS.ANALISE_CREDITO]: "Análise de Crédito",
  [PEDIDO_STATUS.AGUARDANDO_ANALISE]: "Aguardando Análise",

  // Seguro
  [PEDIDO_STATUS.COTACAO]: "Em Cotação",
  [PEDIDO_STATUS.AGUARDANDO_RESPOSTA_COTACAO]: "Aguardando Resposta do Cliente",
  [PEDIDO_STATUS.EMITIR_PROPOSTA]: "Emitir Proposta",
  [PEDIDO_STATUS.VISTORIA]: "Em Vistoria",
};

export const PEDIDO_TRANSICOES = {
  INICIAR: "iniciar",
  CANCELAR: "cancelar",

  //Cartão de crédito
  APROVAR_ANALISE: "aprovar",
  AGUARDAR_ANALISE: "aguardar_analise",
  REPROVAR_ANALISE: "reprovar",

  //Seguro
  ENVIAR_COTACAO: "enviar_cotacao",
  COTACAO_APROVADA: "cotacao_aprovada",
  PROPOSTA_EMITIDA: "proposta_emitida",
  APROVADO_VISTORIA: "aprovado_vistoria",
};

export const PEDIDO_TRANSICOES_LABELS = {
  [PEDIDO_TRANSICOES.INICIAR]: "Iniciar",
  [PEDIDO_TRANSICOES.CANCELAR]: "Cancelar",

  //Cartão de crédito
  [PEDIDO_TRANSICOES.APROVAR_ANALISE]: "Aprovar",
  [PEDIDO_TRANSICOES.AGUARDAR_ANALISE]: "Aguardar Analise",
  [PEDIDO_TRANSICOES.REPROVAR_ANALISE]: "Reprovar",

  //Seguro
  [PEDIDO_TRANSICOES.ENVIAR_COTACAO]: "Enviar Cotação",
  [PEDIDO_TRANSICOES.COTACAO_APROVADA]: "Cotação Aprovada",
  [PEDIDO_TRANSICOES.PROPOSTA_EMITIDA]: "Proposta Emitida",
  [PEDIDO_TRANSICOES.APROVADO_VISTORIA]: "Aprovado na Vistoria",
};

export const MAPA_PRODUTO_TRANSICOES = {
  [TIPOS_PRODUTO["cartao-de-credito"]]: {
    [PEDIDO_STATUS.ANALISE_CREDITO]: [
      {
        label: PEDIDO_TRANSICOES_LABELS[PEDIDO_TRANSICOES.APROVAR_ANALISE],
        variant: "success",
        transicao: PEDIDO_TRANSICOES.APROVAR_ANALISE,
      },
      {
        label: PEDIDO_TRANSICOES_LABELS[PEDIDO_TRANSICOES.REPROVAR_ANALISE],
        variant: "danger",
        transicao: PEDIDO_TRANSICOES.REPROVAR_ANALISE,
      },
      {
        label: PEDIDO_TRANSICOES_LABELS[PEDIDO_TRANSICOES.AGUARDAR_ANALISE],
        variant: "secondary",
        transicao: PEDIDO_TRANSICOES.AGUARDAR_ANALISE,
      },
    ],
    [PEDIDO_STATUS.AGUARDANDO_ANALISE]: [
      {
        label: PEDIDO_TRANSICOES_LABELS[PEDIDO_TRANSICOES.APROVAR_ANALISE],
        variant: "success",
        transicao: PEDIDO_TRANSICOES.APROVAR_ANALISE,
      },
      {
        label: PEDIDO_TRANSICOES_LABELS[PEDIDO_TRANSICOES.REPROVAR_ANALISE],
        variant: "danger",
        transicao: PEDIDO_TRANSICOES.REPROVAR_ANALISE,
      },
    ],
  },
  [TIPOS_PRODUTO.seguro]: {
    [PEDIDO_STATUS.COTACAO]: [
      {
        label: PEDIDO_TRANSICOES_LABELS[PEDIDO_TRANSICOES.ENVIAR_COTACAO],
        variant: "success",
        transicao: PEDIDO_TRANSICOES.ENVIAR_COTACAO,
      },
    ],
    [PEDIDO_STATUS.AGUARDANDO_RESPOSTA_COTACAO]: [
      {
        label: PEDIDO_TRANSICOES_LABELS[PEDIDO_TRANSICOES.COTACAO_APROVADA],
        variant: "success",
        transicao: PEDIDO_TRANSICOES.COTACAO_APROVADA,
      },
    ],
    [PEDIDO_STATUS.EMITIR_PROPOSTA]: [
      {
        label: PEDIDO_TRANSICOES_LABELS[PEDIDO_TRANSICOES.PROPOSTA_EMITIDA],
        variant: "success",
        transicao: PEDIDO_TRANSICOES.PROPOSTA_EMITIDA,
      },
    ],
    [PEDIDO_STATUS.VISTORIA]: [
      {
        label: PEDIDO_TRANSICOES_LABELS[PEDIDO_TRANSICOES.APROVADO_VISTORIA],
        variant: "success",
        transicao: PEDIDO_TRANSICOES.APROVADO_VISTORIA,
      },
    ],
  },
};
