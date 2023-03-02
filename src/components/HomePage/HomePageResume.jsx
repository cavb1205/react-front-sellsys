import React from "react";

const HomePageResume = ({
  ventasNetas,
  utilidades,
  gastos,
  aportes,
  recaudos, 
  perdidas,
}) => {
  console.log(perdidas);
  return (
    <div className="d-flex flex-wrap justify-content-around">
      <span className="badge text-bg-primary mb-1 mx-1">Aportes {aportes}</span>
      {recaudos && (
        <span className="badge text-bg-success mb-1 mx-1">
          Recaudos {recaudos}
        </span>
      )}
      <span className="badge text-bg-warning mb-1 mx-1">Gastos {gastos}</span>
      <span className="badge text-bg-success mb-1 mx-1">
        Utilidades {utilidades}
      </span>
      <span className="badge text-bg-secondary mb-1 mx-1">
        Ventas Netas {ventasNetas}
      </span>
      {perdidas && (
        <span className="badge text-bg-danger mb-1 mx-1">
          Pérdidas {perdidas}
        </span>
      )}
    </div>
  );
};

export default HomePageResume;
