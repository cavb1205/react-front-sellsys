import React, { useContext, useEffect } from "react";

import AlertLoading from "../components/Utils/AlertLoading";

import AlertMessage from "../components/Utils/AlertMessage";

import { UtilidadesContext } from "../context/UtilidadesContext";
import UtilidadesListHeader from "../components/Utilidades/UtilidadesHeader";
import { AuthContext } from "../context/AuthContext";
import { useFilters } from "../hooks/useFilters";
import { UtilidadesListItem } from "../components/Utilidades/UtilidadesListItem";
import Paginator from "../components/Utils/Paginator";
import { TiendaContext } from "../context/TiendaContext";
import { Link } from "react-router-dom";

const UtilidadesListPage = () => {
  const {
    utilidades,
    Selected,
    getUtilidades,
    loading,
  } = useContext(UtilidadesContext);
  const {tienda, selectedStore} = useContext(TiendaContext)
  const { query } = useContext(AuthContext);

  const { listFilter, prevPage, nextPage } = useFilters();

  useEffect(() => {
    getUtilidades(selectedStore);
  }, []);

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <>
          <UtilidadesListHeader
            utilidades={utilidades}
            totalUtilidades={tienda.tienda?.utilidades}
            query={query}
          />
          <div className="my-2">
            <Link to={'/utilidades/create/'}
              className="btn btn-success"
            >
              Crear Utilidad
            </Link>
          </div>
          {utilidades.message ? (
            <AlertMessage message={"No se han creado utilidades."} />
          ) : (
            <>
              {listFilter(utilidades, "utilidades").map((utilidad, index) => (
                <UtilidadesListItem
                  key={utilidad.id}
                  utilidad={utilidad}
                  index={index}
                  Selected={Selected}
                />
              ))}
              {listFilter(utilidades, "utilidades").length === 0 ? (
                <AlertMessage
                  message={"No se encontraron utilidades en la búsqueda"}
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

export default UtilidadesListPage;
