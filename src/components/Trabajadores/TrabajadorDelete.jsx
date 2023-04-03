import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TiendaContext } from "../../context/TiendaContext";
import { TrabajadoresContext } from "../../context/TrabajadoresContext";

const TrabajadorDelete = () => {
  const { trabajador, trabajadorDeleteItem } = useContext(TrabajadoresContext);
  const { selectedStore }= useContext(TiendaContext)

  return (
    <div className="container-sm">
      <div className="card shadow-lg p-3 mb-5 bg-body rounded">
        <h3 className="card-header text-secondary text-center">
          Eliminar Trabajador {trabajador.id}
        </h3>
        <div className="card-body text-center">
          Esta seguro que desea eliminar el trabajador{" "}
          <strong className="text-capitalize">
            {trabajador.first_name} {trabajador.last_name}
          </strong>
          ?
        </div>
        <div className="card-footer d-flex justify-content-evenly">
          <button onClick={()=>trabajadorDeleteItem(selectedStore)} className="btn btn-danger">
            Confirmar
          </button>
          <Link to={'/trabajadores/'} className="btn btn-secondary">Cancelar</Link>
        </div>
      </div>
    </div>
  );
};

export default TrabajadorDelete;
