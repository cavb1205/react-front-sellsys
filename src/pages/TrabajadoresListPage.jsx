import React, { useContext, useEffect } from "react";

import { TrabajadoresContext } from "../context/TrabajadoresContext";
import TrabajadoresListHeader from "../components/Trabajadores/TrabajadoresListHeader";
import AlertMessage from "../components/Utils/AlertMessage";
import TrabajadorModalCreate from "../components/Trabajadores/TrabajadorModalCreate";

import { AuthContext } from "../context/AuthContext";
import { useFilters } from "../hooks/useFilters";
import AlertLoading from "../components/Utils/AlertLoading";

import TrabajadorListItem from "../components/Trabajadores/TrabajadorListItem";
import Paginator from "../components/Utils/Paginator";
import { TiendaContext } from "../context/TiendaContext";

const TrabajadoresListPage = () => {
  const { trabajadores, openModalCreateTrabajador, loading, getTrabajadores } =
    useContext(TrabajadoresContext);
  const {selectedStore} = useContext(TiendaContext)
  const { query } = useContext(AuthContext);
  const { listFilter, prevPage, nextPage } = useFilters();
  
  useEffect(() => {
    getTrabajadores(selectedStore);
  }, []);

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <>
          <TrabajadoresListHeader trabajadores={trabajadores} query={query} />
          <div className="my-2">
            <button
              onClick={openModalCreateTrabajador}
              className="btn btn-success"
            >
              Crear Trabajador
            </button>
          </div>
          {trabajadores.message ? (
            <AlertMessage message={trabajadores.message} />
          ) : (
            <>
              {listFilter(trabajadores, "trabajadores").map((trabajador) => (
                <TrabajadorListItem
                  key={trabajador.id}
                  trabajador={trabajador}
                />
              ))}
              {listFilter(trabajadores, "trabajadores").length === 0 ? (
                <AlertMessage
                  message={"No se encontraron trabajadores en la búsqueda"}
                />
              ) : null}
              <Paginator 
                nextPage={nextPage}
                prevPage={prevPage}
              />
            </>
          )}

          <TrabajadorModalCreate />
        </>
      )}
    </div>
  );
};

export default TrabajadoresListPage;
