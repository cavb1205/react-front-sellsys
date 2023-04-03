import React, { useContext, useEffect } from "react";
import { ClientesContext } from "../../context/ClientesContext";
import { TiendaContext } from "../../context/TiendaContext";
import AlertError from "../Utils/AlertError";
import AlertLoading from "../Utils/AlertLoading";

const ClienteCreate = () => {
  const { handleChange, clienteCreateItem, error, loading, setNewCliente } =
    useContext(ClientesContext);

  const { selectedStore } = useContext(TiendaContext);

  useEffect(() => {
    setNewCliente({
      identificacion: "",
      nombres: "",
      apellidos: "",
      nombre_local: "",
      telefono_principal: "",
      telefono_opcional: "",
      direccion: "",
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    clienteCreateItem(selectedStore);
  };

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="card-header text-center">
            Crear Cliente
            {error ? <AlertError error={error} /> : null}
          </h3>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Identificación</label>
                <input
                  onChange={handleChange}
                  name="identificacion"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="floatinginput">Nombres</label>
                <input
                  onChange={handleChange}
                  name="nombres"
                  type="text"
                  className="form-control"
                  id="floatinginput"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="floatinginput">Apellidos</label>
                <input
                  onChange={handleChange}
                  name="apellidos"
                  type="text"
                  className="form-control"
                  id="floatinginput"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="floatinginput">Nombre Local</label>
                <input
                  onChange={handleChange}
                  name="nombre_local"
                  type="text"
                  className="form-control"
                  id="floatinginput"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="floatinginput">Teléfono</label>
                <input
                  onChange={handleChange}
                  name="telefono_principal"
                  type="text"
                  className="form-control"
                  id="floatinginput"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="floatinginput">Dirección</label>
                <input
                  onChange={handleChange}
                  name="direccion"
                  type="text"
                  className="form-control"
                  id="floatinginput"
                  required
                />
              </div>
              <div className="card-footer text-center">
                <button type="submit" className="btn btn-success">
                  Crear Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClienteCreate;
