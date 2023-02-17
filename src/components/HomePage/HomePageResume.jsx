import React from "react";

const HomePageResume = (props) => {
  const { aportes, recaudos, ventasNetas, utilidades, gastos } = props;

  return (
    <div className="d-flex flex-wrap justify-content-around">
      <span className="badge text-bg-success mb-1 mx-1">Aportes {aportes}</span>
      <span className="badge text-bg-success mb-1 mx-1">
        Recaudos {recaudos}
      </span>
      <span className="badge text-bg-danger mb-1 mx-1">Gastos {gastos}</span>
      <span className="badge text-bg-danger mb-1 mx-1">
        Utilidades {utilidades}
      </span>
      <span className="badge text-bg-danger mb-1 mx-1">
        Ventas Netas {ventasNetas}
      </span>
    </div>
  );
};

export default HomePageResume;
