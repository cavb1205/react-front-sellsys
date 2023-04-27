import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AportesContext } from "../../context/AportesContext";
import { GastosContext } from "../../context/GastosContext";
import { RecaudosContext } from "../../context/RecaudosContext";
import { TiendaContext } from "../../context/TiendaContext";
import { UtilidadesContext } from "../../context/UtilidadesContext";
import { VentasContext } from "../../context/VentasContext";
import useDateFilter from "../../hooks/useDateFilter";
import useTotalResume from "../../hooks/useTotalResume";
import AlertLoading from "../Utils/AlertLoading";
import AlertWaitPayment from "../Utils/AlertWaitPayment";

const CierreCaja = () => {
  const {
    getCierreCaja,
    cajaAnterior,
    postCierreCaja,
    selectedStore,
    loading,
    tienda
  } = useContext(TiendaContext);

  const { aportes, getAportesFecha } = useContext(AportesContext);
  const { getRecaudosFecha, recaudos } = useContext(RecaudosContext);
  const { allVentas, getVentasFecha } = useContext(VentasContext);
  const { gastos, getGastosFecha } = useContext(GastosContext);
  const { utilidades, getUtilidadesFecha } = useContext(UtilidadesContext);

  const { fecha, dateChange } = useDateFilter();
  const { itemsDia } = useTotalResume();

  useEffect(() => {
    getCierreCaja(fecha, selectedStore);
    getRecaudosFecha(fecha, selectedStore);
    getAportesFecha(fecha, selectedStore);
    getVentasFecha(fecha, selectedStore);
    getGastosFecha(fecha, selectedStore);
    getUtilidadesFecha(fecha, selectedStore);
  }, [fecha]);

  const totalCaja = () => {
    return (
      parseInt(cajaAnterior.valor) +
      itemsDia(aportes, "aportes", fecha) +
      itemsDia(recaudos, "recaudos", fecha) -
      itemsDia(allVentas, "ventasNetas", fecha) -
      itemsDia(gastos, "gastos", fecha) -
      itemsDia(utilidades, "utilidades", fecha)
    );
  };
  
  return (
    <div className="container-sm">
      {tienda.estado == 'Pendiente Pago' && <AlertWaitPayment/>}
      {loading ? (
        <AlertLoading />
      ) : (
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <div className="text-center">
            Cierre Caja{" "}
            <input
              type="date"
              value={fecha}
              onChange={dateChange}
              className="btn btn-outline-primary btn-sm mx-3 mb-1"
            />
            <br />
            {!cajaAnterior.valor ? (
              <small className="badge rounded-pill text-bg-danger">
                No se ha cerrado la caja del día anterior!!
              </small>
            ) : null}
          </div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Concepto</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-light">
                  <td>Fecha Cierre</td>
                  <td className="text-secondary">{fecha}</td>
                </tr>
                <tr className="table-light">
                  <td>Caja Inicial</td>
                  {cajaAnterior.valor ? (
                    <td className="text-secondary">{cajaAnterior.valor}</td>
                  ) : (
                    <td className="text-secondary">0</td>
                  )}
                </tr>
                <tr className="table-light">
                  <td>Ingresos Aportes</td>
                  <td className="text-success">
                    {itemsDia(aportes, "aportes", fecha)}
                  </td>
                </tr>
                <tr className="table-light">
                  <td>Ingresos Recaudos</td>
                  <td className="text-success">
                    {itemsDia(recaudos, "recaudos", fecha)}
                  </td>
                </tr>
                <tr className="table-light">
                  <td>Salida x Ventas</td>
                  <td className="text-danger">
                    {itemsDia(allVentas, "ventasNetas", fecha)}
                  </td>
                </tr>
                <tr className="table-light">
                  <td>Salida x Gastos</td>
                  <td className="text-danger">
                    {itemsDia(gastos, "gastos", fecha)}
                  </td>
                </tr>
                <tr className="table-light">
                  <td>Salida x Utilidades</td>
                  <td className="text-danger">
                    {itemsDia(utilidades, "utilidades", fecha)}
                  </td>
                </tr>
                <tr
                  className={totalCaja() < 0 ? "table-danger" : "table-success"}
                >
                  <td>Total Caja</td>
                  {totalCaja() || totalCaja() == 0 ? (
                    <td>{totalCaja()}</td>
                  ) : (
                    <td className="text-danger">Sin Registro</td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-evenly m-2">
            <Link to={'/liquidar/'} className="btn btn-secondary">Cancelar</Link>
            <button
              onClick={() => postCierreCaja(fecha, selectedStore)}
              className="btn btn-danger"
            >
              Cerrar Caja
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CierreCaja;
