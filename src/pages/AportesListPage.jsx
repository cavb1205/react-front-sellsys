import React, { useContext, useEffect } from "react";

import { AportesContext } from "../context/AportesContext";
import AportesListHeader from "../components/Aportes/AportesListHeader";
import AlertMessage from "../components/Utils/AlertMessage";
import AlertLoading from "../components/Utils/AlertLoading";
import AportesModalCreate from "../components/Aportes/AportesModalCreate";
import AportesModalDelete from "../components/Aportes/AportesModalDelete";
import AportesModalUpdate from "../components/Aportes/AportesModalUpdate";

import { AuthContext } from "../context/AuthContext";
import { useFilters } from "../hooks/useFilters";
import AportesListItem from "../components/Aportes/AportesListItem";
import Paginator from "../components/Utils/Paginator";
import { TiendaContext } from "../context/TiendaContext";


const AportesListPage = () => {
  const {
    aportes,
    getAportes,
    openModalCreateAporte,
    aporteSeleccionado,
    loading,
  } = useContext(AportesContext);

  const {tienda, selectedStore} = useContext(TiendaContext)

  const { query } = useContext(AuthContext);

  const { nextPage, prevPage, listFilter } = useFilters();
  

  useEffect(() => {
    getAportes(selectedStore);
  }, []);

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <>
          <AportesListHeader
            aportes={aportes}
            totalAportes={tienda.tienda?.inversion}
            query={query}
          />
          <div className="my-2">
            <button onClick={openModalCreateAporte} className="btn btn-success">
              Crear Aporte 
            </button>
          </div>
          {aportes.message ? (
            <AlertMessage message={"No se han creado aportes."} />
          ) : (
            <>
              {listFilter(aportes, "aportes").map((aporte, index) => (
                <AportesListItem
                  key={aporte.id}
                  aporte={aporte}
                  index={index}
                  aporteSeleccionado={aporteSeleccionado}
                />
              ))}
              {listFilter(aportes, "aportes").filter((aporte) =>
                aporte.trabajador.trabajador.toLowerCase().includes(query)
              ).length === 0 ? (
                <AlertMessage
                  message={"No se encontraron aportes en la búsqueda"}
                />
              ) : null}
              <Paginator 
                nextPage={nextPage} 
                prevPage={prevPage} 
              />
            </>
          )}

          <AportesModalCreate />
          <AportesModalUpdate />
          <AportesModalDelete />
        </>
      )}
    </div>
  );
};

export { AportesListPage };
