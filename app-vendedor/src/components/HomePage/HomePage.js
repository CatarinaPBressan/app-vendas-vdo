import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import ProdutoCard from "./ProdutoCard";
import Page from "../common/Page";

import { PRODUTOS } from "../../definitions/produtos";

import "./HomePage.scss";

class HomePage extends Component {
  static propTypes = {
    usuario: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Page
        usuario={this.props.usuario}
        location={this.props.location}
        pageClassNames="home-page"
      >
        <div className="products-container">
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
