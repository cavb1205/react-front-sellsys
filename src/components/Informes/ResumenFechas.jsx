import React from "react";
import FechaInput from "../Utils/FechaInput";
import useDateFilter from "../../hooks/useDateFilter";
import ResumenFechasItem from "./ResumenFechasItem";

const ResumenFechas = () => {
  const { fecha, fechaFin, dateChange, dateChangeFin } = useDateFilter();

  return (
    <div className="container-sm">
      <div className="text-center mb-2">
        <h1 className="text-secondary">Informe por Fecha</h1>
      </div>
      <p className="text-secondary text-center my-3">
        Seleccione el rango de fechas a consultar
      </p>
      <div className="d-flex flex-wrap justify-content-center gap-2">
        <FechaInput fecha={fecha} dateChange={dateChange} /> hasta
        <FechaInput fecha={fechaFin} dateChange={dateChangeFin} />
      </div>
      <div className="d-flex flex-row flex-wrap justify-content-center gap-1 my-2">
        <ResumenFechasItem name="Ventas Netas" list={"23"} />
        <ResumenFechasItem name="Intereses por Ventas" list={"23"} />
        <ResumenFechasItem name="Pérdidas" list={"23"} />
        <ResumenFechasItem name="Utilidades" list={"23"} />
        <ResumenFechasItem name="Gastos" list={"# 23"} />
        <ResumenFechasItem name="Recaudos" list={"23"} />
      </div>
    </div>
  );
};

export default ResumenFechas;
