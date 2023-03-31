import React, { useContext } from "react";
import { TiendaContext } from "../../context/TiendaContext";

import { UtilidadesContext } from "../../context/UtilidadesContext";
import AlertLoading from "../Utils/AlertLoading";

const UtilidadesUpdate = () => {
  const { utilidad, handleChangeUpdate, utilidadUpdateItem, loading } =
    useContext(UtilidadesContext);

  const {selectedStore} = useContext(TiendaContext)

  const handleSubmit = (event) => {
    event.preventDefault();
    utilidadUpdateItem(selectedStore);
  };

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="card-header text-secondary text-center">
            Actualizar Utilidad
          </h3>
          <div className="my-3">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Fecha</label>
                <input
                  onChange={handleChangeUpdate}
                  value={utilidad.fecha}
                  name="fecha"
                  type="date"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Valor</label>
                <input
                  onChange={handleChangeUpdate}
                  value={utilidad.valor}
                  name="valor"
                  type="number"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Comentario</label>
                <input
                  onChange={handleChangeUpdate}
                  value={utilidad.comentario}
                  name="comentario"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>Socio</label>
                <input
                  type="text"
                  value={utilidad.trabajador?.trabajador}
                  onChange={handleChangeUpdate}
                  name="trabajador"
                  className="form-control"
                  disabled
                />
              </div>
              <div className="card-footer text-center">
                <button type="submit" className="btn btn-success btn-lg">
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

export default UtilidadesUpdate;
