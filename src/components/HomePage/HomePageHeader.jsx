import React from "react";

const HomePageHeader = ({ tienda }) => {
  return (
    <div>
      <h1 className="text-center text-secondary text-capitalize">
        {tienda.nombre}
      </h1>
    </div>
  );
};

export default HomePageHeader;
