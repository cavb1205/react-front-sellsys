import React from "react";

import HomePageResume from "./HomePageResume";
import useDateFilter from "../../hooks/useDateFilter";

const HomePageTiendaGraphip = ({ infoTienda }) => {
  const { fecha } = useDateFilter();

  return (
    <div className="card rounded-3 overflow-hidden shadow">
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <a
              className="nav-link active"
              aria-current="true"
              id="dia-tab"
              data-bs-toggle="tab"
              data-bs-target="#dia"
            >
              Día
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              aria-current="true"
              id="mes-tab"
              data-bs-toggle="tab"
              data-bs-target="#mes"
            >
              Mes
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              aria-current="true"
              id="año-tab"
              data-bs-toggle="tab"
              data-bs-target="#año"
            >
              Año
            </a>
          </li>
        </ul>
      </div>
      <div className="card-body tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="dia" role="tabpanel">
          <h5 className="text-secondary text-center">Resumen Día {fecha}</h5>
          <HomePageResume
            aportes={infoTienda.aportes_dia}
            gastos={infoTienda.gastos_dia}
            utilidades={infoTienda.utilidades_dia}
            ventasNetas={infoTienda.ventas_netas_dia}
            recaudos={
              infoTienda.recaudos_dia === 0 ? "0" : infoTienda.recaudos_dia
            }
          />
        </div>

        <div className="tab-pane fade show" id="mes" role="tabpanel">
          <h5 className="text-secondary text-center">Resumen Mes</h5>
          <p className="text-secondary text-center" />
          <HomePageResume
            ventasNetas={infoTienda.ventas_netas_mes}
            aportes={infoTienda.aportes_mes}
            gastos={infoTienda.gastos_mes}
            utilidades={infoTienda.utilidades_mes}
          />
        </div>

        <div className="tab-pane fade show" id="año" role="tabpanel">
          <h5 className="text-secondary text-center">
            Resumen Año {new Date(fecha).getUTCFullYear()}
          </h5>
          <HomePageResume
            aportes={infoTienda.aportes_ano}
            gastos={infoTienda.gastos_ano}
            utilidades={infoTienda.utilidades_ano}
            ventasNetas={infoTienda.ventas_netas_ano}
            perdidas={
              infoTienda.perdidas_ano === 0 ? "0" : infoTienda.perdidas_ano
            }
          />
        </div>
      </div>
    </div>
  );
};

export default HomePageTiendaGraphip;
