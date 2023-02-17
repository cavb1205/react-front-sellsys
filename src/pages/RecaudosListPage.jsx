import React from "react";
import { useEffect } from "react";
import { useContext } from "react";

import InformeRecaudosListItem from "../components/Informes/InformeRecaudosListItem";
import AlertLoading from "../components/Utils/AlertLoading";
import AlertMessage from "../components/Utils/AlertMessage";
import Paginator from "../components/Utils/Paginator";
import { RecaudosContext } from "../context/RecaudosContext";
import useDateFilter from "../hooks/useDateFilter";
import { useFilters } from "../hooks/useFilters";

const RecaudosListPage = () => {
  const { recaudos, getRecaudosFecha, totalRecaudosFecha, loading } =
    useContext(RecaudosContext);

  const { fecha, dateChange } = useDateFilter();
  const { nextPage, prevPage, listFilter } = useFilters();

  useEffect(() => {
    getRecaudosFecha(fecha);
  }, [fecha]);

  return (
    <div className="container-sm">
      <div className="text-center mb-1">
        <h1>Informe Recaudos</h1>
        {recaudos.message ? (
          <p className="badge rounded-pill text-bg-secondary"># Recaudos: 0</p>
        ) : (
          <p className="badge rounded-pill text-bg-secondary">
            # Recaudos: {recaudos.length}
          </p>
        )}
        <br />
        <p className="badge bg-success">
          Total recaudado: {totalRecaudosFecha()}
        </p>
      </div>

      <div className="text-center mb-2">
        <span className="badge bg-primary">
          Fecha:{" "}
          <input onChange={dateChange} value={fecha} type="date" name="fecha" />
        </span>
      </div>
      {loading ? (
        <AlertLoading />
      ) : recaudos.message ? (
        <AlertMessage message={"No se encontraron datos con la fecha"} />
      ) : (
        <>
          {listFilter(recaudos, "recaudos").map((recaudo) => (
            <InformeRecaudosListItem key={recaudo.id} recaudo={recaudo} />
          ))}
          {listFilter(recaudos, "recaudos").length === 0 ? (
            <AlertMessage
              message={"No se encontraron recaudos en la búsqueda"}
            />
          ) : null}
          <Paginator nextPage={nextPage} prevPage={prevPage} />
        </>
      )}
    </div>
  );
};

export default RecaudosListPage;
