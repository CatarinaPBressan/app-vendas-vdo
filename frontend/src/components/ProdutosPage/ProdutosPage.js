import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import ProdutoCard from "./ProdutoCard";
import Page from "../common/Page";

import { PRODUTOS } from "../../constants/produtos";

import "./ProdutosPage.scss";

class ProdutosPage extends Component {
  static propTypes = {
    usuario: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Page
        usuario={this.props.usuario}
        location={this.props.location}
        history={this.props.history}
        pageClassNames="produtos-page"
      >
        <div className="produtos-container">
          {Object.values(PRODUTOS).map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      </Page>
    );
  }
}
const mapStateToProps = (state) => ({
  usuario: state.usuario.usuario,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProdutosPage);
