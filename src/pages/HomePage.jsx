import React, { useContext, useEffect } from "react";

import HomePageHeader from "../components/HomePage/HomePageHeader";
import HomePageTiendaCaja from "../components/HomePage/HomePageTiendaCaja";
import HomePageTiendaCardItem from "../components/HomePage/HomePageTiendaCardItem";
import HomePageTiendaGraphip from "../components/HomePage/HomePageTiendaGraphip";

import AlertLoading from "../components/Utils/AlertLoading";

import { TiendaContext } from "../context/TiendaContext";

import CierreCajaModal from "../components/Informes/CierreCajaModal";

const HomePage = () => {
  const { tienda,getTienda, loading, openModalCierreCaja } = useContext(TiendaContext);

  const infoTienda = { ...tienda.tienda };
  useEffect(() => {
    getTienda();
  }, []);
  console.log(infoTienda)
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
              <HomePageTiendaGraphip infoTienda={infoTienda}/>
            </div>

            <div className="d-flex justify-content-center my-3">
              <HomePageTiendaCaja tienda={infoTienda} />
            </div>
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
º
              <div className="m-2 flex-fill">
                <HomePageTiendaCardItem
                  tipo={"Dinero x Cobrar"}
                  total={infoTienda.dinero_x_cobrar}
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
