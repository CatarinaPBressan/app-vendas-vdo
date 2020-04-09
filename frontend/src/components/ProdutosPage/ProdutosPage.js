import React from "react";

import { connect } from "react-redux";

import ProdutoCard from "./ProdutoCard";

import { PRODUTOS } from "../../constants/produtos";

import "./ProdutosPage.scss";

const ProdutosPage = () => {
  return (
    <div className="produtos-page">
      <div className="produtos-container">
        {Object.values(PRODUTOS).map((produto) => (
          <ProdutoCard key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  usuario: state.usuario.usuario,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProdutosPage);
