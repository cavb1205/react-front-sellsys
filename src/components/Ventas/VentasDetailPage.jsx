import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { VentasContext } from "../../context/VentasContext";
import AlertMessage from "../Utils/AlertMessage";
import { RecaudosContext } from "../../context/RecaudosContext";

import RecaudosVentaDetailListItem from "../Recaudos/RecaudosVentaDetailListItem";
import AlertLoading from "../Utils/AlertLoading";
import { AuthContext } from "../../context/AuthContext";

const VentasDetailPage = () => {
  const { user } = useContext(AuthContext);
  const { getVenta, ventaDetail, loading } = useContext(VentasContext);

  const { recaudos, totalRecaudosVenta, getRecaudos } =
    useContext(RecaudosContext);

  const { ventaId } = useParams();

  useEffect(() => {
    getVenta(ventaId);
    getRecaudos(ventaId);
  }, []);

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <div className="card shadow p-3 mb-5 bg-body rounded">
          <div className="card">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="detailVenta-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#detailVenta"
                    aria-current="true"
                  >
                    Venta
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="abonosVenta-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#abonosVenta"
                  >
                    Abonos
                  </a>
                </li>
              </ul>
            </div>

            {/* VENTA DETAIL */}
            <div className="card-body tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="detailVenta"
                role="tabpanel"
              >
                {loading ? (
                  <AlertLoading />
                ) : (
                  <>
                    <Link
                      to={`/clientes/${ventaDetail.cliente?.id}/`}
                      className="text-decoration-none text-capitalize"
                    >
                      <h1 className="card-title text-center text-secondary ">
                        {ventaDetail.cliente?.nombres}{" "}
                        {ventaDetail.cliente?.apellidos}
                      </h1>
                    </Link>
                    <div className="text-center">
                      <a
                        href={`tel:${ventaDetail.cliente?.telefono_principal}`}
                      >
                        <button className="btn btn-success btn-sm">
                          Llamar Cliente
                        </button>
                      </a>
                    </div>

                    <div className="row justify-content-around my-2">
                      <div className="col-5">
                        <strong>Saldo Actual:</strong>
                      </div>
                      <div className="col-5">
                        <span className="badge rounded-pill bg-danger">
                          {ventaDetail.saldo_actual}{" "}
                        </span>
                      </div>
                    </div>
                    <div className="row justify-content-around my-2">
                      <div className="col-5">
                        <strong>Fecha Venta:</strong>
                      </div>
                      <div className="col-5">
                        <span>{ventaDetail.fecha_venta}</span>
                      </div>
                    </div>
                    <div className="row justify-content-around my-2">
                      <div className="col-5">
                        <strong>Valor Venta:</strong>
                      </div>
                      <div className="col-5">
                        <span className="text-primary">
                          {ventaDetail.valor_venta}
                        </span>
                      </div>
                    </div>
                    <div className="row justify-content-around my-2">
                      <div className="col-5">
                        <strong>Interés:</strong>
                      </div>
                      <div className="col-5">
                        <span>{ventaDetail.interes}%</span>
                      </div>
                    </div>
                    <div className="row justify-content-around my-2">
                      <div className="col-5">
                        <strong>Cuotas:</strong>
                      </div>
                      <div className="col-5">
                        <span>{ventaDetail.cuotas}</span>
                      </div>
                    </div>
                    <div className="row justify-content-around my-2">
                      <div className="col-5">
                        <strong>Valor Cuota:</strong>
                      </div>
                      <div className="col-5">
                        <span className="text-primary">
                          {ventaDetail.valor_cuota}
                        </span>
                      </div>
                    </div>
                    <div className="row justify-content-around my-2">
                      <div className="col-5">
                        <strong>Total a Pagar:</strong>
                      </div>
                      <div className="col-5">
                        <span>{ventaDetail.total_a_pagar}</span>
                      </div>
                    </div>
                    {ventaDetail.comentario ? (
                      <div className="row justify-content-around my-2">
                        <div className="col-5">
                          <strong>Cuotas:</strong>
                        </div>
                        <div className="col-5">
                          <span>{ventaDetail.cuotas}</span>
                        </div>
                      </div>
                    ) : null}
                    <div className="row justify-content-around my-2">
                      <div className="col-5">
                        <strong>Días Pagos:</strong>
                      </div>
                      <div className="col-5">
                        <span className="text-success">
                          {ventaDetail.pagos_realizados}
                        </span>
                      </div>
                    </div>
                    <div className="row justify-content-around my-2">
                      <div className="col-5">
                        <strong>Días Faltantes:</strong>
                      </div>
                      <div className="col-5">
                        <span className="text-danger">
                          {ventaDetail.pagos_pendientes}
                        </span>
                      </div>
                    </div>
                    <div className="row justify-content-around my-2">
                      <div className="col-5">
                        <strong>Fecha Vencimiento:</strong>
                      </div>
                      <div className="col-5">
                        <span className="text-danger">
                          {ventaDetail.fecha_vencimiento}
                        </span>
                      </div>
                    </div>
                    <div className="row justify-content-around my-2">
                      <div className="col-5">
                        <strong>Estado de la Venta:</strong>
                      </div>
                      <div className="col-5">
                        {ventaDetail.estado_venta === "Vencido" ? (
                          <span className="badge rounded-pill bg-danger">
                            {ventaDetail.estado_venta}
                          </span>
                        ) : ventaDetail.estado_venta === "Atrasado" ? (
                          <span className="badge rounded-pill bg-warning">
                            {ventaDetail.estado_venta}
                          </span>
                        ) : ventaDetail.estado_venta === "Vigente" ? (
                          <span className="badge rounded-pill bg-success">
                            {ventaDetail.estado_venta}
                          </span>
                        ) : (
                          <span className="badge rounded-pill bg-secondary">
                            {ventaDetail.estado_venta}
                          </span>
                        )}
                      </div>
                    </div>
                    {ventaDetail.estado_venta === "Perdida" ? (
                      <div className="row justify-content-around my-2">
                        <div className="col-5">
                          <strong>Valor Pérdida:</strong>
                        </div>
                        <div className="col-5">
                          <span className="badge rounded-pill bg-danger">
                            {ventaDetail.perdida}
                          </span>
                        </div>
                      </div>
                    ) : null}
                    {ventaDetail.comentario ? (
                      <div className="row justify-content-around my-2">
                        <div className="col-5">
                          <strong>Comentario:</strong>
                        </div>
                        <div className="col-5">
                          <span className="text-secondary">
                            {ventaDetail.comentario}
                          </span>
                        </div>
                      </div>
                    ) : null}

                    {ventaDetail.dias_atrasados < 0 ? (
                      <div className="row justify-content-around my-2">
                        <div className="col-5">
                          <strong>Pagos Adelantados:</strong>
                        </div>
                        <div className="col-5">
                          <span className="badge rounded-pill bg-success">
                            {Math.abs(ventaDetail.dias_atrasados)}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="row justify-content-around my-2">
                        <div className="col-5">
                          <strong>Pagos Atrasados:</strong>
                        </div>
                        <div className="col-5">
                          <span className="badge rounded-pill bg-danger">
                            {ventaDetail.dias_atrasados}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="row justify-content-around my-2">
                      <div className="col-5">
                        <strong>Promedio de Pago:</strong>
                      </div>
                      <div className="col-5">
                        <span className="badge rounded-pill bg-primary">
                          {ventaDetail.promedio_pago}
                        </span>
                      </div>
                    </div>
                    <div className="row justify-content-around my-2">
                      <div className="col-5">
                        <strong>Total Abonado:</strong>
                      </div>
                      <div className="col-5">
                        <span className="badge rounded-pill bg-success">
                          {ventaDetail.total_abonado}
                        </span>
                      </div>
                    </div>
                    
                    {user.is_staff || user.is_superuser ?(
                      <div className="card-footer d-flex flex-wrap justify-content-around">
                        {recaudos.length > 0 ? null : (
                          <Link
                            to={"/ventas/update/"}
                            className="btn btn-warning mb-2"
                          >
                            Actualizar
                          </Link>
                        )}
                        <Link
                          to={"/ventas/delete/"}
                          className="btn btn-danger mb-2"
                        >
                          Eliminar
                        </Link>
                        <Link to="/ventas/" className="btn btn-secondary mb-2">
                          Lista Ventas
                        </Link>
                      </div>
                    ):(
                      null
                    )}

                    {user.is_staff || user.is_superuser ? (
                      <div className="d-flex justify-content-center">
                        <Link
                          to={"/ventas/perdida/"}
                          className="btn btn-outline-danger"
                        >
                          Pérdida
                        </Link>
                      </div>
                    ) : null}
                  </>
                )}
              </div>

              {/* ABONOS */}
              <div
                className="tab-pane fade show"
                id="abonosVenta"
                role="tabpanel"
              >
                <h3 className="text-center">
                  Total Abonado:{" "}
                  <span className="badge rounded-pill bg-success">
                    {recaudos.message ? 0 : totalRecaudosVenta()}
                  </span>
                </h3>
                <div className="text-center mb-1">
                  <span className="badge rounded-pill text-bg-light text-center">
                    # Pagos {recaudos.length}
                  </span>
                </div>
                {recaudos.message ? (
                  <AlertMessage message="No existen abonos en la venta" />
                ) : (
                  <>
                    {recaudos.map((recaudo) => (
                      <RecaudosVentaDetailListItem
                        key={recaudo.id}
                        recaudo={recaudo}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VentasDetailPage;
