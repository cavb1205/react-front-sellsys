import React, { useEffect, useContext } from "react";
import { TiendaContext } from "../context/TiendaContext";

import AlertMessage from "../components/Utils/AlertMessage";
import { useFilters } from "../hooks/useFilters";
import AlertLoading from "../components/Utils/AlertLoading";

const CierresCajaPage = () => {
  const { cierresCaja, getCierresCaja, selectedStore, deleteCierresCaja, loading } =
    useContext(TiendaContext);

  const { listFilter, prevPage, nextPage } = useFilters();

  useEffect(() => {
    getCierresCaja(selectedStore);
  }, []);

  return (
    <div className="container-sm">
      {loading? (
        <AlertLoading />
      ):(
      <>
      <div className="text-center m-3">
        <h2 className="text-secondary">Cierres de Caja</h2>
        <small># Cierres {cierresCaja.length}</small>
      </div>
      {cierresCaja.message ? (
        <AlertMessage message="No se encontraron registros" />
      ) : (
        <>
          {listFilter(cierresCaja, "cierres").map((item, index) => (
            <div
              key={item.id}
              className="card shadow-lg p-3 mb-3 bg-body rounded"
            >
              <div className="card-body">
                <div className="d-flex flex-wrap justify-content-between">
                  <small>{index + 1}</small>
                  <h2 className="text-secondary">Valor: {item.valor}</h2>
                  <small>{item.fecha_cierre}</small>
                </div>
                <div className="d-flex justify-content-center">
                  <button onClick={()=>deleteCierresCaja(item.id, selectedStore)} className="btn btn-danger btn-sm">
                    Eliminar Cierre
                  </button>
                </div>
              </div>
            </div>
          ))}

          {listFilter(cierresCaja, "cierres").length === 0 ? (
            <AlertMessage message="No se encontraron aportes en la búsqueda" />
          ) : null}
          <div className="d-flex justify-content-around mb-4">
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

export default CierresCajaPage;
