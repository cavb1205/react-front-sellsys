import React, { useContext, useEffect } from "react";

import { AuthContext } from "../../context/AuthContext";
import { ClientesContext } from "../../context/ClientesContext";
import { TiendaContext } from "../../context/TiendaContext";
import { VentasContext } from "../../context/VentasContext";
import { createUtcDateIso } from "../../hooks/useDate";

import AlertError from "../Utils/AlertError";
import AlertLoading from "../Utils/AlertLoading";

const VentasCreate = () => {
  const { query, user } = useContext(AuthContext);

  const { error, newVenta, setNewVenta, handleChange, ventasCreateItem, loading } =
    useContext(VentasContext);
  const { selectedStore } = useContext(TiendaContext);
  const { getClientesActivos, clientesActivos } = useContext(ClientesContext);

  useEffect(() => {
    setNewVenta({
      fecha_venta: createUtcDateIso(),
      valor_venta: "",
      interes: 20,
      cuotas: 20,
      comentario: "",
      cliente: "",
      fecha_vencimiento: "",
      saldo_actual: "",
    })
    getClientesActivos(selectedStore);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    ventasCreateItem(selectedStore);
  };

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <form onSubmit={handleSubmit}>
            <h3 className="card-header text-center text-secondary">
              Crear Venta
              {error && <AlertError error={error} />}
            </h3>
            <div className="card-body">
              <div className="mb-3">
                <label>Fecha Venta</label>
                <input
                  onChange={handleChange}
                  value={newVenta.fecha_venta}
                  name="fecha_venta"
                  type="date"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Valor</label>
                <input
                  onChange={handleChange}
                  value={newVenta.valor_venta}
                  name="valor_venta"
                  type="number"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Interés %</label>
                {user.is_staff ? (

                <input
                  onChange={handleChange}
                  value={newVenta.interes}
                  name="interes"
                  type="number"
                  className="form-control"
                  required
                  
                />
                ) : (
                  <input
                  onChange={handleChange}
                  value={newVenta.interes}
                  name="interes" 
                  type="number"
                  className="form-control"
                  required
                  disabled
                />
                )}
              </div>
              <div className="mb-3">
                <label>Cuotas</label>
                <input
                  onChange={handleChange}
                  value={newVenta.cuotas}
                  name="cuotas"
                  type="number"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Comentario</label>
                <input
                  onChange={handleChange}
                  value={newVenta.comentario}
                  name="comentario"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>Cliente</label>
                <select
                  type="select"
                  onChange={handleChange}
                  value={newVenta.cliente}
                  name="cliente"
                  className="form-select"
                  placeholder="Seleccione"
                  required
                >
                  <option value="">Seleccione</option>
                  {clientesActivos.message ? (
                    <option>No se han creado clientes</option>
                  ) : (
                    clientesActivos
                      .filter((cliente) =>
                        cliente.nombres.toLowerCase().includes(query)
                      )
                      .map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                          {cliente.nombres} {cliente.apellidos}
                        </option>
                      ))
                  )}
                </select>
              </div>
            </div>
            <div className="card-footer text-center">
              <button type="submit" className="btn btn-success">
                Crear Venta
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default VentasCreate;
