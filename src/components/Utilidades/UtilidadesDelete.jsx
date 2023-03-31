import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TiendaContext } from "../../context/TiendaContext";
import { UtilidadesContext } from "../../context/UtilidadesContext";
import AlertLoading from "../Utils/AlertLoading";

const UtilidadesDelete = () => {
  const {
    utilidad,
    utilidadDeleteItem,
    loading,
  } = useContext(UtilidadesContext);
  const {selectedStore}=useContext(TiendaContext)
  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="card-header text-secondary text-center">
            Eliminar Utiliidad De {utilidad.valor}
          </h3>
          <div className="card-body text-center">
            Esta seguro que desea eliminar la utilidad de{" "}
            <strong className="text-secondary text-capitalize">
              {utilidad.trabajador?.trabajador}
            </strong>{" "}
            ?
          </div>
          <div className="card-footer text-center d-flex justify-content-evenly">
            <button onClick={()=>utilidadDeleteItem(selectedStore)} className="btn btn-danger">
              Eliminar
            </button>
            <Link to={'/utilidades/'} className="btn btn-secondary">
              Cancelar
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UtilidadesDelete;
