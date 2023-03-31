import React, { useContext } from "react";

import { GastosContext } from "../../context/GastosContext";
import { TiendaContext } from "../../context/TiendaContext";
import AlertLoading from "../Utils/AlertLoading";

const GastosUpdate = () => {
  const { gasto, gastoUpdateItem, handleChangeUpdate, loading } =
    useContext(GastosContext);

  const { selectedStore } = useContext(TiendaContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    gastoUpdateItem(selectedStore);
  };

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="card-header text-secondary text-center">
            Actualizar Gasto
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Fecha</label>
              <input
                onChange={handleChangeUpdate}
                value={gasto.fecha}
                name="fecha"
                type="date"
                className="form-control"
                id="floatinginput"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="floatinginput">Tipo de Gasto</label>
              <input
                onChange={handleChangeUpdate}
                name="tipo_gasto"
                value={gasto.tipo_gasto?.tipo_gasto}
                type="text"
                className="form-control"
                id="floatinginput"
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="floatinginput">Valor</label>
              <input
                onChange={handleChangeUpdate}
                value={gasto.valor}
                name="valor"
                type="number"
                className="form-control"
                id="floatinginput"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="floatinginput">Comentario</label>
              <input
                onChange={handleChangeUpdate}
                value={gasto.comentario}
                name="comentario"
                type="text"
                className="form-control"
                id="floatinginput"
              />
            </div>
            <div className="card-footer text-center">
              <button type="submit" className="btn btn-success btn-lg">
                Actualizar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default GastosUpdate;
