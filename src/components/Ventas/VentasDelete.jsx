import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TiendaContext } from "../../context/TiendaContext";

import { VentasContext } from "../../context/VentasContext";
import AlertLoading from "../Utils/AlertLoading";

const VentasDelete = () => {
  const { ventaDetail, ventaDeleteItem, loading } = useContext(VentasContext);
  const { selectedStore } = useContext(TiendaContext);
  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="card-header text-center text-secondary">
            Eliminar Venta
          </h3>
          <div className="card-body text-center">
            {ventaDetail.cliente ? (
              <span>
                Esta seguro que desea eliminar la venta de{" "}
                <strong className="text-secondary">
                  {ventaDetail.cliente.nombres} {ventaDetail.cliente.apellidos}
                </strong>
              </span>
            ) : null}
            <span>
              {" "}
              Con el valor de:{" "}
              <strong className="text-secondary">
                {ventaDetail.valor_venta}
              </strong>{" "}
              ?
            </span>
          </div>
          <div className="card-footer d-flex justify-content-evenly">
            <button
              onClick={() => ventaDeleteItem(selectedStore)}
              className="btn btn-danger"
            >
              Eliminar
            </button>
            <Link
              to={`/ventas/${ventaDetail.id}/`}
              className="btn btn-secondary"
            >
              Cancelar
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default VentasDelete;
