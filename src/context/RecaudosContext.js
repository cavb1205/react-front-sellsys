import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { URL } from "../config";
import { createUtcDateIso } from "../hooks/useDate";

const RecaudosProvider = ({ children }) => {
  const { token, logoutUser, navigate } = useContext(AuthContext);

  const [venta, setVenta] = useState({});

  const [recaudos, setRecaudos] = useState([]);
  const [recaudo, setRecaudo] = useState({});

  const [newRecaudo, setNewRecaudo] = useState({
    fecha_recaudo: "",
    valor_recaudo: "",
    venta: "",
    tienda: "",
  });

  const [loading, setLoading] = useState(false);

  const [liquidarDate, setLiquidarDate] = useState({
    fecha_liquidar: createUtcDateIso(),
  });

  const [noPago, setNoPago] = useState({
    fecha_recaudo: liquidarDate.fecha_liquidar,
    valor_recaudo: 0,
    venta: venta.id,
    tienda: "",
  });

  const recaudosCreateItem = async (tiendaId = null) => {
    try {
      setLoading(true);
      let fullUrl = `${URL}/recaudos/create/`;
      if (tiendaId) {
        fullUrl = `${URL}/recaudos/create/t/${tiendaId}/`;
      }
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newRecaudo),
      });

      if (response.status === 200) {
        setLoading(false);
        setNewRecaudo({});
        navigate("/liquidar/");
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const recaudosCreateNoPago = async (tiendaId = null) => {
    try {
      setLoading(true);
      let fullUrl = `${URL}/recaudos/create/nopay/`;
      if (tiendaId) {
        fullUrl = `${URL}/recaudos/create/nopay/t/${tiendaId}/`;
      }
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(noPago),
      });

      if (response.status === 200) {
        setLoading(false);
        setNewRecaudo({});
        navigate("/liquidar/");
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getRecaudos = async (ventaId) => {
    try {
      let response = await fetch(`${URL}/recaudos/list/${ventaId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      if (response.status === 200) {
        setRecaudos(data);
        setLoading(false);
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getRecaudo = async (recaudoId) => {
    try {
      setLoading(true);
      let response = await fetch(`${URL}/recaudos/${recaudoId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      if (response.status === 200) {
        setRecaudo(data);
        setLoading(false);
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getRecaudosFecha = async (date, tiendaId = null) => {
    try {
      setLoading(true);
      let fullUrl = `${URL}/recaudos/list/${date}/`;
      if (tiendaId) {
        fullUrl = `${URL}/recaudos/list/${date}/t/${tiendaId}/`;
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
        setRecaudos(data);
        setLoading(false);
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const recaudoUpdateItem = async (recaudoId, tiendaId = null) => {
    try {
      setLoading(true);
      let fullUrl = `${URL}/recaudos/${recaudoId}/update/`;
      if (tiendaId) {
        fullUrl = `${URL}/recaudos/${recaudoId}/update/t/${tiendaId}/`;
      }
      let response = await fetch(fullUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(recaudo),
      });

      if (response.status === 200) {
        setLoading(false);
        navigate(`/recaudos/${recaudoId}/`);
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const recaudoDeleteItem = async (recaudoId, ventaId) => {
    try {
      setLoading(true);
      let response = await fetch(`${URL}/recaudos/${recaudoId}/delete/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setLoading(false);
        if (ventaId) {
          navigate(`/ventas/${ventaId}/`);
        } else {
          navigate("/recaudos/");
        }
      } else if (response.statusText == "Unauthorized") {
        logoutUser();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewRecaudo({
      ...newRecaudo,
      [name]: value,
    });
  };

  const [tipoFalla, setTipoFalla] = useState({
    comentario: "",
    tipo_falla: "Casa o Local Cerrado",
  });

  const handleChangeNoPago = (event) => {
    const { name, value } = event.target;
    setTipoFalla({
      ...tipoFalla,
      [name]: value,
    });
    setNoPago({
      ...noPago,
      visita_blanco: {
        ...tipoFalla,
        [name]: value,
      },
    });
  };

  const handleChangeUpdate = (event) => {
    const { name, value } = event.target;
    setRecaudo({
      ...recaudo,
      [name]: value,
    });
  };

  const handleChangeDate = (event) => {
    const { name, value } = event.target;
    setLiquidarDate({ ...liquidarDate, [name]: value });
  };

  //boton abonar de liquidar ventas
  const SelectedRecaudo = (venta) => {
    setVenta(venta);
    if (venta.saldo_actual < venta.valor_cuota) {
      setNewRecaudo({
        fecha_recaudo: liquidarDate.fecha_liquidar,
        valor_recaudo: venta.saldo_actual,
        venta: venta.id,
        tienda: "",
      });
    } else {
      setNewRecaudo({
        fecha_recaudo: liquidarDate.fecha_liquidar,
        valor_recaudo: venta.valor_cuota,
        venta: venta.id,
        tienda: "",
      });
    }
    navigate("/liquidar/pay/");
  };

  //boton no pago de liquidar ventas
  const selectedNoPago = (venta) => {
    setVenta(venta);
    setTipoFalla({
      comentario: "",
      tipo_falla: "Casa o Local Cerrado",
    });
    setNoPago({
      fecha_recaudo: liquidarDate.fecha_liquidar,
      valor_recaudo: 0,
      venta: venta.id,
      tienda: "",
      visita_blanco: {
        comentario: "",
        tipo_falla: "Casa o Local Cerrado",
      },
    });
    navigate("/liquidar/nopay/");
  };

  const totalRecaudosVenta = () => {
    if (recaudos.message) {
      return 0;
    } else {
      return recaudos
        .map((recaudo) => parseFloat(recaudo.valor_recaudo))
        .reduce((a, b) => a + b, 0);
    }
  };

  const totalRecaudosFecha = () => {
    if (recaudos.message) {
      return 0;
    } else {
      // liquidarDate
      return recaudos
        .map((recaudo) => parseFloat(recaudo.valor_recaudo))
        .reduce((a, b) => a + b, 0);
    }
  };

  const contextData = {
    venta,
    handleChangeDate,
    liquidarDate,
    setLiquidarDate,
    recaudos,
    recaudo,
    newRecaudo,
    SelectedRecaudo,
    handleChange,
    handleChangeUpdate,
    getRecaudos,
    recaudosCreateItem,
    recaudoUpdateItem,
    recaudoDeleteItem,
    totalRecaudosVenta,
    selectedNoPago,
    handleChangeNoPago,
    recaudosCreateNoPago,
    getRecaudosFecha,
    loading,
    getRecaudo,
    totalRecaudosFecha,
  };
  return (
    <RecaudosContext.Provider value={contextData}>
      {children}
    </RecaudosContext.Provider>
  );
};

export const RecaudosContext = createContext();
export default RecaudosProvider;
