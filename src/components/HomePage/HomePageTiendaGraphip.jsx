import React, { useContext, useEffect } from "react";

import useTotalResume from "../../hooks/useTotalResume";

import HomePageResume from "./HomePageResume";
import { AportesContext } from "../../context/AportesContext";
import { GastosContext } from "../../context/GastosContext";
import { UtilidadesContext } from "../../context/UtilidadesContext";
import { RecaudosContext } from "../../context/RecaudosContext";
import { VentasContext } from "../../context/VentasContext";
import useDateFilter from "../../hooks/useDateFilter";

const HomePageTiendaGraphip = () => {
  const { aportes } = useContext(AportesContext);
  const { gastos } = useContext(GastosContext);
  const { utilidades } = useContext(UtilidadesContext);
  const { getRecaudosFecha, recaudos } = useContext(RecaudosContext);
  const { allVentas } = useContext(VentasContext);

  const { dateChange, fecha } = useDateFilter();

  const { itemsDia, itemsMes, itemsAño } = useTotalResume();

  useEffect(()=>{
    getRecaudosFecha(fecha)
  },[fecha])

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
          <h5 className="text-secondary text-center">
            Resumen Día{" "}
            <span className="badge rounded-pill text-bg-light">
              <input value={fecha} onChange={dateChange} type="date" />
            </span>
          </h5>
          <HomePageResume
            aportes={itemsDia(aportes, "aportes", fecha)}
            gastos={itemsDia(gastos, "gastos", fecha)}
            utilidades={itemsDia(utilidades, "utilidades", fecha)}
            recaudos={itemsDia(recaudos, "recaudos", fecha)}
            ventasNetas={itemsDia(allVentas, "ventasNetas", fecha)}
            dia={true}
          />
        </div>

        <div className="tab-pane fade show" id="mes" role="tabpanel">
          <h5 className="text-secondary text-center">
            Resumen Mes {new Date(fecha).getUTCMonth() + 1}{" "}
            <span className="badge rounded-pill text-bg-light">
              <input value={fecha} onChange={dateChange} type="month" />
            </span>{" "}
          </h5>
          <p className="text-secondary text-center" />
          <HomePageResume
            ventasNetas={itemsMes(allVentas, "ventasNetasMes", fecha)}
            aportes={itemsMes(aportes, "aportesMes", fecha)}
            gastos={itemsMes(gastos, "gastosMes", fecha)}
            utilidades={itemsMes(utilidades, "utilidadesMes", fecha)}
          />
        </div>

        <div className="tab-pane fade show" id="año" role="tabpanel">
          <h5 className="text-secondary text-center">
            Resumen Año {new Date(fecha).getUTCFullYear()}
            <span className="badge rounded-pill text-bg-light">
              <input value={fecha} onChange={dateChange} type="month" />
            </span>{" "}
          </h5>
          <HomePageResume
            aportes={itemsAño(aportes, "aportesAño", fecha)}
            gastos={itemsAño(gastos, "gastosAño", fecha)}
            utilidades={itemsAño(utilidades, "utilidadesAño", fecha)}
            ventasNetas={itemsAño(allVentas, "ventasNetasAño", fecha)}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePageTiendaGraphip;