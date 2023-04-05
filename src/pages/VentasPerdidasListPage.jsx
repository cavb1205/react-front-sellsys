import React, { useContext, useEffect } from "react";
import AlertLoading from "../components/Utils/AlertLoading";
import AlertMessage from "../components/Utils/AlertMessage";
import Paginator from "../components/Utils/Paginator";
import VentasListHeader from "../components/Ventas/VentasListHeader";
import VentasListItem from "../components/Ventas/VentasListItem";
import { TiendaContext } from "../context/TiendaContext";
import { VentasContext } from "../context/VentasContext";
import { useFilters } from "../hooks/useFilters";

const VentasPerdidasListPage = () => {
  const { ventasPerdidas, loading, getVentasPerdidas } =
    useContext(VentasContext);
  const {selectedStore}=useContext(TiendaContext)

  const { listFilter, prevPage, nextPage } = useFilters();

  useEffect(() => {
    getVentasPerdidas(selectedStore);
  }, []);

  return (
    <div className="container-sm ">
      {loading ? (
        <AlertLoading />
      ) : (
        <>
          <VentasListHeader titulo={"Ventas Pérdida"} ventas={ventasPerdidas} />

          {ventasPerdidas.message ? (
            <AlertMessage message={"No hay ventas en pérdidas para mostrar"} />
          ) : (
            <>
              {listFilter(ventasPerdidas, "ventasPerdidas").map((venta) => (
                <VentasListItem key={venta.id} venta={venta} />
              ))}
              {listFilter(ventasPerdidas, "ventas").length === 0 ? (
                <AlertMessage
                  message={"No se encontraron ventas en la búsqueda"}
                />
              ) : null}
              <Paginator prevPage={prevPage} nextPage={nextPage} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default VentasPerdidasListPage;
