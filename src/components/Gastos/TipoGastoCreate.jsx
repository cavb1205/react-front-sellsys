import React, { useContext } from "react";
import { GastosContext } from "../../context/GastosContext";
import AlertLoading from "../Utils/AlertLoading";

const TipoGastoCreate = () => {
  const { loading, setNewTipoGasto, newTipoGasto, tipoGastoCreate } =
    useContext(GastosContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    tipoGastoCreate();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTipoGasto({
      ...newTipoGasto,
      [name]: value,
    });
  };

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="card-header text-secondary text-center">
            Crear Tipo de Gasto
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="my-3 text-center">
              <label>Tipo de Gasto</label>
              <input
                onChange={handleChange}
                value={newTipoGasto?.tipoGasto}
                name="tipo_gasto"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="card-footer text-center">
              <button type="submit" className="btn btn-success btn-lg">
                Crear
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TipoGastoCreate;
