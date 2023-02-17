import React, { useContext, useEffect } from "react";

import HomePageHeader from "../components/HomePage/HomePageHeader";
import HomePageTiendaCaja from "../components/HomePage/HomePageTiendaCaja";
import HomePageTiendaCardItem from "../components/HomePage/HomePageTiendaCardItem";
import HomePageTiendaGraphip from "../components/HomePage/HomePageTiendaGraphip";

import AlertLoading from "../components/Utils/AlertLoading";

import { AportesContext } from "../context/AportesContext";
import { GastosContext } from "../context/GastosContext";
import { UtilidadesContext } from "../context/UtilidadesContext";

import { TiendaContext } from "../context/TiendaContext";
import { VentasContext } from "../context/VentasContext";

import { RecaudosContext } from "../context/RecaudosContext";

import CierreCajaModal from "../components/Informes/CierreCajaModal";

const HomePage = () => {
  const { tienda, loading, getTiendaMembresia, openModalCierreCaja } =
    useContext(TiendaContext);

  const { totalAportes, getAportes } = useContext(AportesContext);
  const { totalGastos, getGastos } = useContext(GastosContext);
  const { totalUtilidades, getUtilidades } = useContext(UtilidadesContext);
  const {
    totalVentasInteres,
    totalIngresosVentasFinalizadas,
    totalPerdidas,
    getVentasActivas,
    getVentasPagas,
    getAllVentas,
    getVentasPerdidas,
  } = useContext(VentasContext);
  const { getAllRecaudos } = useContext(RecaudosContext);

  useEffect(() => {
    getTiendaMembresia();
    getAportes();
    getGastos();
    getUtilidades();
    getAllVentas();
    getVentasActivas();
    getVentasPagas();
    getVentasPerdidas();
    getAllRecaudos();
  }, []);

  const infoTienda = { ...tienda.tienda };

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <>
          <HomePageHeader tienda={infoTienda} />

          <div className="m-2 text-center">
            <button
              onClick={openModalCierreCaja}
              type="button"
              className="btn btn-outline-danger btn-sm"
            >
              Cierre Caja
            </button>
          </div>

          <div>
            <div className="d-flex justify-content-center">
              <HomePageTiendaGraphip />
            </div>

            <div className="d-flex justify-content-center my-3">
              <HomePageTiendaCaja tienda={infoTienda} />
            </div>
            <h2 className="text-center text-secondary">Estado Actual Ruta</h2>
            <div className="d-flex flex-wrap justify-content-evenly">
              <div className="m-2 flex-fill">
                <HomePageTiendaCardItem
                  tipo={"Inversión"}
                  total={totalAportes()}
                />
              </div>
              <div className="m-2 flex-fill">
                <HomePageTiendaCardItem tipo={"Gastos"} total={totalGastos()} />
              </div>
              <div className="m-2 flex-fill">
                <HomePageTiendaCardItem
                  tipo={"Utilidades"}
                  total={totalUtilidades()}
                />
              </div>
              <div className="m-2 flex-fill">
                <HomePageTiendaCardItem
                  tipo={"Pérdidas"}
                  total={totalPerdidas()}
                />
              </div>
              <div className="m-2 flex-fill">
                <HomePageTiendaCardItem
                  tipo={"Ingresos x Ventas"}
                  total={totalIngresosVentasFinalizadas()}
                />
              </div>

              <div className="m-2 flex-fill">
                <HomePageTiendaCardItem
                  tipo={"Dinero x Cobrar"}
                  total={totalVentasInteres()}
                />
              </div>
            </div>
          </div>
        </>
      )}

      <CierreCajaModal />
    </div>
  );
};

export default HomePage;
