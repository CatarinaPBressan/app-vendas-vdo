import { useEffect, useCallback } from "react";

import { useHistory } from "react-router-dom";

import {
  NOTIFICACAO_DEFAULT,
  NOTIFICATION_STATUS,
} from "../../constants/notifications";
import { PRODUTOS } from "../../constants/produtos";
import { PUSHER_EVENTS } from "../../services/pusher";

export const Notificacoes = ({
  usuario,
  dadosNotificacao: { pedido, tipoNotificacao },
  setDadosNotificacao,
}) => {
  const history = useHistory();

  const isNotificationEnabled = "Notification" in window;

  const mostrarNotificacao = useCallback(
    (pedido, tipoNotificacao) => {
      if (!isNotificationEnabled) {
        return;
      }

      if (Notification.permission === NOTIFICATION_STATUS.GRANTED) {
        const notification = new Notification(
          getMensagemNotificacao(pedido, tipoNotificacao),
        );
        notification.onclick = () => {
          history.push(`/pedidos/${pedido.eid}`);
        };
      }
    },
    [history, isNotificationEnabled],
  );

  useEffect(() => {
    if (!isNotificationEnabled) {
      return;
    }

    if (Notification.permission !== NOTIFICATION_STATUS.GRANTED) {
      Notification.requestPermission();
    }
  });

  useEffect(() => {
    if (!isNotificationEnabled) {
      return;
    }

    if (pedido && Notification.permission === NOTIFICATION_STATUS.GRANTED) {
      mostrarNotificacao(pedido, tipoNotificacao);
      setDadosNotificacao(NOTIFICACAO_DEFAULT);
    }
  }, [
    pedido,
    mostrarNotificacao,
    setDadosNotificacao,
    usuario,
    isNotificationEnabled,
    tipoNotificacao,
  ]);

  return null;
};

const getMensagemNotificacao = (pedido, tipoNotificacao) => {
  return {
    [PUSHER_EVENTS.PEDIDO_NOVO]: `Novo pedido de ${
      PRODUTOS[pedido.produto_slug].nome
    }: CPF ${pedido.cpf}`,
    [PUSHER_EVENTS.PEDIDO_ATUALIZADO]: `Nova atualização no pedido CPF ${pedido.cpf}`,
  }[tipoNotificacao];
};
