import Pusher from "pusher-js";

export const setUpPusher = (usuario) => {
  if (process.env.NODE_ENV === "development") {
    Pusher.logToConsole = true;
  }

  return new Pusher(usuario.pusher_key, {
    cluster: usuario.pusher_cluster,
    forceTLS: true,
  });
};

export const PUSHER_CHANNELS = {
  PEDIDOS: "pedidos",
};

export const PUSHER_EVENTS = {
  NOVO_PEDIDO: "novo-pedido",
};
