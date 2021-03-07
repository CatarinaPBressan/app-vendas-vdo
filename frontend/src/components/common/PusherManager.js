import { useState, useEffect } from "react";

import {
  setUpPusher,
  PUSHER_CHANNELS,
  PUSHER_EVENTS,
} from "../../services/pusher";

const PusherManager = ({ usuario, addPedido, setDadosNotificacao }) => {
  const [pusher, setPusher] = useState();

  useEffect(() => {
    if (!usuario || pusher) {
      return;
    }
    const _pusher = setUpPusher(usuario);
    setPusher(_pusher);

    const novoOuAtualizaPedido = (pedido, tipoNotificacao) => {
      addPedido(pedido);
      setDadosNotificacao({ pedido, tipoNotificacao });
    };

    if (usuario.permissoes.includes("backoffice")) {
      const backofficeChannel = _pusher.subscribe(PUSHER_CHANNELS.BACKOFFICE);
      backofficeChannel.bind(PUSHER_EVENTS.PEDIDO_NOVO, (data) => {
        novoOuAtualizaPedido(data.pedido, PUSHER_EVENTS.PEDIDO_NOVO);
      });
      backofficeChannel.bind(PUSHER_EVENTS.PEDIDO_ATUALIZADO, (data) => {
        novoOuAtualizaPedido(data.pedido, PUSHER_EVENTS.PEDIDO_ATUALIZADO);
      });
    } else {
      const vendedorChannel = _pusher.subscribe(
        `${PUSHER_CHANNELS.VENDEDOR}-${usuario.eid}`,
      );
      vendedorChannel.bind(PUSHER_EVENTS.PEDIDO_ATUALIZADO, (data) => {
        novoOuAtualizaPedido(data.pedido, PUSHER_EVENTS.PEDIDO_ATUALIZADO);
      });
    }
  }, [usuario, pusher, addPedido, setDadosNotificacao]);

  useEffect(() => {
    if (usuario || !pusher) {
      return;
    }
    pusher.unsubscribe(PUSHER_CHANNELS.PEDIDOS);
  });

  return null;
};

export default PusherManager;
