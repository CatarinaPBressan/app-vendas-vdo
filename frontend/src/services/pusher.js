import Pusher from "pusher-js";

export const setUpPusher = () => {
  if (process.env.NODE_ENV === "development") {
    Pusher.logToConsole = true;
  }

  return new Pusher(process.env.REACT_APP_PUSHER_KEY, {
    cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    forceTLS: true,
  });
};

export const PUSHER = {
  PEDIDOS_CHANNEL: "pedidos",
  EVENT_NOVO_PEDIDO: "novo-pedido",
};
