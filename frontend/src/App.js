import React, { useState, useEffect } from "react";

import { Route, BrowserRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { BreakpointProvider } from "react-socks";

import { getUsuario, clearUsuario } from "./actions/usuario";
import { fetchPedidos, addPedido } from "./actions/pedido";
import { setUpPusher, PUSHER } from "./services/pusher";

import LoginPage from "./components/LoginPage/LoginPage";
import ProdutosPage from "./components/ProdutosPage/ProdutosPage";
import ProdutoPage from "./components/ProdutoPage/ProdutoPage";
import PedidosPage from "./components/PedidosPage/PedidosPage";

import "./styles/main.scss";

function App(props) {
  const [loading, setLoading] = useState(true);

  const { usuario, getUsuario, clearUsuario, fetchPedidos, addPedido } = props;
  useEffect(() => {
    if (usuario) {
      (async () => {
        await fetchPedidos(usuario);
      })();
      if (usuario.permissoes.includes("backoffice")) {
        const pusher = setUpPusher();
        const channel = pusher.subscribe(PUSHER.PEDIDOS_CHANNEL);
        channel.bind(PUSHER.EVENT_NOVO_PEDIDO, (data) => {
          addPedido(data.pedido);
        });
      }
      setLoading(false);
    } else {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      (async () => {
        const usuario = await getUsuario(token);
        if (!usuario) {
          clearUsuario();
          setLoading(false);
        }
      })();
    }
  }, [usuario, clearUsuario, getUsuario, fetchPedidos, addPedido]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <BreakpointProvider>
          {!props.usuario ? (
            <LoginPage />
          ) : (
            <BrowserRouter>
              <Switch>
                <Route path="/pedidos/" component={PedidosPage} />
                <Route path="/novo-pedido/:produtoId" component={ProdutoPage} />
                <Route path="/" component={ProdutosPage} />
              </Switch>
            </BrowserRouter>
          )}
        </BreakpointProvider>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  usuario: state.usuario.usuario,
});

const mapDispatchToProps = {
  getUsuario: getUsuario,
  fetchPedidos: fetchPedidos,
  addPedido: addPedido,
  clearUsuario: clearUsuario,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
