import React from "react";
import { Card, CardBody } from "reactstrap";

const GastosListItem = ({ gasto, index, gastoSelected,user }) => {
  console.log(user)
  return (
    <Card className="mb-3 shadow rounder">
      <CardBody>
        <div className="d-flex flex-wrap justify-content-between">
          <span># {index + 1}</span>
          <h2 className="text-capitalize text-secondary">
            {gasto.tipo_gasto?.tipo_gasto}
          </h2>
          <span></span>
        </div>
        <div className="d-flex flex-wrap justify-content-around">
          <span className="badge bg-secondary">Fecha: {gasto.fecha}</span>
          <span className="badge bg-success">Valor: {gasto.valor}</span>
        </div>
        <div className="d-flex flex-wrap justify-content-around mt-2">
          <p className="badge bg-light text-secondary">
            Comentario: {gasto.comentario}
          </p>
        </div>
        {user.is_staff || user.is_superuser ?(

        <div className="d-flex flex-wrap justify-content-around mt-1">
          <button
            onClick={() => gastoSelected(gasto, "Editar")}
            className="btn btn-warning"
          >
            Actualizar
          </button>          
          <button
            onClick={() => gastoSelected(gasto, "Eliminar")}
            className="btn btn-danger"
          >
            ELiminar
          </button>
        </div>
        ):
        null
        }
      </CardBody>
    </Card>
  );
};

export default GastosListItem;
