import React from "react";
import { Link } from "react-router-dom";

const HomeLastActivity = ({ ventas, gastos }) => {
  const totalVentas = () => {
    if (ventas.length > 0) {
      return ventas.reduce(
        (sum, venta) => sum + parseFloat(venta.valor_venta),
        0
      );
    } else {
      return 0;
    }
  };

  const totalGastos = () => {
    if (gastos.length > 0) {
      return gastos.reduce((sum, gasto) => sum + parseFloat(gasto.valor), 0);
    } else {
      return 0;
    }
  };


  

  return (
    <div className="card shadow-lg p-3 mb-5 bg-body rounded">
      <h6 className="text-secondary text-center">Actividad del Día</h6>
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs d-flex justify-content-evenly">
          {ventas.length > 0 ? (
            <li className="nav-item">
              <a
                id="ventas-tab"
                data-bs-toggle="tab"
                data-bs-target="#ventas"
                className="nav-link active position-relative"
                aria-current="true"
              >
                Ventas
                <span className="position-absolute start-100 top-0 translate-middle badge rounded-pill bg-info">
                  {ventas.length}
                </span>
              </a>
            </li>
          ) : null}
          {gastos.length > 0 ? (
            <li className="nav-item">
              <a
                id="gastos-tab"
                data-bs-toggle="tab"
                data-bs-target="#gastos"
                className="nav-link position-relative"
              >
                Gastos
                <span className="position-absolute start-100 top-0 translate-middle badge rounded-pill bg-info">
                  {gastos.length}
                </span>
              </a>
            </li>
          ) : null}
        </ul>
      </div>
      <div className="card-body tab-content" id="myTabContent">
              {ventas.length > 0 ? (
        <div className={`tab-pane fade show active `} id="ventas" role="tabpanel">
          <table className="table">
            <thead>
              <tr>
                <th className="text-secondary">Cliente</th>
                <th className="text-secondary">Valor</th>
              </tr>
            </thead>
            <tbody>
                {ventas.map((venta) => (
                  <tr key={venta.id}>
                    <td>
                      <Link
                        to={`/ventas/${venta.id}/`}
                        className="text-decoration-none text-secondary"
                      >
                        {venta.cliente?.nombres}
                      </Link>
                    </td>
                    <td className="text-secondary">{venta.valor_venta}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-evenly  mt-3">
            <span className="text-secondary">
              <strong>Total Ventas</strong>
            </span>
            <span className="text-success">
              <strong>${totalVentas()}</strong>
            </span>
          </div>
        </div>
              ):null}
        <div className={(ventas.length>0)?`tab-pane fade show`:`tab-pane fade show active`} id="gastos" role="tabpanel">
          <table className="table">
            <thead>
              <tr>
                <th className="text-secondary">Gasto</th>
                <th className="text-secondary">Valor</th>
              </tr>
            </thead>
            <tbody>
              {gastos.length > 0 ? (
                gastos.map((gasto) => (
                  <tr key={gasto.id}>
                    <td>{gasto.tipo_gasto?.tipo_gasto}</td>
                    <td>{gasto.valor}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No se registraron gastos</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="d-flex justify-content-evenly  mt-3">
            <span className="text-secondary">Total Gastos</span>
            <span className="text-danger">${totalGastos()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLastActivity;
