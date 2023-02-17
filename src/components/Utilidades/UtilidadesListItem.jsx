import React from "react";
import { Card, CardBody } from "reactstrap";

export const UtilidadesListItem = ({utilidad, index, Selected}) => {
  return (
    <Card key={utilidad.id} className="mb-3 shadow rounder">
      <CardBody>
        <div className="d-flex flex-wrap justify-content-between">
          <span># {index + 1}</span>
          <h2 className="text-capitalize text-secondary">
            {utilidad.trabajador?.trabajador}
          </h2>
          <span></span>
        </div>
        <div className="d-flex flex-wrap justify-content-around">
          <span className="badge bg-secondary">Fecha: {utilidad.fecha}</span>
          <span className="badge bg-success">Valor: {utilidad.valor}</span>
        </div>
        <div className="d-flex flex-wrap justify-content-around mt-2">
          <p className="badge bg-light text-secondary">
            Comentario: {utilidad.comentario}
          </p>
        </div>
        <div className="d-flex flex-wrap justify-content-around mt-1">
          <button
            onClick={() => Selected(utilidad, "Editar")}
            className="btn btn-warning"
          >
            Actualizar
          </button>
          <button
            onClick={() => Selected(utilidad, "Eliminar")}
            className="btn btn-danger"
          >
            ELiminar
          </button>
        </div>
      </CardBody>
    </Card>
  );
};
