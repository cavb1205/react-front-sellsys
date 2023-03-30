import React, { useContext } from "react";
import { AportesContext } from "../../context/AportesContext";
import { TiendaContext } from "../../context/TiendaContext";
import AlertLoading from "../Utils/AlertLoading";

const AportesUpdate = () => {
  const { handleChangeUpdate, aporteId, aporteUpdateItem, loading } =
    useContext(AportesContext);

  const { selectedStore } = useContext(TiendaContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    aporteUpdateItem(selectedStore);
  };
  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="card-header text-secondary text-center">
            Actualizar Aporte
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="mb-3">
                <label>
                  Fecha <span className="text-danger">*</span>
                </label>
                <input
                  onChange={handleChangeUpdate}
                  value={aporteId.fecha}
                  name="fecha"
                  type="date"
                  className="form-control"
                  id="floatingInput"
                  placeholder="fecha"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="floatingInput">
                  Valor <span className="text-danger">*</span>
                </label>
                <input
                  onChange={handleChangeUpdate}
                  value={aporteId.valor}
                  name="valor"
                  type="number"
                  className="form-control"
                  id="floatingInput"
                  placeholder="valor"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="floatingInput">Comentario</label>
                <input
                  onChange={handleChangeUpdate}
                  value={aporteId.comentario}
                  name="comentario"
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder=""
                />
              </div>
              <div className="mb-3">
                <label htmlFor="floatingInput">
                  Aportante <span className="text-danger">*</span>
                </label>
                <input
                  onChange={handleChangeUpdate}
                  value={aporteId.trabajador?.trabajador}
                  name="trabajador"
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  disabled
                ></input>
              </div>
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

export default AportesUpdate;
