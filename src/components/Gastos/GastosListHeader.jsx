import React from "react";
import Search from "../Utils/Search";

const GastosListHeader = ({ gastos, totalGastos, query, user }) => {
  return (
    <>
      <div className="text-center">
        <h1>Lista de Gastos</h1>
        {gastos.message ? (
          <span>
            # de Gastos: <span className="badge bg-secondary">0</span>
          </span>
        ) : (
          <span>
            # de Gastos:{" "}
            <span className="badge bg-secondary">
              {
                gastos.filter((gasto) =>
                  gasto.tipo_gasto?.tipo_gasto.toLowerCase().includes(query)
                ).length
              }
            </span>
          </span>
        )}
        {user.is_staff || user.is_superuser?(
          <p>
            Total Gastos: <span className="badge bg-danger">{totalGastos}</span>
          </p>
        ):(
          null
        )}
      </div>
      <div className="text-center m-2">
        <Search />
      </div>
    </>
  );
};

export default GastosListHeader;
