import React, { useContext } from "react";
import { TiendaContext } from "../../context/TiendaContext";

const HomePageTiendaInfo = () => {
  const { tienda } = useContext(TiendaContext);

  return (
    <div className="container-sm">
      
      <div className="card shadow-lg p-3 mb-5 bg-body rounded">
        <h3 className="card-header text-center text-secondary">Información de la Ruta</h3>
        <div className="card-body">
          <div className="alert alert-light">
            <h2 className="text-secondary text-center">
              {tienda.tienda?.nombre}
            </h2>

            <p className="card-text">Teléfono: {tienda.tienda?.telefono}</p>
            <p>Administrador: {tienda.tienda?.administrador}</p>
            <p className="card-text">
              Estado:{" "}
              {tienda.tienda?.estado ? (
                <span className="badge rounded-pill text-bg-success">Activa</span>
              ) : (
                <span className="badge rounded-pill text-bg-danger">Inactiva</span>
              )}
            </p>
          </div>

          <div>
            <h2 className="text-secondary text-center">Suscripción</h2>
            <div className="alert alert-light">
              <p>Suscripción Actual: {tienda.membresia?.nombre}</p>
              <p>Precio: {tienda.membresia?.precio}</p>
              <p>
                Estado Suscripción:{" "}
                {tienda.estado === "Vencida" ? (
                  <span className="badge bg-danger">{tienda.estado}</span>
                ) : tienda.estado === "Pendiente Pago" ? (
                  <span className="badge bg-warning">{tienda.estado}</span>
                ) : (
                  <span className="badge bg-success">{tienda.estado}</span>
                )}
              </p>
              <p>
                Fecha Activación:{" "}
                <span className="badge bg-success">
                  {tienda.fecha_activacion}
                </span>
              </p>
              <p>
                Fecha Vencimiento:{" "}
                <span className="badge bg-danger">
                  {tienda.fecha_vencimiento}
                </span>
              </p>
            </div>

            <p className="alert alert-primary">
              Para activar la cuenta comunicarse al WhatsApp{" "}
              <a
                href="https://api.whatsapp.com/send?phone=56963511337"
                target="_blank"
                rel="noreferrer"
              >
                +56963511337
              </a>
            </p>
          </div>
        </div>
        <div className="card-footer text-muted text-center">
          Fecha Creación {tienda.tienda?.fecha_registro}
        </div>
      </div>
    </div>
  );
};

export default HomePageTiendaInfo;
