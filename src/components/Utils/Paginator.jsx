import React from "react";

const Paginator = ({prevPage, nextPage}) => {
  return (
    <div className="d-flex justify-content-around mb-4">
      <button onClick={prevPage} className="btn btn-outline-secondary btn-sm">
        Atras
      </button>
      <button onClick={nextPage} className="btn btn-outline-secondary btn-sm">
        Siguiente
      </button>
    </div>
  );
};

export default Paginator