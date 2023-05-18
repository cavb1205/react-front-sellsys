import React, { useContext, useEffect } from "react";
import { TiendaContext } from "../../context/TiendaContext";

import { UtilidadesContext } from "../../context/UtilidadesContext";
import { createUtcDateIso } from "../../hooks/useDate";
import AlertLoading from "../Utils/AlertLoading";

const UtilidadesCreate = () => {
  const {
    newUtilidad,
    aportantes,
    handleChange,
    utilidadCreateItem,
    getAportantes,
    setNewUtilidad,
    loading,
  } = useContext(UtilidadesContext);

  const { selectedStore } = useContext(TiendaContext);

  useEffect(() => {
    getAportantes(selectedStore);
    setNewUtilidad({
      fecha: createUtcDateIso(),
      comentario: "",
      valor: "",
      trabajador: "",
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    utilidadCreateItem(selectedStore);
  };

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="card-header text-secondary text-center">
            Crear Utilidad
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="mb-3">
                <label>Fecha</label>
                <input
                  onChange={handleChange}
                  value={newUtilidad.fecha}
                  name="fecha"
                  type="date"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Valor</label>
                <input
                  onChange={handleChange}
                  value={newUtilidad.valor}
                  name="valor"
                  type="number"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Comentario</label>
                <input
                  onChange={handleChange}
                  value={newUtilidad.comentario}
                  name="comentario"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>Socio</label>
                <select
                  type="select"
                  onChange={handleChange}
                  value={newUtilidad.trabajador}
                  name="trabajador"
                  className="form-select"
                  required
                >
                  <option />
                  {aportantes.length > 0 ?(
                    aportantes.map((aportante) => (
                      <option key={aportante.id} value={aportante.id}>
                        {aportante.trabajador}
                      </option>
                    ))
                  ):(
                    <option>No se ha creado trabajadores</option>
                  )
                  }                  
                </select>
              </div>
              <div className="card-footer text-center">
                <button type="submit" className="btn btn-success btn-lg">
                  Crear
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UtilidadesCreate;
