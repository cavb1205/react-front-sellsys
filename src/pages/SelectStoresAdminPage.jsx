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
    <div className="text-center">
      <h2 className="text-secondary mb-2">Seleccione Ruta a Supervisar</h2>
      <SelectStore />
      <Link className="btn btn-success mt-4" to="/">
        Ver Ruta
      </Link>
      <div className="m-4">
        <Link className="btn btn-outline-success" to="/tiendas/create/">
            Crear Ruta
        </Link>
      </div>
    </div>
  );
};

export default SelectStoresAdminPage;
