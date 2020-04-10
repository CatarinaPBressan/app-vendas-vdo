import { useState, useEffect } from "react";

import {
  setUpPusher,
  PUSHER_CHANNELS,
  PUSHER_EVENTS,
} from "../../services/pusher";

const PusherManager = ({ usuario, addPedido, setNotificationPedido }) => {
  const [pusher, setPusher] = useState();

  useEffect(() => {
    if (!usuario || pusher) {
      return;
    }
    const _pusher = setUpPusher(usuario);
    setPusher(_pusher);

    if (usuario.permissoes.includes("backoffice")) {
      const pedidosChannel = _pusher.subscribe(PUSHER_CHANNELS.PEDIDOS);
      pedidosChannel.bind(PUSHER_EVENTS.NOVO_PEDIDO, (data) => {
        const pedido = data.pedido;
        addPedido(pedido);
        setNotificationPedido(pedido);
      });
    }
  }, [usuario, pusher, addPedido, setNotificationPedido]);

  useEffect(() => {
    if (usuario || !pusher) {
      return;
    }
    pusher.unsubscribe(PUSHER_CHANNELS.PEDIDOS);
  });

  return null;
};

export default PusherManager;
