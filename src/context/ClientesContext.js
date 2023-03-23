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
  const [loading, setLoading] = useState(true);

  const [openModalCreate, setOpenModalCreate] = useState(false);

  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const getClientes = async (tiendaId = null) => {
    try {
      let fullUrl = `${URL}/clientes/`;
      if (tiendaId){
        fullUrl = `${URL}/clientes/tienda/${tiendaId}/`
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

  const getClientesActivos = async () => {
    try {
      const response = await fetch(`${URL}/clientes/activos/`, {
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

  const getClientesDisponibles = async () => {
    try {
      const response = await fetch(`${URL}/clientes/disponibles/`, {
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
      let fullUrl = `${URL}/clientes/create/`;
      if (tiendaId){
        fullUrl = `${URL}/clientes/create/t/${tiendaId}/`
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
        setOpenModalCreate(!openModalCreate);
        getClientes();
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
        setOpenModalUpdate(!setOpenModalUpdate);
        getClientes();
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

  const clienteDeleteItem = async () => {
    try {
      let response = await fetch(`${URL}/clientes/${cliente.id}/delete/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      if (response.status === 200) {
        setOpenModalDelete(!openModalDelete);
        getClientes();
        navigate("/clientes/");
      } else if (response.status === 202) {
        setError(data);
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

  const getVentasActivasCliente = async (clienteId) => {
    try {
      let response = await fetch(`${URL}/ventas/activas/${clienteId}`, {
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

  const openModalCreateCliente = () => {
    setOpenModalCreate(!openModalCreate);
  };

  const openModalUpdateCliente = () => {
    setError(null);
    setOpenModalUpdate(!openModalUpdate);
  };
  const openModalDeleteCliente = () => {
    setOpenModalDelete(!openModalDelete);
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

  const clienteSelected = (cliente, option) => {
    setCliente(cliente);
    if (option == "Detalle") {
      navigate(`/clientes/${cliente.id}/`);
    } else if (option == "Editar") {
      setOpenModalUpdate(!openModalUpdate);
    } else {
      setOpenModalDelete(!openModalDelete);
    }
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
    openModalCreate,

    openModalUpdate,
    openModalDelete,
    openModalCreateCliente,
    clienteSelected,
    handleChange,
    handleChangeUpdate,
    openModalUpdateCliente,

    openModalDeleteCliente,
    error,
    loading,
  };

  return (
    <ClientesContext.Provider value={contextData}>
      {children}
    </ClientesContext.Provider>
  );
};

export default ClientesProvider;
