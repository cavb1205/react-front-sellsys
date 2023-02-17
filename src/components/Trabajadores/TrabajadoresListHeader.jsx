import React from "react";
import Search from "../Utils/Search";

const TrabajadoresListHeader = ({ trabajadores }) => {
  return (
    <div className="text-center mb-4">
      <h1>Trabajadores</h1>
      {trabajadores.message ? (
        <p className="badge rounded-pill text-bg-secondary">
          Total Trabajadores: 0
        </p>
      ) : (
        <p className="badge rounded-pill text-bg-secondary">
          Total Trabajadores: {trabajadores.length}
        </p>
      )}
      <Search />
    </div>
  );
};

export default TrabajadoresListHeader;
