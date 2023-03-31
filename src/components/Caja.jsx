import React, { useContext, useEffect } from "react";

import { TiendaContext } from "../context/TiendaContext";
import { AportesContext } from "../context/AportesContext";
import { GastosContext } from "../context/GastosContext";
import { UtilidadesContext } from "../context/UtilidadesContext";
const Caja = () => {
  const { tienda, getTienda, selectedStore } = useContext(TiendaContext);
  const { aportes } = useContext(AportesContext);
  const { gastos } = useContext(GastosContext);
  const { utilidades } = useContext(UtilidadesContext)

  useEffect(() => {
    getTienda(selectedStore);
  }, []);

  useEffect(() => {
    getTienda(selectedStore);
  }, [aportes, gastos, utilidades]);
  console.log(tienda);
  return tienda.tienda?.caja > 0 ? (
    <span className="badge text-bg-success">{tienda.tienda?.caja}</span>
  ) : (
    <span className="badge text-bg-danger">{tienda.tienda?.caja}</span>
  );
};

export default Caja;
