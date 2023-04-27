import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import LiquidarVentasListHeader from "../components/Recaudos/LiquidarVentasListHeader";
import AlertMessage from "../components/Utils/AlertMessage"; 
import AlertLoading from "../components/Utils/AlertLoading";
import { RecaudosContext } from "../context/RecaudosContext";
import { VentasContext } from "../context/VentasContext";

import { useFilters } from "../hooks/useFilters";
import RecaudosListItem from "../components/Recaudos/RecaudosListItem";
import Paginator from "../components/Utils/Paginator";
import { TiendaContext } from "../context/TiendaContext";
import AlertWaitPayment from "../components/Utils/AlertWaitPayment";

const LiquidarVentasCardListPage = () => {
  const {tienda}=useContext(TiendaContext)
  const {
    getVentasLiquidar,
    handleSearch,
    ventas,
    loading,
    ventasActivas,
    getVentasActivas,
  } = useContext(VentasContext);

  const {
    recaudos,
    newRecaudo,
    liquidarDate,
    getRecaudosFecha,
  } = useContext(RecaudosContext);

  const {selectedStore} = useContext(TiendaContext)

  const { listFilter, prevPage, nextPage } = useFilters();

  useEffect(() => {
    getVentasActivas(selectedStore);
    getVentasLiquidar(liquidarDate.fecha_liquidar, selectedStore);
  }, [recaudos, newRecaudo, liquidarDate]);

  useEffect(() => {
    getRecaudosFecha(liquidarDate.fecha_liquidar);
  }, [liquidarDate, newRecaudo]);

  return (
    <div className="container-sm ">
      {tienda.estado == 'Pendiente Pago' && <AlertWaitPayment/>}
      {loading ? (
        <AlertLoading />
      ) : (
        <>
          <LiquidarVentasListHeader
            ventas={ventas}
            handleSearch={handleSearch}
            ventasActivas={ventasActivas}
          />
          {ventas.message ? (
            <AlertMessage 
              message={"No hay ventas para liquidar el día de hoy"}
            />
          ) : (
            <>
              {listFilter(ventas, "liquidar").map((venta) => (
                <RecaudosListItem
                  key={venta.id}
                  venta={venta}
                />
              ))}
              {listFilter(ventas, "liquidar").length === 0 ? (
                <AlertMessage
                  message={"No se encontraron ventas en la búsqueda"}
                />
              ) : null}
              <Paginator
                nextPage={nextPage}
                prevPage={prevPage}
              />
            </>
          )}                    
        </>
      )}
    </div>
  );
};

export default LiquidarVentasCardListPage;
