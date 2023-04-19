import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { URL } from "../config";
import { createUtcDateIso } from "../hooks/useDate";

export const AportesContext = createContext();

const AportesProvider = ({ children }) => {
  const { token, logoutUser, navigate } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [message, setMessage] = useState(false);


  const [aportes, setAportes] = useState([]);
  const [newAporte, setNewAporte] = useState({
    fecha: createUtcDateIso(),
    valor: "",
    comentario: "",
    trabajador: "",
  });
  const [aporteId, setAporteId] = useState({});

  const getAportes = async (tiendaId = null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/aportes/`;
      if (tiendaId) {
        fullUrl = `${URL}/aportes/t/${tiendaId}/`
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
        setAportes(data);
        setLoading(false);
      } else if (response.statusText === "Unauthorized") {
        logoutUser();
      }
    } catch {
      setServerError(true);
      setLoading(false);
    }
  };

  const getAportesFecha = async (fecha, tiendaId=null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/aportes/list/${fecha}/`
      if (tiendaId){
        fullUrl = `${URL}/aportes/list/${fecha}/t/${tiendaId}/`
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
        setAportes(data);
        setLoading(false);
      } else if (response.statusText === "Unauthorized") {
        logoutUser();
      }
    } catch {
      setServerError(true);
      setLoading(false);
    }
  };

  const aporteCreateItem = async (tiendaId = null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/aportes/create/`
      if(tiendaId){
        fullUrl = `${URL}/aportes/create/t/${tiendaId}/`
      }
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAporte),
      });

      if (response.status === 200) {
        setLoading(false)
        getAportes(tiendaId);
        navigate('/aportes/')
      } else if (response.status === 400) {
        setMessage(!message);
      } else if (response.statusText === "Unauthorized") {
        logoutUser();
      }
    } catch {
      setServerError(true);
    }
  };

  const aporteUpdateItem = async (tiendaId = null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/aportes/${aporteId.id}/update/`
      if(tiendaId){
        fullUrl = `${URL}/aportes/${aporteId.id}/update/t/${tiendaId}/`
      }
      const response = await fetch(fullUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(aporteId),
      });

      if (response.status === 200) {
        setLoading(false)
        getAportes(tiendaId);
        navigate('/aportes/')
      } else if (response.statusText === "Unauthorized") {
        logoutUser();
      }
    } catch {
      setServerError(true);
    }
  };

  const aporteDeleteItem = async (tiendaId=null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/aportes/${aporteId.id}/delete/`
      if (tiendaId){
        fullUrl = `${URL}/aportes/${aporteId.id}/delete/t/${tiendaId}/`
      }
      const response = await fetch(fullUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setLoading(false)
        getAportes(tiendaId);
        navigate("/aportes/");
      } else if (response.statusText === "Unauthorized") {
        logoutUser();
      }
    } catch {
      setServerError(true);
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewAporte({
      ...newAporte,
      [name]: value,
    });
  };
  const handleChangeUpdate = (event) => {
    const { name, value } = event.target;
    setAporteId({
      ...aporteId,
      [name]: value,
    });
  };

  const aporteSeleccionado = (aporte, option) => {
    setAporteId(aporte);
    if (option === "Editar") {
      navigate('/aportes/update/')
    } else {
      navigate('/aportes/delete/')
    }
  };

  const contextData = {
    aportes,
    newAporte,
    aporteId,    
    aporteSeleccionado,
    handleChange,
    aporteCreateItem,
    handleChangeUpdate,
    aporteUpdateItem,
    aporteDeleteItem,
    getAportesFecha,
    loading,
    serverError,
    message,
    getAportes,
  };

  return (
    <AportesContext.Provider value={contextData}>
      {children}
    </AportesContext.Provider>
  );
};

export default AportesProvider;
