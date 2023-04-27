import React, { createContext, useContext, useState } from "react";

import { AuthContext } from "./AuthContext";

import { URL } from "../config";

const TiendaProvider = ({ children }) => {

  let { token, logoutUser, navigate } = useContext(AuthContext);

  const [tienda, setTienda] = useState([]);
  const [tiendas, setTiendas] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState('')
  const [cajaAnterior, setCajaAnterior] = useState({});
  const [cierresCaja, setCierresCaja] = useState([]);
  
  const [stores, setStores] = useState([])
  const [selectedStore, setSelectedStore] = useState('')
  

    const getStoresAdmin = async ()=>{
      setLoading(true)
      let response = await fetch(`${URL}/tiendas/list/admin/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setStores(data);
      setLoading(false);
    } else if (response.statusText == "Unauthorized") {
      logoutUser();
    }
    }

  const getAllTiendas = async () => {
    setLoading(true)
    let response = await fetch(`${URL}/tiendas/list/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setTiendas(data);
      setLoading(false);
    } else if (response.statusText == "Unauthorized") {
      logoutUser();
    }
  };

  const getTienda = async (tiendaId = null) => {
    setLoading(true)
    let fullUrl = `${URL}/tiendas/detail/`
    if(tiendaId){
      fullUrl = `${URL}/tiendas/detail/admin/${tiendaId}/`
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
      setTienda(data);
      setLoading(false);
    } else if (response.statusText == "Unauthorized") {
      logoutUser();
    }
  };

  const getTiendaMembresia = async () => {
    setLoading(true)
    let response = await fetch(`${URL}/tiendas/detail/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setTienda(data);
      setLoading(false);
    } else if (response.statusText == "Unauthorized") {
      logoutUser();
    }
  };

  const getTiendaMembresiaAdmin = async () => {
    setLoading(true)
    let response = await fetch(`${URL}/tiendas/detail/admin/${selectedStore}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setTienda(data);
      setLoading(false);
    } else if (response.statusText == "Unauthorized") {
      logoutUser();
    }
  };


  const getCierresCaja = async (tiendaId=null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/tiendas/cierres/`
      if(tiendaId){
        fullUrl = `${URL}/tiendas/cierres/t/${tiendaId}/`
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
        setCierresCaja(data);
        setLoading(false);
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      } else {
        setError(data);
      }
    } catch {
      alert("Error al cargar la información, por favor intente de nuevo.");
      setLoading(false);
    }
  };

  const getCierreCaja = async (fecha, tiendaId=null) => {
    setLoading(true)
    let fullUrl = `${URL}/tiendas/cierre/${fecha}/`
    if(tiendaId){
      fullUrl = `${URL}/tiendas/cierre/${fecha}/t/${tiendaId}/`
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
      setCajaAnterior(data);
      setLoading(false);
    } else if (response.statusText == "Unauthorized") {
      logoutUser();
    }
  };

  const deleteCierresCaja = async (cierreId, tiendaId=null) => {
    try {
      setLoading(true)
      let response = await fetch(`${URL}/tiendas/cierre/delete/${cierreId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      if (response.status === 200) {        
        setLoading(false);
        getCierresCaja(tiendaId);
        navigate('/cierre/delete/confirm/')
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      } else {
        setError(data);
      }
    } catch {
      alert("Error al cargar la información, por favor intente de nuevo.");
      setLoading(false);
    }
  };

  const postCierreCaja = async (fecha, tiendaId=null) => {
    setLoading(true)
    let fullUrl = `${URL}/tiendas/cierre/post/${fecha}/`
    if (tiendaId){
      fullUrl = `${URL}/tiendas/cierre/post/${fecha}/t/${tiendaId}/`
    }
    let response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      setLoading(false)
      alert("Cierre de Caja Exitoso");
      navigate('/liquidar/')
    } else if (response.statusText == "Unauthorized") {
      logoutUser();
    }
  };

  const activateSuscriptionMounth = async (tiendaId) => {
    setLoading(true)
    let fullUrl = `${URL}/tiendas/activate/mounth/${tiendaId}/`
    let response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setLoading(false)
      alert(data.message);
      getAllTiendas()
      navigate('/tiendas/')
    } else if (response.statusText == "Unauthorized") {
      logoutUser();
    }
  };

  const activateSuscriptionYear = async (tiendaId) => {
    setLoading(true)
    let fullUrl = `${URL}/tiendas/activate/year/${tiendaId}/`
    let response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setLoading(false)
      alert(data.message);
      getAllTiendas()
      navigate('/tiendas/')
    } else if (response.statusText == "Unauthorized") {
      logoutUser();
    }
  };

  const contextData = {
    tienda,
    loading,
    getTienda,
    getCierreCaja,
    cajaAnterior,
    postCierreCaja,
    getCierresCaja,
    cierresCaja,
    deleteCierresCaja,
    getAllTiendas,
    tiendas,
    getTiendaMembresia,
    error,
    getStoresAdmin,
    stores,
    selectedStore,
    setSelectedStore,
    getTiendaMembresiaAdmin,
    activateSuscriptionMounth,
    activateSuscriptionYear,
  };
  return (
    <TiendaContext.Provider value={contextData}>
      {children}
    </TiendaContext.Provider>
  );
};

export const TiendaContext = createContext();
export default TiendaProvider;
