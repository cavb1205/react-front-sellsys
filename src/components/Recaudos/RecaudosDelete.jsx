import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RecaudosContext } from "../../context/RecaudosContext";
import AlertLoading from "../Utils/AlertLoading";

const RecaudosDelete = () => {
  const { recaudoDeleteItem, recaudo, loading } = useContext(RecaudosContext);
  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ):(
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="card-header text-center text-secondary">
            Eliminar Recaudo
          </h3>
          <div className="card-body text-center">
            Esta seguro que desea eliminar el recaudo de{" "}
            <strong>{recaudo.valor_recaudo}</strong> ?
          </div>
          <div className="card-footer d-flex justify-content-evenly">
            <button
              onClick={() => recaudoDeleteItem(recaudo.id, recaudo.venta?.id)}
              className="btn btn-danger"
            >
              Eliminar
            </button>
            <Link to={`/recaudos/${recaudo.id}/`} className="btn btn-secondary">Cancelar</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecaudosDelete;
