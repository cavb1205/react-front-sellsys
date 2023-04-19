import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { RecaudosContext } from "../../context/RecaudosContext";
import { TiendaContext } from "../../context/TiendaContext";
import AlertLoading from "../Utils/AlertLoading";

const RecaudosNoPago = () => {
  const { venta, handleChangeNoPago, recaudosCreateNoPago, loading } =
    useContext(RecaudosContext);
  const {selectedStore} = useContext(TiendaContext)

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ):(
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="card-header text-center text-secondary">
            Reportar No Pago a {venta.cliente?.nombres} {venta.cliente?.apellidos}
          </h3>
          <div className="card-body">
            <div className="mb-3">
              <label>Tipo de Falla</label>
              <select
                onChange={handleChangeNoPago}
                type="select"
                name="tipo_falla"
                className="form-select"
              >
                <option value="Casa o Local Cerrado">Casa o Local Cerrado</option>
                <option value="Cliente no Tiene Dinero">
                  Cliente no Tiene Dinero
                </option>
                <option value="Cliente de Viaje">Cliente de Viaje</option>
                <option value="Cliente no Aparece">Cliente no Aparece</option>
                <option value="Cliente Enfermo">Cliente Enfermo</option>
                <option value="Otro Motivo">Otro Motivo</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Comentario</label>
              <input
                onChange={handleChangeNoPago}
                type="textarea"
                name="comentario"
                className="form-control"
              />
            </div>
          </div>
          <div className="card-footer d-flex justify-content-evenly">
            <Link to={"/liquidar/"} className="btn btn-secondary">
              Cancelar
            </Link>
            <button onClick={()=>recaudosCreateNoPago(selectedStore)} className="btn btn-success">
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecaudosNoPago;
