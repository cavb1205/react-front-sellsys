import React, { useContext, useEffect } from "react";

import ClientesHeaderListPage from "../components/Clientes/ClientesHeaderListPage";
import AlertMessage from "../components/Utils/AlertMessage";
import AlertLoading from "../components/Utils/AlertLoading";

import { ClientesContext } from "../context/ClientesContext";
import { useFilters } from "../hooks/useFilters";
import ClienteListItem from "../components/Clientes/ClienteListItem";
import Paginator from "../components/Utils/Paginator";
import { TiendaContext } from "../context/TiendaContext";

const ClientesDisponiblesListPage = () => {
  const { loading, clientesDisponibles, getClientesDisponibles } =
    useContext(ClientesContext);

  const { selectedStore } = useContext(TiendaContext);

  const { nextPage, prevPage, listFilter } = useFilters();

  useEffect(() => {
    getClientesDisponibles(selectedStore);
  }, []);

  return (
    <div className="container-sm">
      {!loading ? (
        <>
          <ClientesHeaderListPage clientes={clientesDisponibles} />

          {clientesDisponibles.message ? (
            <AlertMessage message="No hay clientes disponibles." />
          ) : (
            <>
              {listFilter(clientesDisponibles, "clientesDisponibles").map(
                (cliente) => (
                  <ClienteListItem key={cliente.id} cliente={cliente} />
                )
              )}
              {listFilter(clientesDisponibles, "clientesDisponibles").length ===
              0 ? (
                <AlertMessage message="No se encontraron clientes en la búsqueda" />
              ) : null}
              <Paginator nextPage={nextPage} prevPage={prevPage} />
            </>
          )}
        </>
      ) : (
        <AlertLoading />
      )}
    </div>
  );
};

export default ClientesDisponiblesListPage;
