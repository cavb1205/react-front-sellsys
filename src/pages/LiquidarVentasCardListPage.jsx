import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import LiquidarVentasListHeader from "../components/Recaudos/LiquidarVentasListHeader";
import RecaudosModalCreate from "../components/Recaudos/RecaudosModalCreate";
import RecaudosModalNoPago from "../components/Recaudos/RecaudosModalNoPago";
import AlertMessage from "../components/Utils/AlertMessage";
import AlertLoading from "../components/Utils/AlertLoading";
import { RecaudosContext } from "../context/RecaudosContext";
import { VentasContext } from "../context/VentasContext";

import { useFilters } from "../hooks/useFilters";
import RecaudosListItem from "../components/Recaudos/RecaudosListItem";
import Paginator from "../components/Utils/Paginator";

const LiquidarVentasCardListPage = () => {
  // const { getTienda } = useContext(TiendaContext);
  const {
    getVentasLiquidar,
    handleSearch,
    ventas,
    loading,
    ventasActivas,
    getVentasActivas,
  } = useContext(VentasContext);

  const {
    SelectedRecaudo,
    selectedNoPago,
    recaudos,
    newRecaudo,
    liquidarDate,
    getRecaudosFecha,
  } = useContext(RecaudosContext);

  const { listFilter, prevPage, nextPage } = useFilters();

  useEffect(() => {
    getVentasActivas();
    getVentasLiquidar(liquidarDate.fecha_liquidar);
  }, [recaudos, newRecaudo, liquidarDate]);

  useEffect(() => {
    getRecaudosFecha(liquidarDate.fecha_liquidar);
  }, [liquidarDate, newRecaudo]);

  return (
    <div className="container-sm ">
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
                  SelectedRecaudo={SelectedRecaudo}
                  selectedNoPago={selectedNoPago}
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

          <RecaudosModalCreate />
          <RecaudosModalNoPago />
        </>
      )}
    </div>
  );
};

export default LiquidarVentasCardListPage;
