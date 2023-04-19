import React, { createContext, useContext, useState } from "react";

import { URL } from "../config";
import { AuthContext } from "./AuthContext";
import { createUtcDateIso } from "../hooks/useDate";

const VentasProvider = ({ children }) => {
  const { token, logoutUser, navigate } = useContext(AuthContext);

  const [allVentas, setAllVentas] = useState([]);
  const [ventas, setVentas] = useState([]);
  
  const [ventaDetail, setVentaDetail] = useState({});
  const [ventasActivas, setVentasActivas] = useState([]);
  
  const [ventasPerdidas, setVentasPerdidas] = useState([]);

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [error, setError] = useState(null);

  const [newVenta, setNewVenta] = useState({
    fecha_venta: createUtcDateIso(),
    valor_venta: "",
    interes: 20,
    cuotas: 20,
    comentario: "",
    cliente: "",
    fecha_vencimiento: "",
    saldo_actual: "",
  });

  const getVentasFecha = async (fecha, tiendaId=null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/ventas/list/${fecha}/`
      if(tiendaId){
        fullUrl = `${URL}/ventas/list/${fecha}/t/${tiendaId}/`
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
        setAllVentas(data);
        setLoading(false);
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch {
      setServerError(true);
      setLoading(false);
    }
  };

  const getVentasActivas = async (tiendaId = null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/ventas/activas/`
      if(tiendaId){
        fullUrl = `${URL}/ventas/activas/t/${tiendaId}/`
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
    } catch {
      setServerError(true);
      setLoading(false);
    }
  };

  const getVentasLiquidar = async (date, tiendaId=null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/ventas/activas/liquidar/${date}/`
      if(tiendaId){
        fullUrl = `${URL}/ventas/activas/liquidar/${date}/t/${tiendaId}/`
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
        setVentas(data);
        setLoading(false);
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch {
      setServerError(true);
      setLoading(false);
    }
  };

  

  const getVentasPerdidas = async (tiendaId=null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/ventas/perdidas/`
      if(tiendaId){
        fullUrl = `${URL}/ventas/perdidas/t/${tiendaId}/`
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
        setVentasPerdidas(data);
      } else if (response.statusText == "Unauthorized") {
        setLoading(false)
        logoutUser();
      }
    } catch {
      setServerError(true);
      setLoading(false);
    }
  };

  const ventasCreateItem = async (tiendaId=null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/ventas/create/`
      if(tiendaId){
        fullUrl = `${URL}/ventas/create/t/${tiendaId}/`
      }
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newVenta),
      });
      const data = await response.json();
      if (response.status === 200) {
        getVentasActivas(tiendaId);
        navigate("/ventas/");
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      } else {
        setError(data);
      }
    } catch {
      alert("Error al cargar los datos, intente de nuevo!");
      setLoading(false);
    }
  };

  const getVenta = async (ventaId) => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/ventas/${ventaId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setVentaDetail(data);
        setLoading(false);
      } else if (response.statusText == "Unauthorized") {
        setLoading(false)
        logoutUser();
      }
    } catch {
      setServerError(true);
      setLoading(false);
    }
  };

  const ventaUpdateItem = async (tiendaId=null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/ventas/${ventaDetail.id}/update/`
      if(tiendaId){
        fullUrl = `${URL}/ventas/${ventaDetail.id}/update/t/${tiendaId}/`
      }
      let response = await fetch(fullUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ventaDetail),
      });

      if (response.status === 200) {
        setLoading(false)
        navigate(`/ventas/${ventaDetail.id}/`);
      } else if (response.statusText == "Unauthorized") {
        setLoading(false)
        logoutUser();
      }
    } catch {
      setServerError(true);
      setLoading(false);
    }
  };

  const ventaDeleteItem = async (tiendaId=null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/ventas/${ventaDetail.id}/delete/`
      if(tiendaId){
        fullUrl = `${URL}/ventas/${ventaDetail.id}/delete/t/${tiendaId}/`
      }
      let response = await fetch(fullUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();

      if (response.status === 200) {
        setLoading(false)
        getVentasActivas(tiendaId);
        navigate("/ventas/");
      } else if (response.status === 406) {
        alert(data.message);
        setLoading(false)
      } else if (response.statusText == "Unauthorized") {
        setLoading(false)
        logoutUser();
      }
    } catch {
      setServerError(true);
      setLoading(false);
    }
  };

  const ventaPerdida = async () => {
    try {
      setLoading(true)
      let response = await fetch(`${URL}/ventas/${ventaDetail.id}/perdida/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ventaDetail),
      });

      if (response.status === 200) {
        setLoading(false)
        navigate(`/ventas/${ventaDetail.id}/`)
      } else if (response.statusText == "Unauthorized") {
        setLoading(false)
        logoutUser();
      }
    } catch {
      setServerError(true);
      setLoading(false);
    }
  };

  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewVenta({
      ...newVenta,
      [name]: value,
    });
  };

  const handleChangeUpdate = (event) => {
    const { name, value } = event.target;
    setVentaDetail({
      ...ventaDetail,
      [name]: value,
    });
  };

  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    setQuery(event.target.value.toLowerCase());
  };  


  const totalRecaudar = () => {
    if (ventas.message) {
      return 0;
    } else {
      return ventas
        .map((venta) => parseFloat(venta.valor_cuota))
        .reduce((a, b) => a + b, 0);
    }
  };

  const contextData = {
    newVenta,
    setNewVenta,
    allVentas,
    ventas,
    ventaDetail,
    getVentasLiquidar,
    getVentasFecha,
    ventasCreateItem,
    ventaDeleteItem,
    ventaUpdateItem,
    getVenta,
    totalRecaudar,
    handleChange,
    handleChangeUpdate,
    handleSearch,
    ventaPerdida,
    ventasPerdidas,
    ventasActivas,
    getVentasPerdidas,
    getVentasActivas,
    loading,
    serverError,
    error,
    query,
  };

  return (
    <VentasContext.Provider value={contextData}>
      {children}
    </VentasContext.Provider>
  );
};

export const VentasContext = createContext();
export default VentasProvider;
