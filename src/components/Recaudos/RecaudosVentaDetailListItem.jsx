import React from "react";
import { Link } from "react-router-dom";

const RecaudosVentaDetailListItem = ({ recaudo }) => {
  return (
    <Link
      key={recaudo.id}
      className="text-decoration-none"
      to={`/recaudos/${recaudo.id}/`}
    >
      <div className="card shadow-lg p-3 mb-3 bg-body rounded">
        <div className="card-body">
          <div className="d-flex flex-wrap justify-content-around">
            <small className="text-secondary">{recaudo.fecha_recaudo}</small>
            <h2 className="text-capitalize text-success">
              {recaudo.valor_recaudo}
            </h2>
            <button className="btn btn-outline-primary btn-sm">Ver</button>
          </div>
          {recaudo.visita_blanco ? (
            <div className=" text-center">
              <small className="badge bg-light text-secondary">
                {recaudo.visita_blanco?.tipo_falla}{" "}
              </small>{" "}
              <br />
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
};

export default RecaudosVentaDetailListItem;
