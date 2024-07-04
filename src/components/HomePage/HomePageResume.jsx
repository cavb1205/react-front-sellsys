import React from "react";

const HomePageResume = ({
  ventasNetas,
  utilidades,
  gastos,
  aportes,
  recaudos, 
  perdidas,
}) => {

   //formato de miles y millones a valores del homepage
   const formatNumber = (number) => {
    return number.toLocaleString()
  }
  
  return (
    <div className="d-flex flex-wrap justify-content-around">
      <span className="badge text-bg-primary mb-1 mx-1">Aportes {aportes ?formatNumber(aportes): aportes}</span>
      {recaudos && (
        <span className="badge text-bg-success mb-1 mx-1">
          Recaudos {recaudos? formatNumber(recaudos):recaudos}
        </span>
      )}
      <span className="badge text-bg-warning mb-1 mx-1">Gastos {gastos? formatNumber(gastos): gastos}</span>
      <span className="badge text-bg-success mb-1 mx-1">
        Utilidades {utilidades?formatNumber(utilidades):utilidades}
      </span>
      <span className="badge text-bg-secondary mb-1 mx-1">
        Ventas Netas {ventasNetas?formatNumber(ventasNetas):ventasNetas}
      </span>
      {perdidas && (
        <span className="badge text-bg-danger mb-1 mx-1">
          Pérdidas {perdidas?formatNumber(perdidas):perdidas}
        </span>
      )}
    </div>
  );
};

export default HomePageResume;
