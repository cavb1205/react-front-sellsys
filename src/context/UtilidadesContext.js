import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { URL } from "../config";
import { createUtcDateIso } from "../hooks/useDate";



const UtilidadesProvider = ({ children }) => {
  const { token, logoutUser, navigate } = useContext(AuthContext);

  const [aportantes, setAportantes] = useState([]);

  const [utilidades, setUtilidades] = useState([]);
  const [utilidad, setUtilidad] = useState({});

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const [newUtilidad, setNewUtilidad] = useState({
    fecha: createUtcDateIso(),
    comentario: "",
    valor: "",
    trabajador: "",
  });

  const getAportantes = async (tiendaId = null) => {
    try {
      let fullUrl = `${URL}/trabajadores/`;
      if (tiendaId) {
        fullUrl = `${URL}/trabajadores/t/${tiendaId}/`;
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
        setAportantes(data);
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch {
      setServerError(true);
    }
  };

  const getUtilidades = async (tiendaId = null) => {
    try {
      setLoading(true);
      let fullUrl = `${URL}/utilidades/`;
      if (tiendaId) {
        fullUrl = `${URL}/utilidades/t/${tiendaId}/`;
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
        setLoading(false);
        setUtilidades(data);
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch {
      setServerError(true);
      setLoading(false);
    }
  };

  const getUtilidadesFecha = async (fecha, tiendaId = null) => {
    try {
      let fullUrl = `${URL}/utilidades/list/${fecha}/`;
      if (tiendaId) {
        fullUrl = `${URL}/utilidades/list/${fecha}/t/${tiendaId}/`;
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
        setUtilidades(data);
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch {
      setServerError(true);
      setLoading(false);
    }
  };

  const utilidadCreateItem = async (tiendaId = null) => {
    try {
      setLoading(true);
      let fullUrl = `${URL}/utilidades/create/`;
      if (tiendaId) {
        fullUrl = `${URL}/utilidades/create/t/${tiendaId}/`;
      }
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUtilidad),
      });

      if (response.status === 200) {
        setLoading(false);
        getUtilidades(tiendaId);
        navigate('/utilidades/')
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch {
      setServerError(true);
    }
  };

  const utilidadUpdateItem = async (tiendaId = null) => {
    try {
      setLoading(true);
      let fullUrl = `${URL}/utilidades/${utilidad.id}/update/`;
      if (tiendaId) {
        fullUrl = `${URL}/utilidades/${utilidad.id}/update/t/${tiendaId}/`;
      }
      let response = await fetch(fullUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(utilidad),
      });

      if (response.status === 200) {
        setLoading(false);
        getUtilidades(tiendaId);
        navigate('/utilidades/')
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch {
      setServerError(true);
      setLoading(false);
    }
  };

  const utilidadDeleteItem = async (tiendaId=null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/utilidades/${utilidad.id}/delete/`
      if(tiendaId){
        fullUrl = `${URL}/utilidades/${utilidad.id}/delete/t/${tiendaId}/`
      }
      let response = await fetch(fullUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setLoading(false)
        getUtilidades(tiendaId);
        navigate('/utilidades/')
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch {
      setServerError(true);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUtilidad({
      ...newUtilidad,
      [name]: value,
    });
  };

  const handleChangeUpdate = (event) => {
    const { name, value } = event.target;
    setUtilidad({
      ...utilidad,
      [name]: value,
    });
  };

  const Selected = (utilidad, option) => {
    setUtilidad(utilidad);
    if (option == "Editar") {
      navigate('/utilidades/update/')
    } else {
      navigate('/utilidades/delete/')
    }
  };

  const contextData = {
    utilidades,
    utilidad,
    newUtilidad,
    setNewUtilidad,
    aportantes,
    utilidadCreateItem,
    utilidadUpdateItem,
    utilidadDeleteItem,
    handleChange,
    handleChangeUpdate,
    Selected,
    getUtilidadesFecha,
    getAportantes,
    getUtilidades,
    loading,
    serverError,
  };
  return (
    <UtilidadesContext.Provider value={contextData}>
      {children}
    </UtilidadesContext.Provider>
  );
};

export const UtilidadesContext = createContext();
export default UtilidadesProvider;
