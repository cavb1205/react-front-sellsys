import React from "react";
import Search from "../Utils/Search";

const AportesListHeader = ({ aportes, totalAportes, query }) => {
  return (
    <>
      <div className="text-center">
        <h1>Lista de Aportes</h1>
        {aportes.message ? (
          <span>
            # de Aportes: <span className="badge bg-secondary">0</span>
          </span>
        ) : (
          <span>
            # de Aportes:
            <span className="badge bg-secondary">
              {
                aportes.filter((aporte) =>
                  aporte.trabajador?.trabajador.toLowerCase().includes(query)
                ).length
              }
            </span>
          </span>
        )}
        <p>
          Total Aportado:{" "}
          <span className="badge bg-success">{totalAportes()}</span>
        </p>
      </div>
      <div className="text-center">
        <Search />
      </div>
    </>
  );
};

export default AportesListHeader;
