import React from "react";

const ResumenFechasItem = ({name, list}) => {
  const color = name === "Ventas Netas" ? "secondary" : name === "Intereses por Ventas" ? "primary" : name === "Pérdidas" ? "danger" : name === "Utilidades" ? "success" : name === "Gastos" ? "warning" : "info"
  return (
    <div
      className="card text-center shadow p-3 bg-body-tertiary rounded"
      style={{ width: "30%" }}
    >
      <h5 className={`text-${color}`}>{name}</h5>
      <h6 className="text-secondary">{list}</h6>
      <h6 className="text-secondary">Total 25000000</h6>
    </div>
  );
};

export default ResumenFechasItem;
