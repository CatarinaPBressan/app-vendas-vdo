import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TIPOS_PRODUTO = {
  "cartao-de-credito": "cartao-de-credito",
  seguro: "seguro",
  consorcio: "consorcio",
};

export const PRODUTOS = {
  "cartao-de-credito": {
    nome: "Cartão de Crédito",
    icone: <FontAwesomeIcon icon="credit-card" className="product-icon" />,
    id: "cartao-de-credito",
    ordem: 1,
    tipo_produto: TIPOS_PRODUTO["cartao-de-credito"],
  },
  "seguro-vida": {
    nome: "Seguro de Vida Individual",
    icone: <FontAwesomeIcon icon="user" className="product-icon" />,
    id: "seguro-vida",
    ordem: 2,
    tipo_produto: TIPOS_PRODUTO.seguro,
  },
  "seguro-residencial": {
    nome: "Seguro Residencial",
    icone: <FontAwesomeIcon icon="house-user" className="product-icon" />,
    id: "seguro-residencial",
    ordem: 3,
    tipo_produto: TIPOS_PRODUTO.seguro,
  },
  "seguro-automotivo": {
    nome: "Seguro Automotivo",
    icone: <FontAwesomeIcon icon="car" className="product-icon" />,
    id: "seguro-automotivo",
    ordem: 4,
    tipo_produto: TIPOS_PRODUTO.seguro,
  },
  consorcio: {
    nome: "Consórcio",
    icone: (
      <>
        <span className="fa-layers fa-fw">
          {/**
           * Transformações base aplicadas:
           * car: shrink-5 down-5 left-5
           * slash: shrink-5
           * home: shrink-5 up-5 right-7
           *
           * Depois foi aplicada + left-5 para centralizar o conjunto
           */}
          <FontAwesomeIcon
            icon="car"
            transform="shrink-5 down-5 left-10"
            className="product-icon"
          />
          <FontAwesomeIcon
            icon="slash"
            className="product-icon"
            transform="shrink-5 left-5"
          />
          <FontAwesomeIcon
            icon="home"
            transform="shrink-5 up-5 right-2"
            className="product-icon"
          />
        </span>
      </>
    ),
    id: "consorcio",
    ordem: 5,
    tipo_produto: TIPOS_PRODUTO.consorcio,
  },
};
