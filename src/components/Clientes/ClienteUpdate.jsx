import React, { useContext } from "react";
import { ClientesContext } from "../../context/ClientesContext";
import AlertLoading from "../Utils/AlertLoading";

const ClienteUpdate = () => {
  const { cliente, handleChangeUpdate, clienteUpdateItem, loading } =
    useContext(ClientesContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    clienteUpdateItem();
  };

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="card-header text-center text-secondary">
            Editar Cliente {cliente.nombres} {cliente.apellidos}
          </h3>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label># Identificación</label>
                <input
                  onChange={handleChangeUpdate}
                  value={cliente.identificacion}
                  name="identificacion"
                  type="text"
                  className="form-control"                                  
                  disabled
                />
              </div>
              <div className="mb-3">
                <label >Nombres</label>
                <input
                  onChange={handleChangeUpdate}
                  value={cliente.nombres}
                  name="nombres"
                  type="text"
                  className="form-control"                  
                  required
                />
              </div>
              <div className="mb-3">
                <label >Apellidos</label>
                <input
                  onChange={handleChangeUpdate}
                  value={cliente.apellidos}
                  name="apellidos"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label >Nombre Local</label>
                <input
                  onChange={handleChangeUpdate}
                  value={cliente.nombre_local}
                  name="nombre_local"
                  type="text"
                  className="form-control"                                
                  required
                />
              </div>
              <div className="mb-3">
                <label >Teléfono</label>
                <input
                  onChange={handleChangeUpdate}
                  value={cliente.telefono_principal}
                  name="telefono_principal"
                  type="text"
                  className="form-control"
                  id="floatinginput"
                  placeholder="Teléfono principal"
                  required
                />
              </div>
              <div className="mb-3">
                <label >Dirección</label>
                <input
                  onChange={handleChangeUpdate}
                  value={cliente.direccion}
                  name="direccion"
                  type="text"
                  className="form-control"
                  id="floatinginput"
                  placeholder="Dirección casa o local"
                  required
                />
              </div>
              <div className="mb-3">
                <label >Estado</label>
                <select
                  onChange={handleChangeUpdate}
                  value={cliente.estado_cliente}
                  name="estado_cliente"
                  type="select"
                  className="form-select"
                  id="floatinginput"
                  required
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                  <option value="Bloqueado">Bloqueado</option>
                </select>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-success">
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

export default ClienteUpdate;
