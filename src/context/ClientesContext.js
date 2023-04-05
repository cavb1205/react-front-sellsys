import React, { createContext, useState, useContext } from "react";

import { AuthContext } from "./AuthContext";

import { URL } from "../config";

export const ClientesContext = createContext();

const ClientesProvider = ({ children }) => {
  const { token, logoutUser, navigate } = useContext(AuthContext);

  const [clientes, setClientes] = useState([]);
  const [clientesDisponibles, setClientesDisponibles] = useState([]);
  const [clientesActivos, setClientesActivos] = useState([]);

  const [ventasActivas, setVentasActivas] = useState([]);

  const [cliente, setCliente] = useState({
    id: "",
    identificacion: "",
    nombres: "",
    apellidos: "",
    nombre_local: "",
    telefono_principal: "",
    telefono_opcional: "",
    direccion: "",
    estado_cliente: "",
  });
  const [newCliente, setNewCliente] = useState({
    identificacion: "",
    nombres: "",
    apellidos: "",
    nombre_local: "",
    telefono_principal: "",
    telefono_opcional: "",
    direccion: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getClientes = async (tiendaId = null) => {
    try {
      setLoading(true);
      let fullUrl = `${URL}/clientes/`;
      if (tiendaId) {
        fullUrl = `${URL}/clientes/tienda/${tiendaId}/`;
      }
      const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        setClientes(data);
        setLoading(false);
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch (error) {
      alert("Error al cargar los datos, intente de nuevo!");
      setLoading(false);
    }
  };

  const getClientesActivos = async (tiendaId = null) => {
    try {
      setLoading(true);
      let fullUrl = `${URL}/clientes/activos/`;
      if (tiendaId) {
        fullUrl = `${URL}/clientes/activos/t/${tiendaId}/`;
      }
      const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        setClientesActivos(data);
        setLoading(false);
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch (error) {
      alert("Error al cargar los datos, intente de nuevo!");
      setLoading(false);
    }
  };

  const getClientesDisponibles = async (tiendaId = null) => {
    try {
      setLoading(true);
      let fullUrl = `${URL}/clientes/disponibles/`;
      if (tiendaId) {
        fullUrl = `${URL}/clientes/disponibles/t/${tiendaId}/`;
      }
      const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        setClientesDisponibles(data);
        setLoading(false);
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch (error) {
      alert("Error al cargar los datos, intente de nuevo!");
      setLoading(false);
    }
  };

  const getCliente = async (clienteId) => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/clientes/${clienteId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        setCliente(data);
        setLoading(false);
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      } else {
        setError(data);
      }
    } catch (error) {
      alert("Error al cargar los datos, intente de nuevo!");
      setLoading(false);
    }
  };

  const clienteCreateItem = async (tiendaId = null) => {
    try {
      setLoading(true);
      let fullUrl = `${URL}/clientes/create/`;
      if (tiendaId) {
        fullUrl = `${URL}/clientes/create/t/${tiendaId}/`;
      }
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCliente),
      });
      const data = await response.json();
      if (response.status === 200) {
        setLoading(false);
        getClientes(tiendaId);
        navigate(`/clientes/`);
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      } else {
        setError(data);
      }
    } catch (error) {
      alert("Error al cargar los datos, intente de nuevo!");
      setLoading(false);
    }
  };

  const clienteUpdateItem = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/clientes/${cliente.id}/update/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cliente),
      });
      const data = await response.json();
      if (response.status === 200) {
        setLoading(false);
        navigate(`/clientes/${cliente.id}/`);
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      } else {
        setError(data);
      }
    } catch (error) {
      alert("Error al cargar los datos, intente de nuevo!");
      setLoading(false);
    }
  };

  const clienteDeleteItem = async (tiendaId = null) => {
    try {
      setLoading(true);
      let response = await fetch(`${URL}/clientes/${cliente.id}/delete/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      if (response.status === 200) {
        setLoading(false);
        getClientes(tiendaId);
        navigate("/clientes/");
      } else if (response.status === 202) {
        setError(data);
        setLoading(false)
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      } else {
        setError(data);
      }
    } catch (error) {
      alert("Error al cargar los datos, intente de nuevo!");
      setLoading(false);
    }
  };

  const getVentasActivasCliente = async (clienteId, tiendaId=null) => {
    try {
      setLoading(true);
      let fullUrl = `${URL}/ventas/activas/${clienteId}/`
      if (tiendaId){
        fullUrl = `${URL}/ventas/activas/${clienteId}/t/${tiendaId}/`
      }
      let response = await fetch(fullUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      if (response.status === 200) {
        setVentasActivas(data);
        setLoading(false);
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch (error) {
      alert("Error al cargar los datos, intente de nuevo!");
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewCliente({
      ...newCliente,
      [name]: value,
    });
  };
  const handleChangeUpdate = (event) => {
    const { name, value } = event.target;
    setCliente({
      ...cliente,
      [name]: value,
    });
  };


  const contextData = {
    clientes,
    cliente,
    clientesDisponibles,

    getClientes,
    getCliente,
    clienteUpdateItem,
    clienteDeleteItem,
    clienteCreateItem,
    getVentasActivasCliente,
    ventasActivas,
    getClientesDisponibles,
    getClientesActivos,
    clientesActivos,
    handleChange,
    handleChangeUpdate,
    error,
    loading,
    newCliente,
    setNewCliente
  };

  return (
    <ClientesContext.Provider value={contextData}>
      {children}
    </ClientesContext.Provider>
  );
};

export default ClientesProvider;
