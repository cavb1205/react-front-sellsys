import React, { useContext } from "react";
import FechaInput from "../Utils/FechaInput";
import useDateFilter from "../../hooks/useDateFilter";
import { GastosContext } from "../../context/GastosContext";
import { VentasContext } from "../../context/VentasContext";
import { TiendaContext } from "../../context/TiendaContext";
const InformeUtilidad = () => {
  const { fecha, fechaFin, dateChange, dateChangeFin } = useDateFilter();
  const { gastosFecha, getGastosRangoFechas } = useContext(GastosContext);
  const { ventasFecha, getVentasRangoFechas } = useContext(VentasContext);
  const { selectedStore } = useContext(TiendaContext);

  const [dateRange, setDateRange] = React.useState([]);

  const handleButtonClick = async () => {
    await getGastosRangoFechas(fecha, fechaFin, selectedStore);
    await getVentasRangoFechas(fecha, fechaFin, selectedStore);
    setDateRange(getDatesInRange(fecha, fechaFin));
  };
  

  const getDatesInRange = (startDate, endDate) => {
    let dates = [];
    let currentDate = new Date(startDate);
    endDate = new Date(endDate);
    
    if (currentDate.getTime() === endDate.getTime()) {
      dates.push(currentDate.toISOString().split("T")[0]);
    } else {
      while (currentDate.getTime() <= endDate.getTime()) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
      }
    }
    
    return dates;
  };

  const calculoPorDia = (dia) => {
    let ventasTotales = 0;
    let ventasNetas = 0;
    let gastos = 0;
    let perdidas = 0;
    let utilidad = 0;
    let valor = 0;
    if (gastosFecha.message) {
      gastos = 0;
    } else {
      gastosFecha.forEach((gasto) => {
        if (gasto.fecha === dia) {
          gastos += parseInt(gasto.valor);
        }
      });
    }
    if (ventasFecha.message) {
      ventasTotales = 0;
      ventasNetas = 0;
      perdidas = 0;
      valor = 0;
    } else {
      ventasFecha.forEach((venta) => {
        if (venta.fecha_venta === dia) {
          ventasTotales += parseInt(venta.total_a_pagar);
          ventasNetas += parseInt(venta.valor_venta);
          if (venta.estado_venta === "Perdida") {
            perdidas += parseInt(venta.perdida);
          }
        }
      });
    }

    utilidad = ventasTotales - ventasNetas - gastos - perdidas;
    valor = ventasFecha.message
      ? 0
      : ventasFecha.filter((venta) => venta.fecha_venta == dia).length;

    return {
      fecha: dia,
      valor,
      ventasTotales,
      ventasNetas,
      gastos,
      perdidas,
      utilidad,
    };
  };

  return (
    <div className="container-sm">
      <h1 className="text-secondary text-center">Informe de Utilidades</h1>
      <p className="text-secondary text-center my-3">
        Seleccione el rango de fechas a consultar
      </p>
      <div className="d-flex flex-wrap justify-content-center gap-2">
        <FechaInput fecha={fecha} dateChange={dateChange} /> hasta
        <FechaInput fecha={fechaFin} dateChange={dateChangeFin} />
      </div>
      <div className="text-center mb-2">
        <button className="btn btn-primary btn-sm" onClick={handleButtonClick}>
          Consultar
        </button>
      </div>
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="text-secondary" scope="col">
                Fecha
              </th>
              <th className="text-secondary" scope="col">
                # Ventas
              </th>
              <th className="text-secondary" scope="col">
                Ventas Totales
              </th>
              <th className="text-secondary" scope="col">
                Ventas Netas
              </th>

              <th className="text-secondary" scope="col">
                Gastos
              </th>
              <th className="text-secondary" scope="col">
                Pérdidas
              </th>
              <th className="text-secondary" scope="col">
                Utilidad
              </th>
            </tr>
          </thead>
          <tbody>
            {dateRange.map((date, index) => {
              const infoDia = calculoPorDia(date);
              const colorUtilidad =
                infoDia.utilidad > 0
                  ? "text-success"
                  : infoDia.utilidad == 0
                  ? "text-secondary"
                  : "text-danger";
              return (
                <tr key={index}>
                  <td className="text-secondary">{infoDia.fecha}</td>
                  <td className="text-secondary">{infoDia.valor}</td>
                  <td className="text-secondary">{infoDia.ventasTotales}</td>
                  <td className="text-secondary">{infoDia.ventasNetas}</td>
                  <td className="text-secondary">{infoDia.gastos}</td>
                  <td className="text-secondary">{infoDia.perdidas}</td>
                  <td className={colorUtilidad}>{infoDia.utilidad}</td>
                </tr>
              );
            })}
            <tr>
              <th className="text-secondary" scope="row">
                {dateRange.length} días
              </th>
              <th className="text-secondary" scope="row">
                {ventasFecha.message ? 0 : ventasFecha.length}
              </th>
              <th className="text-secondary">
                {ventasFecha.message
                  ? 0
                  : ventasFecha.reduce(
                      (acc, venta) => acc + parseInt(venta.total_a_pagar),
                      0
                    )}
              </th>
              <th className="text-secondary">
                {ventasFecha.message
                  ? 0
                  : ventasFecha.reduce(
                      (acc, venta) => acc + parseInt(venta.valor_venta),
                      0
                    )}
              </th>
              <th className="text-secondary">
                {gastosFecha.message
                  ? 0
                  : gastosFecha.reduce(
                      (acc, gasto) => acc + parseInt(gasto.valor),
                      0
                    )}
              </th>
              <th className="text-secondary">
                {ventasFecha.message
                  ? 0
                  : ventasFecha
                      .filter((venta) => venta.estado_venta === "Perdida")
                      .reduce((acc, venta) => acc + parseInt(venta.perdida), 0)}
              </th>
              <th
                className={`text-${
                  (ventasFecha.message
                    ? 0
                    : ventasFecha.reduce(
                        (acc, venta) => acc + parseInt(venta.total_a_pagar),
                        0
                      )) -
                    (ventasFecha.message
                      ? 0
                      : ventasFecha.reduce(
                          (acc, venta) => acc + parseInt(venta.valor_venta),
                          0
                        )) -
                    (gastosFecha.message
                      ? 0
                      : gastosFecha.reduce(
                          (acc, gasto) => acc + parseInt(gasto.valor),
                          0
                        )) <
                  0
                    ? "danger"
                    : "success"
                }`}
              >
                {(ventasFecha.message
                  ? 0
                  : ventasFecha.reduce(
                      (acc, venta) => acc + parseInt(venta.total_a_pagar),
                      0
                    )) -
                  (ventasFecha.message
                    ? 0
                    : ventasFecha.reduce(
                        (acc, venta) => acc + parseInt(venta.valor_venta),
                        0
                      )) -
                  (gastosFecha.message
                    ? 0
                    : gastosFecha.reduce(
                        (acc, gasto) => acc + parseInt(gasto.valor),
                        0
                      )) -
                  (ventasFecha.message
                    ? 0
                    : ventasFecha
                        .filter((venta) => venta.estado_venta === "Perdida")
                        .reduce(
                          (acc, venta) => acc + parseInt(venta.perdida),
                          0
                        ))}
              </th>
            </tr>
          </tbody>
        </table>
        <small className="text-secondary text-center">
          Utilidad = Préstamos con intereses - Prestamos Neto - Gastos -
          Pérdidas
        </small>
      </div>
    </div>
  );
};

export default InformeUtilidad;
