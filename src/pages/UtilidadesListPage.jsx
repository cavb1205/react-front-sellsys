import React, { useContext, useEffect } from "react";

import AlertLoading from "../components/Utils/AlertLoading";

import AlertMessage from "../components/Utils/AlertMessage";

import { UtilidadesContext } from "../context/UtilidadesContext";
import UtilidadesListHeader from "../components/Utilidades/UtilidadesHeader";
import UtilidadesModalCreate from "../components/Utilidades/UtilidadesModalCreate";
import UtilidadesModalDelete from "../components/Utilidades/UtilidadesModalDelete";
import UtilidadesModalUpdate from "../components/Utilidades/UtilidadesModalUpdate";
import { AuthContext } from "../context/AuthContext";
import { useFilters } from "../hooks/useFilters";
import { UtilidadesListItem } from "../components/Utilidades/UtilidadesListItem";
import Paginator from "../components/Utils/Paginator";

const UtilidadesListPage = () => {
  const {
    utilidades,
    totalUtilidades,
    Selected,
    getUtilidades,
    openModalCreateUtilidad,
    loading,
  } = useContext(UtilidadesContext);

  const { query } = useContext(AuthContext);

  const { listFilter, prevPage, nextPage } = useFilters();

  useEffect(() => {
    getUtilidades();
  }, []);

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <>
          <UtilidadesListHeader
            utilidades={utilidades}
            totalUtilidades={totalUtilidades}
            query={query}
          />
          <div className="my-2">
            <button
              onClick={openModalCreateUtilidad}
              className="btn btn-success"
            >
              Crear Utilidad
            </button>
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

          <UtilidadesModalCreate />
          <UtilidadesModalUpdate />
          <UtilidadesModalDelete />
        </>
      )}
    </div>
  );
};

export default UtilidadesListPage;
