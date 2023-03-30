import React, { useContext, useEffect } from "react";

import { AportesContext } from "../context/AportesContext";
import AportesListHeader from "../components/Aportes/AportesListHeader";
import AlertMessage from "../components/Utils/AlertMessage";
import AlertLoading from "../components/Utils/AlertLoading";


import { AuthContext } from "../context/AuthContext";
import { useFilters } from "../hooks/useFilters";
import AportesListItem from "../components/Aportes/AportesListItem";
import Paginator from "../components/Utils/Paginator";
import { TiendaContext } from "../context/TiendaContext";
import { Link } from "react-router-dom";


const AportesListPage = () => {
  const {
    aportes,
    getAportes,
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
            <Link to={'/aportes/create/'} className="btn btn-success">
              Crear Aporte 
            </Link>
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
          
          
        </>
      )}
    </div>
  );
};

export { AportesListPage };
