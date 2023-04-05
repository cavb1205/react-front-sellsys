import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ClientesContext } from "../../context/ClientesContext";
import { TiendaContext } from "../../context/TiendaContext";
import AlertLoading from "../Utils/AlertLoading";
import AlertMessage from "../Utils/AlertMessage";
import VentasClienteResume from "../Ventas/VentasClienteResume";
import VentasClientHistoryList from "../Ventas/VentasClientHistoryList";

const ClienteDetailItem = () => {
  const {
    cliente,
    getCliente,
    getVentasActivasCliente,
    ventasActivas,
    loading,
  } = useContext(ClientesContext);

  const {selectedStore} = useContext(TiendaContext)

  const { clienteId } = useParams();

  useEffect(() => {
    getCliente(clienteId);
    getVentasActivasCliente(clienteId,selectedStore);
  }, []);

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (

      <div className="card shadow-lg p-3 mb-5 bg-body rounded">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-bs-toggle="tab"
                data-bs-target="#info"
                aria-current="true"
              >
                Info Cliente
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#ventasActivas"
              >
                Historial Ventas
              </a>
            </li>
          </ul>
        </div>

        <div className="tab-content" id="myTabContent">
          {/* SECCION INFORMACION PERSONAL DEL CLIENTE */}

          <div className="card-body tab-pane fade show active" id="info">
            <div>
              <div className="row justify-content-around my-2">
                <div className="col-5">
                  <strong>Identificación:</strong>
                </div>
                <div className="col-5">
                  <span>{cliente.identificacion}</span>
                </div>
              </div>
              <div className="row justify-content-around my-2">
                <div className="col-5">
                  <strong>Nombres:</strong>
                </div>
                <div className="col-5">
                  <span>
                    {cliente.nombres} {cliente.apellidos}
                  </span>
                </div>
              </div>
              <div className="row justify-content-around my-2">
                <div className="col-5">
                  <strong>Nombre Local:</strong>
                </div>
                <div className="col-5">
                  <span>{cliente.nombre_local}</span>
                </div>
              </div>
              <div className="row justify-content-around my-2">
                <div className="col-5">
                  <strong>Dirección:</strong>
                </div>
                <div className="col-5">
                  <span>{cliente.direccion}</span>
                </div>
              </div>
              <div className="row justify-content-around my-2">
                <div className="col-5">
                  <strong>Teléfono:</strong>
                </div>
                <div className="col-5">
                  <span>{cliente.telefono_principal}</span>
                </div>
              </div>
              <div className="row justify-content-around my-2">
                <div className="col-5">
                  <strong>Estado:</strong>
                </div>
                <div className="col-5">
                  <span
                    className={`badge rounded-pill text-bg-${
                      cliente.estado_cliente === "Bloqueado"
                        ? "danger"
                        : cliente.estado_cliente === "Inactivo"
                        ? "warning"
                        : "success"
                    }`}
                  >
                    {cliente.estado_cliente}
                  </span>
                </div>
              </div>
              <div className="row justify-content-around my-2">
                <div className="col-5">
                  <strong>Fecha Creación:</strong>
                </div>
                <div className="col-5">
                  <span>{cliente.fecha_creacion}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECCION HISTORIAL VENTAS DEL CLIENTE */}
          <div className="card-body tab-pane fade" id="ventasActivas">
            {ventasActivas.message ? (
              <AlertMessage message="No existen ventas activas" />
            ) : (
              <>
                <VentasClienteResume ventas={ventasActivas} />
                {ventasActivas.map((venta, index) => (
                  <VentasClientHistoryList
                    key={venta.id}
                    venta={venta}
                    index={index}
                  />
                ))}
              </>
            )}
          </div>
        </div>

        <div className="card-footer d-flex flex-wrap justify-content-around">
          <Link to="/clientes/">
            <button className="btn btn-primary mb-1">Lista Clientes</button>
          </Link>
          <Link to={'/clientes/update/'}            
            className="btn btn-warning mb-1"
          >
            Actualizar
          </Link>
          <Link to={'/clientes/delete/'}
            className="btn btn-danger mb-1"
          >
            Eliminar
          </Link>
        </div>
      </div>
      )}

      
      
    </div>
  );
};

export default ClienteDetailItem;
