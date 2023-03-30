import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AportesContext } from "../../context/AportesContext";
import { TiendaContext } from "../../context/TiendaContext";
import AlertLoading from "../Utils/AlertLoading";

const AportesDelete = () => {
  const { aporteId, aporteDeleteItem, loading } = useContext(AportesContext);
  const { selectedStore } = useContext(TiendaContext);

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="card-header text-secondary text-center">
            Eliminar Aporte por {aporteId.valor}
          </h3>
          <div className="card-body">
            Esta seguro que desea eliminar el aporte de{" "}
            <strong className="text-secondary">
              {aporteId.trabajador?.trabajador}
            </strong>{" "}
            ?
          </div>
          <div className="card-footer text-center d-flex justify-content-evenly">
            <button
              onClick={() => aporteDeleteItem(selectedStore)}
              className="btn btn-danger"
            >
              Eliminar
            </button>
            <Link to={"/aportes/"} className="btn btn-secondary">
              Cancelar
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AportesDelete;
