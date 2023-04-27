import React, { useContext, useEffect } from "react";

import AlertMessage from "../components/Utils/AlertMessage";
import AlertLoading from "../components/Utils/AlertLoading";
import VentasListHeader from "../components/Ventas/VentasListHeader";
import { VentasContext } from "../context/VentasContext";

import { useFilters } from "../hooks/useFilters";
import Paginator from "../components/Utils/Paginator";
import VentasListItem from "../components/Ventas/VentasListItem";
import { TiendaContext } from "../context/TiendaContext";
import { Link } from "react-router-dom";
import AlertWaitPayment from "../components/Utils/AlertWaitPayment";

const VentasListPage = () => {
  const { ventasActivas, getVentasActivas, loading } =
    useContext(VentasContext);
  const {selectedStore, tienda} = useContext(TiendaContext)
  const { listFilter, prevPage, nextPage } = useFilters();

  useEffect(() => {
    getVentasActivas(selectedStore);
  }, []);

  return (
    <div className="container-sm ">
      {tienda.estado == 'Pendiente Pago' && <AlertWaitPayment/>}
      {loading ? (
        <AlertLoading />
      ) : (
        <>
          <VentasListHeader titulo="Ventas Activas" ventas={ventasActivas} />
          <div className="my-2">
            <Link to={'/ventas/create/'} className="btn btn-success">
              Crear Venta
            </Link>
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
        </>
      )}
    </div>
  );
};

export default VentasListPage;
