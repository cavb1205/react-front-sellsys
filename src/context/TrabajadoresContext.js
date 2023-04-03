import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { URL, ITEMS } from "../config";

const TrabajadoresProvider = ({ children }) => {
  const { token, logoutUser, navigate, query, user } = useContext(AuthContext);

  const [trabajadores, setTrabajadores] = useState([]);
  const [trabajador, setTrabajador] = useState({});

  const [newTrabajador, setNewTrabajador] = useState({
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    identificacion: "",
    telefono: "",
    direccion: "",
  });

  const [passwordUpdate, setPasswordUpdate] = useState({});

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  const getTrabajadores = async (tiendaId = null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/trabajadores/`;
      if (tiendaId){
        fullUrl = `${URL}/trabajadores/t/${tiendaId}/`
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
        setTrabajadores(data);
        setLoading(false);
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      } else {
        setError(data);
      }
    } catch (error) {
      alert("Error al cargar los datos, intente de nuevo!");
      console.error(error);
      setLoading(false);
    }
  };

  const getTrabajador = async (trabajadorId) => {
    try {
      setLoading(true)
      const response = await fetch(`${URL}/trabajadores/${trabajadorId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setTrabajador(data);
        setLoading(false);
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      } else {
        setError(data);
      }
    } catch (error) {
      console.error(error);
      alert("Error al cargar los datos, intente de nuevo!");
      setLoading(false);
    }
  };

  const trabajadorCreateItem = async (tiendaId = null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/trabajadores/create/`
      if (tiendaId){
        fullUrl = `${URL}/trabajadores/create/t/${tiendaId}/`
      }
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTrabajador),
      });
      const data = await response.json();
      if (response.status === 200) {
        setLoading(false)
        getTrabajadores(tiendaId);
        navigate('/trabajadores/')
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      } else {
        setError(data);
      }
    } catch (error) {
      console.error(error);
      alert("Error al cargar los datos, intente de nuevo!");
      setLoading(false);
    }
  };

  const trabajadorUpdateItem = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `${URL}/trabajadores/${trabajador.id}/update/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(trabajador),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setLoading(false)
        navigate(`/trabajadores/${trabajador.id}/`);
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      } else {
        setError(data);
      }
    } catch (error) {
      console.error(error);
      alert("Error al cargar los datos, intente de nuevo!");
      setLoading(false);
    }
  };

  const trabajadorDeleteItem = async (tiendaId = null) => {
    try {
      setLoading(true)
      let response = await fetch(
        `${URL}/trabajadores/${trabajador.id}/delete/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        setLoading(false)
        getTrabajadores(tiendaId);
        navigate("/trabajadores/");
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      } else {
        setError(data);
      }
    } catch (error) {
      alert("Error al cargar los datos, intente de nuevo!");
      console.error(error);
      setLoading(false);
    }
  };
  
  const trabajadorUpdatePassword = async (trabajadorId) => {
    try {
      setLoading(true)
      const response = await fetch(`${URL}/trabajadores/password/${trabajadorId}/`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordUpdate),
      });
      const data = await response.json();
      if (response.status === 200) {
        setLoading(false)
        alert("Contraseña Cambiada con Éxito!");
        if(user.is_staff || user.is_superuser){
          navigate(`/trabajadores/${trabajadorId}/`)
        }else{
          logoutUser();
        }
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



  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTrabajador({
      ...newTrabajador,
      [name]: value,
    });
  };
  const handleChangeUpdate = (event) => {
    const { name, value, type, checked } = event.target;
    setTrabajador({
      ...trabajador,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleChangePassword = (event) => {
    const { name, value } = event.target;
    setPasswordUpdate({
      ...passwordUpdate,
      [name]: value,
    });
  };

  //filtro de la lista de clientes
  const trabajadoresFiltrados = () => {
    if (query.length === 0) {
      return trabajadores.slice(currentPage, currentPage + ITEMS);
    }

    const filtered = trabajadores.filter((trabajador) =>
      trabajador.trabajador.toLowerCase().includes(query)
    );
    return filtered;
  };

  const nextPage = () => {
    setCurrentPage(currentPage + ITEMS);
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - ITEMS);
    }
  };

  const contextData = {
    trabajadores,
    trabajador,
    trabajadorCreateItem,
    trabajadorUpdateItem,
    trabajadorDeleteItem,
    getTrabajador,
    trabajadorUpdatePassword,
    handleChange,
    handleChangeUpdate,
    handleChangePassword,
    error,
    loading,
    getTrabajadores,
    nextPage,
    prevPage,
    currentPage,
    trabajadoresFiltrados,
    passwordUpdate,
    setPasswordUpdate,
    newTrabajador,
    setNewTrabajador
  };

  return (
    <TrabajadoresContext.Provider value={contextData}>
      {children}
    </TrabajadoresContext.Provider>
  );
};

export const TrabajadoresContext = createContext();
export default TrabajadoresProvider;
