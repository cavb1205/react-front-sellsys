import React, { useContext, useEffect } from "react";

import AlertMessage from "../components/Utils/AlertMessage";
import AlertLoading from "../components/Utils/AlertLoading";
import VentasListHeader from "../components/Ventas/VentasListHeader";
import VentasModalCreate from "../components/Ventas/VentasModalCreate";
import { VentasContext } from "../context/VentasContext";

import { useFilters } from "../hooks/useFilters";
import Paginator from "../components/Utils/Paginator";
import VentasListItem from "../components/Ventas/VentasListItem";

const VentasListPage = () => {
  const { ventasActivas, getVentasActivas, openModalCreateVenta, loading } =
    useContext(VentasContext);

  const { listFilter, prevPage, nextPage } = useFilters();

  useEffect(() => {
    getVentasActivas();
  }, []);

  return (
    <div className="container-sm ">
      {loading ? (
        <AlertLoading />
      ) : (
        <>
          <VentasListHeader titulo="Ventas Activas" ventas={ventasActivas} />
          <div className="my-2">
            <button onClick={openModalCreateVenta} className="btn btn-success">
              Crear Venta
            </button>
          </div>
          {ventasActivas.message ? (
            <AlertMessage message="No hay ventas activas para mostrar" />
          ) : (
            <>
              {listFilter(ventasActivas, "ventas").map((venta) => (
                <VentasListItem key={venta.id} venta={venta} />
              ))}
              {listFilter(ventasActivas, "ventas").length === 0 ? (
                <AlertMessage message="No se encontraron ventas en la búsqueda" />
              ) : null}
              <Paginator nextPage={nextPage} prevPage={prevPage} />
            </>
          )}

          <VentasModalCreate />
        </>
      )}
    </div>
  );
};

export default VentasListPage;
