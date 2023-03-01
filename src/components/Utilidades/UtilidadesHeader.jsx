import React from "react";
import Search from "../Utils/Search";

const UtilidadesListHeader = ({ utilidades, totalUtilidades, query }) => {
  return (
    <>
      <div className="text-center">
        <h1>Lista de Utilidades</h1>
        {utilidades.message ? (
          <span>
            # de utilidades: <span className="badge bg-secondary">0</span>
          </span>
        ) : (
          <span>
            # de utilidades:{" "}
            <span className="badge bg-secondary">
              {
                utilidades.filter((utilidad) =>
                  utilidad.trabajador?.trabajador.toLowerCase().includes(query)
                ).length
              }
            </span>
          </span>
        )}
        <p>
          Total utilidades:{" "}
          <span className="badge bg-success">{totalUtilidades}</span>
        </p>
      </div>
      <div className="text-center">
        <Search />
      </div>
    </>
  );
};

export default UtilidadesListHeader;
