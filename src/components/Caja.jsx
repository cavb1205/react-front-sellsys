import React, { useContext, useEffect } from "react";

import { TiendaContext } from "../context/TiendaContext";
import { AportesContext } from "../context/AportesContext";
import { GastosContext } from "../context/GastosContext";
import { UtilidadesContext } from "../context/UtilidadesContext";
import { VentasContext } from "../context/VentasContext";
import { RecaudosContext } from "../context/RecaudosContext";
const Caja = () => {
  const { tienda, getTienda, selectedStore } = useContext(TiendaContext);
  const { aportes } = useContext(AportesContext);
  const { gastos } = useContext(GastosContext);
  const { utilidades } = useContext(UtilidadesContext)
  const { ventasActivas } = useContext(VentasContext)
  const { recaudos } = useContext(RecaudosContext)

  useEffect(() => {
    getTienda(selectedStore);
  }, []);

  useEffect(() => {
    getTienda(selectedStore);
  }, [aportes, gastos, utilidades, ventasActivas, recaudos]);
  
  return tienda.tienda?.caja > 0 ? (
    <span className="badge text-bg-success">{tienda.tienda?.caja}</span>
  ) : (
    <span className="badge text-bg-danger">{tienda.tienda?.caja}</span>
  );
};

export default Caja;
