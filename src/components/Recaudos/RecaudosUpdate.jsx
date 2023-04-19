import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { RecaudosContext } from "../../context/RecaudosContext";
import { TiendaContext } from "../../context/TiendaContext";
import AlertLoading from "../Utils/AlertLoading";

const RecaudosUpdate = () => {
  const {    
    recaudo,
    handleChangeUpdate,
    recaudoUpdateItem,
    loading,
  } = useContext(RecaudosContext);
  const {selectedStore} = useContext(TiendaContext)

  const handleSubmit = (event) => {
    event.preventDefault();
    recaudoUpdateItem(recaudo.id, selectedStore);
  };

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ):(
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="card-header text-center text-secondary">
            Editando Recaudo
          </h3>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Fecha Recaudo:</label>
                <input
                  className="form-control"
                  onChange={handleChangeUpdate}
                  type="date"
                  name="fecha_recaudo"
                  value={recaudo.fecha_recaudo}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Valor:</label>
                <input
                  className="form-control"
                  onChange={handleChangeUpdate}
                  type="number"
                  name="valor_recaudo"
                  value={recaudo.valor_recaudo}
                  required
                />
              </div>
              <div className="card-footer d-flex justify-content-evenly">
                <Link to={`/recaudos/${recaudo.id}/`} className="btn btn-secondary">Cancelar</Link>
                <button type="submit" className="btn btn-warning" >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecaudosUpdate;
