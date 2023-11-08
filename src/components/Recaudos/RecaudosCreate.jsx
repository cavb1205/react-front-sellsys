import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { RecaudosContext } from "../../context/RecaudosContext";
import { TiendaContext } from "../../context/TiendaContext";
import AlertLoading from "../Utils/AlertLoading";
import { AuthContext } from "../../context/AuthContext";

const RecaudosCreate = () => {
  const { venta, newRecaudo, handleChange, recaudosCreateItem, loading } =
    useContext(RecaudosContext);

  const {user} = useContext(AuthContext)

  const { selectedStore } = useContext(TiendaContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    recaudosCreateItem(selectedStore);
  };

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <form onSubmit={handleSubmit}>
            <h3 className="card-header text-center text-secondary">
              Agregar Abono a {venta.cliente?.nombres}{" "}
              {venta.cliente?.apellidos}
            </h3>
            <div className="card-body">
              <div className="mb-3">
                <label>Fecha Abono:</label>
                {user.is_staff?
                
                <input
                  onChange={handleChange}
                  type="date"
                  name="fecha_recaudo"
                  value={newRecaudo.fecha_recaudo}
                  className="form-control"
                  required
                />
                :
                <input
                  onChange={handleChange}
                  type="date"
                  name="fecha_recaudo"
                  value={newRecaudo.fecha_recaudo}
                  className="form-control"
                  required
                  disabled
                />
              }
              </div>
              <div className="mb-3">
                <label>Valor:</label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="valor_recaudo"
                  value={newRecaudo.valor_recaudo}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="card-footer d-flex justify-content-evenly">
              <Link to={"/liquidar/"} className="btn btn-secondary">
                Cancelar
              </Link>
              <button type="submit" className="btn btn-success">
                Confirmar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RecaudosCreate;
