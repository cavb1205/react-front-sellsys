import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const InformeRecaudosListItem = ({recaudo}) => {
  return (
    <Card className="mb-3 shadow rounder">
      <Link className="text-decoration-none" to={`/recaudos/${recaudo.id}/`}>
        <CardBody>
          <div className="text-center">
            <h2 className="text-capitalize text-secondary">
              {recaudo.venta?.cliente.nombres}{" "}
              {recaudo.venta?.cliente.apellidos}
            </h2>
          </div>
          <div className="d-flex flex-wrap justify-content-around mb-2">
            <span className="badge bg-secondary">
              Fecha: {recaudo.fecha_recaudo}{" "}
            </span>
            <span className="badge bg-success">
              Valor: {recaudo.valor_recaudo}
            </span>
          </div>
          {recaudo.visita_blanco ? (
            <div className=" text-center mt-2">
              <p className="badge bg-light text-secondary">
                Falla: {recaudo.visita_blanco?.tipo_falla}
              </p>{" "}
              <br />
            </div>
          ) : null}
        </CardBody>
      </Link>
    </Card>
  );
};

export default InformeRecaudosListItem;
