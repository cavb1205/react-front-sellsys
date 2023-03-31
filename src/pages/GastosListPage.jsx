import React, { useContext } from "react";

import { GastosContext } from "../context/GastosContext";

import GastosListHeader from "../components/Gastos/GastosListHeader";
import AlertMessage from "../components/Utils/AlertMessage";
import AlertLoading from "../components/Utils/AlertLoading";
import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useFilters } from "../hooks/useFilters";

import GastosListItem from "../components/Gastos/GastosListItem";
import Paginator from "../components/Utils/Paginator"
import { TiendaContext } from "../context/TiendaContext";
import { Link } from "react-router-dom";


const GastosListPage = () => {
  const {
    gastos,
    gastoSelected,
    loading,
    getGastos,
  } = useContext(GastosContext);

  const {tienda, selectedStore} = useContext(TiendaContext)

  const { query } = useContext(AuthContext);

  const { prevPage, nextPage, listFilter } = useFilters();

  useEffect(() => {
    getGastos(selectedStore);
  }, []);

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <>
          <GastosListHeader
            gastos={gastos}
            totalGastos={tienda.tienda?.gastos}
            query={query}
          />

          <div className="d-flex justify-content-around m-4">
            <Link to={'/gastos/create/'} 
              className="btn btn-success"
            >
              Crear Gasto
            </Link>
            <Link to={'/gastos/tipo/create/'}
              className="btn btn-primary"
            >
              Crear Tipo Gasto
            </Link>
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
        </>
      )}
    </div>
  );
};

export default GastosListPage;
