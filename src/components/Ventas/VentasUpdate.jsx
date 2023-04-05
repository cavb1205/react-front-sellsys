import React, { useContext } from "react";
import { TiendaContext } from "../../context/TiendaContext";
import { VentasContext } from "../../context/VentasContext";
import AlertLoading from "../Utils/AlertLoading";

const VentasUpdate = () => {
  const { ventaDetail, ventaUpdateItem, handleChangeUpdate, loading } =
    useContext(VentasContext);

  const { selectedStore } = useContext(TiendaContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    ventaUpdateItem(selectedStore);
  };

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="card-header text-center text-secondary">
            Editando Venta {ventaDetail.id}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="mb-3">
                <label>Fecha Venta</label>
                <input
                  onChange={handleChangeUpdate}
                  value={ventaDetail.fecha_venta}
                  name="fecha_venta"
                  type="date"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Valor</label>
                <input
                  onChange={handleChangeUpdate}
                  value={ventaDetail.valor_venta}
                  name="valor_venta"
                  type="number"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Interés %</label>
                <input
                  onChange={handleChangeUpdate}
                  value={ventaDetail.interes}
                  name="interes"
                  type="number"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Cuotas</label>
                <input
                  onChange={handleChangeUpdate}
                  value={ventaDetail.cuotas}
                  name="cuotas"
                  type="number"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Comentario</label>
                <input
                  onChange={handleChangeUpdate}
                  value={ventaDetail.comentario}
                  name="comentario"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>Cliente</label>
                <input
                  onChange={handleChangeUpdate}
                  value={
                    ventaDetail.cliente?.nombres +
                    " " +
                    ventaDetail.cliente?.apellidos
                  }
                  name="cliente"
                  type="text"
                  className="form-control"
                  disabled
                />
              </div>
            </div>
            <div className="card-footer text-center">
              <button type="submit" className="btn btn-warning">
                Actualizar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default VentasUpdate;
