import React, { useContext, useEffect } from "react";
import { TiendaContext } from "../../context/TiendaContext";
import { TrabajadoresContext } from "../../context/TrabajadoresContext";
import AlertLoading from "../Utils/AlertLoading";

const TrabajadorCreate = () => {
  const { trabajadorCreateItem, handleChange, loading, setNewTrabajador } =
    useContext(TrabajadoresContext);

  const { selectedStore } = useContext(TiendaContext);

  useEffect(() => {
    setNewTrabajador({
      username: "",
      first_name: "",
      last_name: "",
      password: "",
      identificacion: "",
      telefono: "",
      direccion: "",
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    trabajadorCreateItem(selectedStore);
  };

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="card-header text-secondary text-center">
            Crear Trabajador
          </h3>
          <div className="m-3">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Username</label>
                <input
                  onChange={handleChange}
                  name="username"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Nombres</label>
                <input
                  onChange={handleChange}
                  name="first_name"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Apellidos</label>
                <input
                  onChange={handleChange}
                  name="last_name"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Contraseña</label>
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label># Identificación</label>
                <input
                  onChange={handleChange}
                  name="identificacion"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Teléfono</label>
                <input
                  onChange={handleChange}
                  name="telefono"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Dirección</label>
                <input
                  onChange={handleChange}
                  name="direccion"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
              <div className="card-footer text-center">
                <button type="submit" className="btn btn-success">
                  Crear Trabajador
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrabajadorCreate;
