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
  BACKOFFICE: "backoffice",
  VENDEDOR: "vendedor",
};

export const PUSHER_EVENTS = {
  PEDIDO_NOVO: "pedido-novo",
  PEDIDO_ATUALIZADO: "pedido-atualizado",
};
