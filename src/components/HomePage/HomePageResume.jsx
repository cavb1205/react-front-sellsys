import React from "react";

const HomePageResume = (props) => {
  const { aportes, recaudos, ventasNetas, utilidades, gastos, dia } = props;

  return (
    <div className="d-flex flex-wrap justify-content-around">
      <span className="badge text-bg-primary mb-1 mx-1">Aportes {aportes}</span>
      {dia && (
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
    </div>
  );
};

export default HomePageResume;
