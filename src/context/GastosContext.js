import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { URL } from "../config";
import { createUtcDateIso } from "../hooks/useDate";

const GastosProvider = ({ children }) => {
  let { token, logoutUser, navigate, query } = useContext(AuthContext);

  const [tipoGastos, setTipoGastos] = useState([]);
  const [newTipoGasto, setNewTipoGasto] = useState({});
  

  const [gastos, setGastos] = useState([]);
  const [gasto, setGasto] = useState({
    fecha: "",
    tipo_gasto: "",
    valor: "",
    comentario: "",
  });
  const [newGasto, setNewGasto] = useState({
    fecha: createUtcDateIso(),
    tipo_gasto: "",
    valor: "",
    comentario: "",
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
 

  const getGastos = async (tiendaId=null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/gastos/`
      if(tiendaId){
        fullUrl = `${URL}/gastos/t/${tiendaId}/`
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
        setGastos(data);
        setLoading(false);
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch {
      setLoading(false);
      setServerError(true);
    }
  };

  const getGastosFecha = async (fecha, tiendaId=null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/gastos/list/${fecha}/`
      if(tiendaId){
        fullUrl = `${URL}/gastos/list/${fecha}/t/${tiendaId}/`
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
        setGastos(data);
        setLoading(false);
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch {
      setLoading(false);
      setServerError(true);
    }
  };

  const getTipoGastos = async () => {
    let response = await fetch(`${URL}/gastos/tipo/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setTipoGastos(data);
    } else if (response.statusText == "Unauthorized") {
      logoutUser();
    }
  };

  const gastoCreateItem = async (tiendaId=null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/gastos/create/`
      if(tiendaId){
        fullUrl=`${URL}/gastos/create/t/${tiendaId}/`
      }
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newGasto),
      });
      
      if (response.status === 200) {
        setLoading(false)
        getGastos(tiendaId);
        navigate('/gastos/')
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const tipoGastoCreate = async () => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/gastos/tipo/create/`
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTipoGasto),
      });
      
      if (response.status === 200) {
        setLoading(false)
        getTipoGastos();
        navigate('/gastos/')
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const gastoUpdateItem = async (tiendaId=null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/gastos/${gasto.id}/update/`
      if(tiendaId){
        fullUrl = `${URL}/gastos/${gasto.id}/update/t/${tiendaId}/`
      }
      const response = await fetch(fullUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(gasto),
      });

      if (response.status === 200) {
        setLoading(false)
        getGastos(tiendaId);
        navigate('/gastos/')
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch {
      setServerError(true);
    }
  };

  const gastoDeleteItem = async (tiendaId=null) => {
    setLoading(true)
    let fullUrl = `${URL}/gastos/${gasto.id}/delete/`
    if(tiendaId){
      fullUrl=`${URL}/gastos/${gasto.id}/delete/t/${tiendaId}/`
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
      getGastos(tiendaId);
      navigate("/gastos/");
    } else if (response.statusText == "Unauthorized") {
      logoutUser();
    }
  };

  


 

  const gastoSelected = (gasto, option) => {
    setGasto(gasto);
    if (option == "Editar") {
      navigate('/gastos/update/')
    } else {
      navigate('/gastos/delete/')
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewGasto({
      ...newGasto,
      [name]: value,
    });
  };

  const handleChangeUpdate = (event) => {
    const { name, value } = event.target;
    setGasto({
      ...gasto,
      [name]: value,
    });
  };

  const contextData = {
    gastos,
    gasto,
    newGasto,
    getGastos,
    gastoCreateItem,
    gastoUpdateItem,
    gastoDeleteItem,
    handleChangeUpdate,
    handleChange,
    gastoSelected,
    tipoGastoCreate,
    getGastosFecha,
    setNewGasto,
  
    tipoGastos,
    setNewTipoGasto,
    newTipoGasto,
  
    loading,
    serverError,
    getTipoGastos,
    query,
  };

  return (
    <GastosContext.Provider value={contextData}>
      {children}
    </GastosContext.Provider>
  );
};

export const GastosContext = createContext();
export default GastosProvider;
