import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import SelectStore from "../components/Utils/SelectStore";
import { TiendaContext } from "../context/TiendaContext";

const SelectStoresAdminPage = () => {
  const { getStoresAdmin } = useContext(TiendaContext);
  useEffect(() => {
    getStoresAdmin();
  }, []);
  return (
    <div className="container-sm">      
      <div className="card shadow-lg p-3 mb-5 bg-body rounded">
        <h2 className=" card-header text-center text-secondary mb-2">Seleccione Ruta a Supervisar</h2> 
        <div className="card-body text-center">
          <SelectStore />
          <Link className="btn btn-success mt-4" to="/">
            Ver Ruta
          </Link>
        </div>
        <div className="card-footer m-4 text-center">
          <Link className="btn btn-outline-success" to="/tiendas/create/">
              Crear Ruta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectStoresAdminPage;
