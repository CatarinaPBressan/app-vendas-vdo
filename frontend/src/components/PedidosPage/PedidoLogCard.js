import React, { useState } from "react";

import { Form, Card, Col, Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateTime } from "luxon";

import "./PedidoLogCard.scss";

export const PedidoLogCard = ({ pedido, usuario, createPedidoLog }) => {
  const [enviandoPedidoLog, setEnviandoPedidoLog] = useState(false);

  return (
    <Card>
      <Card.Header>Logs do pedido</Card.Header>
      <Card.Body>
        <Table size="sm" bordered hover striped>
          <thead>
            <tr>
              <th>Mensagem</th>
              <th>Usuario</th>
              <th>Data/Hora</th>
              {usuario.permissoes.includes("backoffice") && <th>Publico</th>}
            </tr>
          </thead>
          <tbody>
            {pedido.logs.map((pedidoLog) => {
              if (
                !pedidoLog.publico &&
                !usuario.permissoes.includes("backoffice")
              ) {
                return null;
              }

              return (
                <tr key={pedidoLog.eid} className="pedido-log-row">
                  <td>{pedidoLog.mensagem}</td>
                  <td>
                    {pedidoLog.usuario ? (
                      pedidoLog.usuario.nome
                    ) : (
                      <span className="pedido-log-usuario-sistema">
                        Sistema
                      </span>
                    )}
                  </td>
                  <td>
                    {DateTime.fromISO(pedidoLog.criado_em, {
                      zone: "utc",
                    })
                      .toLocal()
                      .setLocale("pt-br")
                      .toLocaleString(DateTime.DATETIME_SHORT)}
                  </td>
                  {usuario.permissoes.includes("backoffice") && (
                    <td>
                      {pedidoLog.publico && <FontAwesomeIcon icon="eye" />}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer>
        <Form
          onSubmit={async (e) => {
            e.preventDefault();

            setEnviandoPedidoLog(true);

            await createPedidoLog(
              pedido,
              usuario,
              e.target.elements.mensagem.value,
              e.target.elements.publico.checked,
            );

            setEnviandoPedidoLog(false);
          }}
        >
          <Form.Row>
            <Form.Group controlId="mensagem" as={Col}>
              <Form.Control name="mensagem" as="textarea" required />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="publico" as={Col} lg={4}>
              <Form.Check
                label={
                  <span>
                    Mensagem pública <FontAwesomeIcon icon="eye" />
                  </span>
                }
                name="publico"
                defaultChecked={!usuario.permissoes.includes("backoffice")}
                disabled={!usuario.permissoes.includes("backoffice")}
              />
            </Form.Group>
            <Col lg={5}></Col>
            <Col lg={3}>
              <Button
                variant="primary"
                type="submit"
                size="md"
                className="btn-novo-log"
                block
                disabled={enviandoPedidoLog}
              >
                Enviar Mensagem
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Card.Footer>
    </Card>
  );
};
