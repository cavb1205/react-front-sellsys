import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { RecaudosContext } from "../../context/RecaudosContext";
import AlertLoading from "../Utils/AlertLoading";
import { AuthContext } from "../../context/AuthContext";

const RecaudosDetail = () => {
  const { recaudoId } = useParams();

  const { getRecaudo, recaudo, loading } = useContext(RecaudosContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getRecaudo(recaudoId);
  }, []);
  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : (
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <div className="card-body">
            <div className="text-center text-secondary text-capitalize">
              <Link
                className="text-secondary text-decoration-none btn btn-outline-secondary"
                to={`/ventas/${recaudo.venta?.id}/`}
              >
                <h2>
                  {recaudo.venta?.cliente.nombres}{" "}
                  {recaudo.venta?.cliente.apellidos}
                </h2>
              </Link>
            </div>
            <div className="text-center">
              <span className="badge rounded-pill text-bg-light">
                {recaudo.fecha_recaudo}
              </span>
            </div>
            <div className="text-center text-success">
              <strong>{recaudo.valor_recaudo}</strong>
            </div>
            <div className="text-center">
              <span className="badge rounded-pill text-bg-light">
                {recaudo.visita_blanco?.tipo_falla}
              </span>
              {recaudo.visita_blanco?.comentario ? (
                <p>Comentario: {recaudo.visita_blanco?.comentario}</p>
              ) : null}
            </div>
            {user.is_staff || user.is_superuser ?(
              <div className="d-flex justify-content-evenly m-3">
                <Link to={"/recaudos/update/"} className="btn btn-warning">
                  Actualizar
                </Link>
                <Link to={"/recaudos/delete/"} className="btn btn-danger">
                  Eliminar
                </Link>
              </div>
            ):(
              null
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecaudosDetail;
