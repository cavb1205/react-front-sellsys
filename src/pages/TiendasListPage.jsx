import React, { useContext, useEffect } from "react";
import { TiendaContext } from "../context/TiendaContext";
import AlertLoading from "../components/Utils/AlertLoading";
import AlertMessage from "../components/Utils/AlertMessage";
import { useFilters } from "../hooks/useFilters";

const TiendasListPage = () => {
  const {
    tiendas,
    getAllTiendas,
    loading,
    activateSuscriptionMounth,
    activateSuscriptionYear,
  } = useContext(TiendaContext);
  const { nextPage, prevPage, listFilter } = useFilters();

  useEffect(() => {
    getAllTiendas();
  }, []);

  const tiendasVencidas = () => {
    return tiendas.filter((tienda) => tienda.estado == "Vencida").length;
  };

  const tiendasPendientesPago = () => {
    return tiendas.filter((tienda) => tienda.estado == "Pendiente Pago").length;
  };

  const tiendasActivas = () => {
    return tiendas.filter((tienda) => tienda.estado == "Activa").length;
  };

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <>
          <h2 className="text-secondary text-center">Administrador de Rutas</h2>
          <div className="text-center">
            <span className="badge rounded-pill text-bg-secondary">
              Total Rutas: {tiendas.length}
            </span>
          </div>
          <div className="d-flex justify-content-around m-4">
            <span className="badge rounded-pill text-bg-success">
              Activas: {tiendasActivas()}
            </span>
            <span className="badge rounded-pill text-bg-warning">
              Pendientes Pago: {tiendasPendientesPago()}
            </span>
            <span className="badge rounded-pill text-bg-danger">
              Vencidas: {tiendasVencidas()}
            </span>
          </div>

          {tiendas.message ? (
            <AlertMessage message={"No se han creado tiendas"} />
          ) : (
            <>
              {listFilter(tiendas, "tiendas").map((tienda) => (
                <div
                  key={tienda.id}
                  className="card shadow-lg p-3 mb-3 bg-body rounded"
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-center">
                      <h3 className="text-secondary">
                        {tienda.tienda?.nombre}
                      </h3>
                    </div>
                    <div className="text-center">
                      <span
                        className={`badge rounded-pill text-bg-${
                          tienda.estado == "Activa"
                            ? "success"
                            : tienda.estado == "Pendiente Pago"
                            ? "warning"
                            : "danger"
                        }`}
                      >
                        Estado:{tienda.estado}
                      </span>
                    </div>
                    <div className="text-center m-2">
                      <h5 className="text-secondary">
                        Plan {tienda.membresia.nombre}
                      </h5>
                      <span className={`badge rounded-pill text-bg-light`}>
                        Fecha Activación: {tienda.fecha_activacion}
                      </span>
                      <span className={`badge rounded-pill text-bg-light`}>
                        Fecha Vencimiento: {tienda.fecha_vencimiento}
                      </span>
                    </div>

                    <div className="d-flex justify-content-evenly">
                      <button
                        onClick={() => activateSuscriptionMounth(tienda.id)}
                        className="btn btn-outline-success "
                      >
                        Mensual
                      </button>
                      <button
                        onClick={() => activateSuscriptionYear(tienda.id)}
                        className="btn btn-outline-success"
                      >
                        Anual
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-around m-4">
                <button
                  onClick={prevPage}
                  className="btn btn-outline-secondary btn-sm"
                >
                  Atras
                </button>
                <button
                  onClick={nextPage}
                  className="btn btn-outline-secondary btn-sm"
                >
                  Siguiente
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TiendasListPage;
