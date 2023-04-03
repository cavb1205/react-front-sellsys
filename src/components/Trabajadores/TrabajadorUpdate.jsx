import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TrabajadoresContext } from "../../context/TrabajadoresContext";
import AlertLoading from "../Utils/AlertLoading";

const TrabajadorUpdate = () => {
  const { trabajador, handleChangeUpdate, trabajadorUpdateItem, loading } =
    useContext(TrabajadoresContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    trabajadorUpdateItem();
  };

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="card-header text-secondary text-center">
            Editar Trabajador
          </h3>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Nombre de Usuario</label>
                <input
                  onChange={handleChangeUpdate}
                  value={trabajador.username}
                  name="username"
                  type="text"
                  className="form-control"
                  disabled
                />
              </div>
              <div className="mb-3">
                <label># Identificación</label>
                <input
                  onChange={handleChangeUpdate}
                  value={trabajador.identificacion}
                  name="identificacion"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Nombres</label>
                <input
                  onChange={handleChangeUpdate}
                  value={trabajador.first_name}
                  name="first_name"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Apellidos</label>
                <input
                  onChange={handleChangeUpdate}
                  value={trabajador.last_name}
                  name="last_name"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Teléfono</label>
                <input
                  onChange={handleChangeUpdate}
                  value={trabajador.telefono}
                  name="telefono"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Dirección</label>
                <input
                  onChange={handleChangeUpdate}
                  value={trabajador.direccion}
                  name="direccion"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Estado Activo</label>
                <input
                  onChange={handleChangeUpdate}
                  value
                  checked={!!trabajador.is_active}
                  name="is_active"
                  type="checkbox"
                  className="form-check-input mx-3"
                />
              </div>
              <div className="mb-3">
                <label>Supervisor</label>
                <input
                  onChange={handleChangeUpdate}
                  value
                  checked={!!trabajador.is_staff}
                  name="is_staff"
                  type="checkbox"
                  className="form-check-input mx-3"
                />
              </div>
              <div className="card-footer d-flex justify-content-evenly">
                <button type="submit" className="btn btn-success">
                  Actualizar
                </button>
                <Link to={`/trabajadores/${trabajador.id}/`} className="btn btn-secondary">Cancelar</Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrabajadorUpdate;
