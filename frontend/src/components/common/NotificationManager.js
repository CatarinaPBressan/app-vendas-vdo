import { useEffect, useCallback } from "react";

import { useHistory } from "react-router-dom";
import UiFx from "uifx";

import { NOTIFICATION_STATUS } from "../../constants/notifications";
import { PRODUTOS } from "../../constants/produtos";

import notificationAudio from "../../static/sound/notification.wav";

const NovoPedidoNotifier = ({
  usuario,
  notificationPedido,
  setNotificationPedido,
}) => {
  const history = useHistory();
  const notificationFx = new UiFx(notificationAudio);

  const playNotification = useCallback(
    (pedido) => {
      if (Notification.permission === NOTIFICATION_STATUS.GRANTED) {
        const notification = new Notification(
          `Novo pedido de ${PRODUTOS[pedido.produto_slug].nome} (${
            pedido.eid
          }) `,
        );
        notificationFx.play();
        notification.onclick = () => {
          history.push(`/pedidos/${pedido.eid}`);
        };
      }
    },
    [history, notificationFx],
  );

  useEffect(() => {
    if (usuario) {
      if (usuario.permissoes.includes("backoffice")) {
        if (Notification.permission !== NOTIFICATION_STATUS.GRANTED) {
          Notification.requestPermission();
        }
      }
    }
  });

  useEffect(() => {
    if (
      notificationPedido &&
      Notification.permission === NOTIFICATION_STATUS.GRANTED
    ) {
      playNotification(notificationPedido);
      setNotificationPedido(null);
    }
  }, [notificationPedido, playNotification, setNotificationPedido]);

  return null;
};

export default NovoPedidoNotifier;
