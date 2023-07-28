import React, { useContext, useEffect } from "react";
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

  useEffect(() => {
    getGastosRangoFechas(fecha, fechaFin, selectedStore);
    getVentasRangoFechas(fecha, fechaFin, selectedStore);
  }, [fecha, fechaFin]);

  const getDatesInRange = (startDate, endDate) => {
    let dates = [];
    let currentDate = new Date(startDate);
    endDate = new Date(endDate);

    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const dateRange = getDatesInRange(fecha, fechaFin);

  const calculoPorDia = (dia) => {
    let ventasTotales = 0;
    let ventasNetas = 0;
    let gastos = 0;
    let utilidad = 0;
    let valor = 0;
    if (gastosFecha.message) {
      return {
        fecha: dia,
        valor,
        ventasTotales,
        ventasNetas,
        gastos,
        utilidad,
      };
    } else {
      gastosFecha.forEach((gasto) => {
        if (gasto.fecha === dia) {
          gastos += parseInt(gasto.valor);
        }
      });
    }
    if (ventasFecha.message) {
      return {
        fecha: dia,
        valor,
        ventasTotales,
        ventasNetas,
        gastos,
        utilidad,
      };
    } else {
      ventasFecha.forEach((venta) => {
        if (venta.fecha_venta === dia) {
          ventasTotales += parseInt(venta.total_a_pagar);
          ventasNetas += parseInt(venta.valor_venta);
        }
      });
    }

    utilidad = ventasTotales - ventasNetas - gastos;
    valor = ventasFecha.filter((venta) => venta.fecha_venta === dia).length;

    return { fecha: dia, valor, ventasTotales, ventasNetas, gastos, utilidad };
  };

  return (
    <div className="container-sm">
      <h1 className="text-secondary text-center">Informe de Utilidades</h1>
      <p className="text-secondary text-center my-3">
        Seleccione el rango de fechas a consultar
      </p>
      <div className="d-flex flex-wrap justify-content-center gap-2 m-3">
        <FechaInput fecha={fecha} dateChange={dateChange} /> hasta
        <FechaInput fecha={fechaFin} dateChange={dateChangeFin} />
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
                  : infoDia.utilidad === 0
                  ? "text-secondary"
                  : "text-danger";
              return (
                <>
                  <tr key={index}>
                    <th className="text-secondary" scope="row">
                      {infoDia.fecha}
                    </th>
                    <td className="text-secondary">{infoDia.valor}</td>
                    <td className="text-secondary">{infoDia.ventasTotales}</td>
                    <td className="text-secondary">{infoDia.ventasNetas}</td>
                    <td className="text-secondary">{infoDia.gastos}</td>
                    <td className={colorUtilidad}>{infoDia.utilidad}</td>
                  </tr>
                </>
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
              <th
                className={`text-${
                  ventasFecha.message || gastosFecha.message
                    ? "secondary"
                    : ventasFecha.reduce(
                        (acc, venta) => acc + parseInt(venta.total_a_pagar),
                        0
                      ) -
                        ventasFecha.reduce(
                          (acc, venta) => acc + parseInt(venta.valor_venta),
                          0
                        ) -
                        gastosFecha.reduce(
                          (acc, gasto) => acc + parseInt(gasto.valor),
                          0
                        ) <
                      0
                    ? "danger"
                    : "success"
                }`}
              >
                {ventasFecha.message || gastosFecha.message
                  ? 0
                  : ventasFecha.reduce(
                      (acc, venta) => acc + parseInt(venta.total_a_pagar),
                      0
                    ) -
                    ventasFecha.reduce(
                      (acc, venta) => acc + parseInt(venta.valor_venta),
                      0
                    ) -
                    gastosFecha.reduce(
                      (acc, gasto) => acc + parseInt(gasto.valor),
                      0
                    )}
              </th>
            </tr>
          </tbody>
        </table>
        <small className="text-secondary text-center">
          Utilidad = Préstamos con intereses - Prestamos Neto - Gastos{" "}
        </small>
      </div>
    </div>
  );
};

export default InformeUtilidad;
