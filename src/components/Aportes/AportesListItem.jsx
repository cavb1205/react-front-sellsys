import React from "react";
import { Card, CardBody } from "reactstrap";

const AportesListItem = ({ aporte, aporteSeleccionado, index }) => {
  return (
    <Card key={aporte.id} className="mb-3 shadow rounder">
      <CardBody>
        <div className="d-flex flex-wrap justify-content-between">
          <span># {index + 1}</span>
          <h2 className="text-capitalize text-secondary">
            {aporte.trabajador?.trabajador}
          </h2>
          <span />
        </div>
        <div className="d-flex flex-wrap justify-content-around">
          <span className="badge bg-secondary">Fecha: {aporte.fecha}</span>
          <span className="badge bg-success">Valor: {aporte.valor}</span>
        </div>
        <div className="d-flex flex-wrap justify-content-around mt-2">
          <p className="badge bg-light text-secondary">
            Comentario: {aporte.comentario}
          </p>
        </div>
        <div className="d-flex flex-wrap justify-content-around mt-1">
          <button
            onClick={() => aporteSeleccionado(aporte, "Editar")}
            className="btn btn-warning"
          >
            Actualizar
          </button>
          <button
            onClick={() => aporteSeleccionado(aporte, "Eliminar")}
            className="btn btn-danger"
          >
            ELiminar
          </button>
        </div>
      </CardBody>
    </Card>
  );
};

export default AportesListItem;
