export const TIPOS_PRODUTO = {
  "cartao-de-credito": "cartao-de-credito",
  seguro: "seguro",
};

export const PRODUTOS = {
  "cartao-de-credito": {
    nome: "Cartão de Crédito",
    icone: "credit-card",
    id: "cartao-de-credito",
    ordem: 1,
    tipo_produto: TIPOS_PRODUTO["cartao-de-credito"],
  },
  "seguro-vida": {
    nome: "Seguro de Vida Individual",
    icone: "user",
    id: "seguro-vida",
    ordem: 2,
    tipo_produto: TIPOS_PRODUTO.seguro,
  },
  "seguro-residencial": {
    nome: "Seguro Residencial",
    icone: "house-user",
    id: "seguro-residencial",
    ordem: 3,
    tipo_produto: TIPOS_PRODUTO.seguro,
  },
  "seguro-automotivo": {
    nome: "Seguro Automotivo",
    icone: "car",
    id: "seguro-automotivo",
    ordem: 4,
    tipo_produto: TIPOS_PRODUTO.seguro,
  },
};
