import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { GastosContext } from "../../context/GastosContext";
import { TiendaContext } from "../../context/TiendaContext";
import AlertLoading from "../Utils/AlertLoading";

const GastosDelete = () => {
  const { gasto, gastoDeleteItem, loading } =
    useContext(GastosContext);
  const {selectedStore} = useContext(TiendaContext)

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="card-header text-secondary text-center">
            Eliminar Gasto por {gasto.valor}
          </h3>
          <div className="card-body text-center">
            Esta seguro que desea eliminar el gasto de{" "}
            <strong className="text-secondary">
              {gasto.tipo_gasto?.tipo_gasto}
            </strong>{" "}
            ?
          </div>
          <div className="card-footer text-center d-flex justify-content-evenly">
            <button
              onClick={() => gastoDeleteItem(selectedStore)}
              className="btn btn-danger"
            >
              Eliminar
            </button>
            <Link to={"/gastos/"} className="btn btn-secondary">
              Cancelar
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default GastosDelete;
