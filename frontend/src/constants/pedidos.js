export const PEDIDO_STATUS = {
  NOVO: "novo",
  ANALISE_CREDITO: "analise_credito",
  EM_ANDAMENTO: "em_andamento",
  COMPLETO: "completo",
  CANCELADO: "cancelado",
  REPROVADO: "reprovado",
};

export const PEDIDO_STATUS_LABELS = {
  [PEDIDO_STATUS.NOVO]: "Novo",
  [PEDIDO_STATUS.ANALISE_CREDITO]: "Análise de Crédito",
  [PEDIDO_STATUS.EM_ANDAMENTO]: "Em andamento",
  [PEDIDO_STATUS.COMPLETO]: "Completo",
  [PEDIDO_STATUS.CANCELADO]: "Cancelado",
  [PEDIDO_STATUS.REPROVADO]: "Reprovado",
};

export const PEDIDO_TRANSICOES = {
  INICIAR: "iniciar",
  APROVAR: "aprovar",
  COMPLETAR: "completar",
  CANCELAR: "cancelar",
  REPROVAR: "reprovar",
};
