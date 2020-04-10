import React, { useState, useEffect } from "react";

import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { BreakpointProvider } from "react-socks";
import { toast, ToastContainer } from "react-toastify";
import { Container } from "react-bootstrap";

import { getUsuario, clearUsuario } from "./actions/usuario";
import { fetchPedidos, addPedido } from "./actions/pedido";

import LoginPage from "./components/LoginPage/LoginPage";
import ProdutosPage from "./components/ProdutosPage/ProdutosPage";
import ProdutoPage from "./components/ProdutoPage/ProdutoPage";
import PedidosPage from "./components/PedidosPage/PedidosPage";
import AppNavbar from "./components/common/AppNavbar";
import NovoPedidoNotifier from "./components/common/NotificationManager";
import PusherManager from "./components/common/PusherManager";

import "./styles/main.scss";

const App = ({
  usuario,
  getUsuario,
  clearUsuario,
  fetchPedidos,
  addPedido,
}) => {
  const [loading, setLoading] = useState(true);
  const [notificationPedido, setNotificationPedido] = useState(null);

  useEffect(() => {
    if (usuario) {
      (async () => {
        await fetchPedidos(usuario);
      })();
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
          toast.info("Login expirado. Faça login novamente.");
        }
      })();
    }
  }, [usuario, clearUsuario, getUsuario, fetchPedidos, addPedido]);

  return (
    <BrowserRouter>
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnHover
        draggable
      />
      <PusherManager
        usuario={usuario}
        addPedido={addPedido}
        setNotificationPedido={setNotificationPedido}
      />
      <NovoPedidoNotifier
        usuario={usuario}
        notificationPedido={notificationPedido}
        setNotificationPedido={setNotificationPedido}
      />
      <AppNavbar />
      <Container>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <BreakpointProvider>
            {!usuario ? (
              <Switch>
                <Route path="/" component={LoginPage} exact />
                <Route path="*">
                  <Redirect to="/" />
                </Route>
              </Switch>
            ) : (
              <Switch>
                <Route path="/pedidos/" component={PedidosPage} />
                <Route
                  path="/novo-pedido/:produtoId"
                  component={ProdutoPage}
                  exact
                />
                <Route path="/" component={ProdutosPage} exact />
                <Route path="*">
                  <Redirect to="/" />
                </Route>
              </Switch>
            )}
          </BreakpointProvider>
        )}
      </Container>
    </BrowserRouter>
  );
};

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
