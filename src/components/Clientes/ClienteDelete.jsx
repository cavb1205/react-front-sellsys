import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ClientesContext } from "../../context/ClientesContext";
import { TiendaContext } from "../../context/TiendaContext";
import AlertError from "../Utils/AlertError";
import AlertLoading from "../Utils/AlertLoading";

const ClienteDelete = () => {
  const {
    cliente,
    clienteDeleteItem,
    error,
    loading,
  } = useContext(ClientesContext);

  const {selectedStore}=useContext(TiendaContext)

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ):( 
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="card-header text-center text-secondary">
            Eliminar Cliente
            {error ? <AlertError error={error} /> : null}
          </h3>
          <div className="card-body text-center">
            Esta seguro que desea eliminar el cliente{" "}
            <strong className="text-secondary">
              {cliente.nombres} {cliente.apellidos}{" "}
            </strong>
            ?
          </div>
          <div className="card-footer d-flex justify-content-evenly">
            <button onClick={()=>clienteDeleteItem(selectedStore)} className='btn btn-danger'>
              Eliminar
            </button>
            <Link to={`/clientes/${cliente.id}/`} className='btn btn-secondary'>
              Cancelar
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClienteDelete;
