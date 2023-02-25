import React from "react";

const FechaInput = ({fecha='', dateChange}) => {
  console.log(`fecha es: ${fecha}`)
  return (
    <div className="text-center mb-2">
      <span className="badge bg-primary">
        Fecha:{" "}
        <input onChange={dateChange} value={fecha} type="date" name="fecha" />
      </span>
    </div>
  );
};

export default FechaInput;
