import React, { useContext } from "react";

import { GastosContext } from "../context/GastosContext";

import GastosListHeader from "../components/Gastos/GastosListHeader";
import AlertMessage from "../components/Utils/AlertMessage";
import AlertLoading from "../components/Utils/AlertLoading";
import GastosModalCreate from "../components/Gastos/GastosModalCreate";
import GastosModalDelete from "../components/Gastos/GastosModalDelete";
import GastosModalUpdate from "../components/Gastos/GastosModalUpdate";
import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useFilters } from "../hooks/useFilters";
import TipoGastoModalCreate from "../components/Gastos/TipoGastoModalCreate";
import GastosListItem from "../components/Gastos/GastosListItem";
import Paginator from "../components/Utils/Paginator"


const GastosListPage = () => {
  const {
    gastos,
    gastoSelected,
    openModalCreateGasto,
    totalGastos,
    loading,
    getGastos,
    openModalCreateTipoGasto,
  } = useContext(GastosContext);

  const { query } = useContext(AuthContext);

  const { prevPage, nextPage, listFilter } = useFilters();

  useEffect(() => {
    getGastos();
  }, []);

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <>
          <GastosListHeader
            gastos={gastos}
            totalGastos={totalGastos}
            query={query}
          />

          <div className="d-flex justify-content-around m-4">
            <button 
              onClick={openModalCreateGasto} 
              className="btn btn-success"
            >
              Crear Gasto
            </button>
            <button
              onClick={openModalCreateTipoGasto}
              className="btn btn-primary"
            >
              Crear Tipo Gasto
            </button>
          </div>

          {gastos.message ? (
            <AlertMessage message={"No se han creado gastos."} />
          ) : (
            <>
              {listFilter(gastos, "gastos").map((gasto, index) => (
                <GastosListItem
                  key={gasto.id}
                  gasto={gasto}
                  index={index}
                  gastoSelected={gastoSelected}
                />
              ))}
              {listFilter(gastos, "gastos").length === 0 ? (
                <AlertMessage
                  message={"No se encontraron gastos en la búsqueda"}
                />
              ) : null}
              <Paginator 
                nextPage={nextPage} 
                prevPage={prevPage} 
              />
            </>
          )}

          <GastosModalCreate />
          <GastosModalUpdate />
          <GastosModalDelete />
          <TipoGastoModalCreate />
        </>
      )}
    </div>
  );
};

export default GastosListPage;
