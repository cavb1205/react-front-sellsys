import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { VentasContext } from "../../context/VentasContext";

import AlertLoading from "../Utils/AlertLoading";

const VentasPerdida = () => {
  const { ventaPerdida, loading, ventaDetail } =
    useContext(VentasContext);

  const valorPerdida = ventaDetail.saldo_actual;

  

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="alert alert-danger text-center">
            Pérdida Venta por {valorPerdida}
          </h3>
          <div className="card-body text-center">
            Esta seguro que desea enviar la venta de{" "}
            <span className="text-primary">
              {ventaDetail.cliente?.nombres} {ventaDetail.cliente?.apellidos}
            </span>{" "}
            como pérdida?
            <p>
              El valor de la pérdida es de{" "}
              <span className="badge bg-danger">{valorPerdida}</span>
            </p>
          </div>
          <div className="card-footer d-flex justify-content-evenly">
            <button className="btn btn-danger" onClick={ventaPerdida}>
              Confirmar
            </button>
            <Link to={`/ventas/${ventaDetail.id}/`} className='btn btn-secondary'>Cancelar</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default VentasPerdida;
