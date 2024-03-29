import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
// import '../index.css'

import HomePageHeader from "../components/HomePage/HomePageHeader";
import HomePageTiendaCaja from "../components/HomePage/HomePageTiendaCaja";
import HomePageTiendaCardItem from "../components/HomePage/HomePageTiendaCardItem";
import HomePageTiendaGraphip from "../components/HomePage/HomePageTiendaGraphip";

import AlertLoading from "../components/Utils/AlertLoading";
import AlertWaitPayment from "../components/Utils/AlertWaitPayment";

import { TiendaContext } from "../context/TiendaContext";
import HomeLastActivity from "../components/HomePage/HomeLastActivity";
import { VentasContext } from "../context/VentasContext";
import { createUtcDateIso } from "../hooks/useDate";
import { GastosContext } from "../context/GastosContext";


const HomePage = () => {
  const { getVentasFecha, allVentas } = useContext(VentasContext);
  const { getGastosFecha, gastos } = useContext(GastosContext);
  const fecha = createUtcDateIso();
  const { tienda, loading, selectedStore } = useContext(TiendaContext);

  const infoTienda = { ...tienda.tienda };

  useEffect(() => {
    getVentasFecha(fecha, selectedStore);
    getGastosFecha(fecha, selectedStore);
  }, []);

  return (
    <div className="container-sm">
      {tienda.estado == "Pendiente Pago" && <AlertWaitPayment />}
      {loading ? (
        <AlertLoading />
      ) : (
        <>
          <HomePageHeader tienda={infoTienda} />

          <div className="m-2 text-center">
            <Link
              to={"/caja/"}
              type="button"
              className="btn btn-outline-danger btn-sm"
            >
              Cierre Caja
            </Link>
          </div>

          <div>
            <div className="d-flex justify-content-center">
              <HomePageTiendaGraphip infoTienda={infoTienda} />
            </div>

            <div className="d-flex justify-content-center my-3">
              <HomePageTiendaCaja tienda={infoTienda} />
            </div>
            {allVentas.length > 0 || gastos.length > 0 ? (
              <div className="m-auto" style={{ maxWidth: "400px" }}>
                <HomeLastActivity ventas={allVentas} gastos={gastos} />
              </div>
            ) : null}
            <div>
              <h2 className="text-center text-secondary">Estado Actual Ruta</h2>
              
              <div className="d-flex flex-wrap justify-content-evenly">
                <div className="m-2 flex-fill">
                  <HomePageTiendaCardItem
                    tipo={"Inversión"}
                    total={infoTienda.inversion}
                  />
                </div>
                <div className="m-2 flex-fill">
                  <HomePageTiendaCardItem
                    tipo={"Gastos"}
                    total={infoTienda.gastos}
                  />
                </div>
                <div className="m-2 flex-fill">
                  <HomePageTiendaCardItem
                    tipo={"Utilidades"}
                    total={infoTienda.utilidades}
                  />
                </div>
                <div className="m-2 flex-fill">
                  <HomePageTiendaCardItem
                    tipo={"Pérdidas"}
                    total={infoTienda.perdidas}
                  />
                </div>
                <div className="m-2 flex-fill">
                  <HomePageTiendaCardItem
                    tipo={"Ingresos x Ventas"}
                    total={infoTienda.ingresos_ventas_finalizadas}
                  />
                </div>
                <div className="m-2 flex-fill">
                  <HomePageTiendaCardItem
                    tipo={"Dinero x Cobrar"}
                    total={infoTienda.dinero_x_cobrar}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
