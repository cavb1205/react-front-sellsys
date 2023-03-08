import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { TrabajadoresContext } from "../../context/TrabajadoresContext";
import AlertLoading from "../Utils/AlertLoading";
import AlertError from "../Utils/AlertError";
import TrabajadorModalDelete from "./TrabajadorModalDelete";
import TrabajadorModalUpdate from "./TrabajadorModalUpdate";
import { AuthContext } from "../../context/AuthContext";
import TrabajadoresModalPassword from "./TrabajadoresModalPassword";

const TrabajadorDetail = () => {
  const { user } = useContext(AuthContext);
  const {
    trabajador,
    getTrabajador,
    loading,
    error,
    openModalDeleteTrabajador,
    openModalUpdateTrabajador,
    openModalPasswordTrabajador,
  } = useContext(TrabajadoresContext);

  const { trabajadorId } = useParams();

  useEffect(() => {
    getTrabajador(trabajadorId);
  }, []);
  console.log(trabajador);
  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ) : error ? (
        <AlertError error="Error al cargar la información. intente de nuevo." />
      ) : (
        <div className="card shadow">
          <div className="card-header">
            <h2 className="text-secondary text-capitalize text-center">
              {trabajador.first_name} {trabajador.last_name}
            </h2>
          </div>
          <div className="card-body">
            <div className="row justify-content-around my-2">
              <div className="col-5">
                <h5 className="text-secondary">Username:</h5>
              </div>
              <div className="col-5">
                <h5 className="text-secondary"> {trabajador.username}</h5>
              </div>
            </div>
            <div className="row justify-content-around my-2">
              <div className="col-5">
                <p>
                  <strong>Identificación:</strong>
                </p>
              </div>
              <div className="col-5">
                <p className="text-secondary"> {trabajador.identificacion}</p>
              </div>
            </div>
            <div className="row justify-content-around my-2">
              <div className="col-5">
                <p>
                  <strong>Teléfono:</strong>
                </p>
              </div>
              <div className="col-5">
                <p className="text-secondary">{trabajador.telefono}</p>
              </div>
            </div>
            <div className="row justify-content-around my-2">
              <div className="col-5">
                <p>
                  <strong>Dirección:</strong>
                </p>
              </div>
              <div className="col-5">
                <p className="text-secondary">{trabajador.direccion}</p>
              </div>
            </div>
            <div className="row justify-content-around my-2">
              <div className="col-5">
                <p>
                  <strong>Email:</strong>
                </p>
              </div>
              <div className="col-5">
                <p className="text-secondary">{trabajador.email}</p>
              </div>
            </div>
            <div className="row justify-content-around my-2">
              <div className="col-5">
                <p>
                  <strong>Estado:</strong>
                </p>
              </div>
              <div className="col-5">
                {trabajador.is_active ? (
                  <span className="badge rounded-pill text-bg-success">
                    Activo
                  </span>
                ) : (
                  <span className="badge rounded-pill text-bg-danger">
                    Inactivo
                  </span>
                )}
              </div>
              <div className="col-5">
                <p>
                  <strong>Perfil:</strong>
                </p>
              </div>
              <div className="col-5">
                {trabajador.is_staff ? (
                  <span className="badge rounded-pill text-bg-success">
                    Administrador
                  </span>
                ) : (
                  <span className="badge rounded-pill text-bg-success">
                    Trabajador
                  </span>
                )}
              </div>
            </div>
            <div className="row justify-content-around my-2">
              <div className="col-5">
                <p>
                  <strong>Fecha Creación:</strong>
                </p>
              </div>
              <div className="col-5">
                <p className="text-secondary">
                  {trabajador.date_joined?.split("T")[0]}
                </p>
              </div>
            </div>
          </div>
          {user.username === trabajador.username ? (
            <div className="text-center">
              <button
                onClick={openModalPasswordTrabajador}
                className="btn btn-outline-primary m-3"
              >
                Cambiar Contraseña
              </button>
            </div>
          ) : null}
          {user.is_staff ? (
            <div className="card-footer text-center">
              <Link to="/trabajadores/">
                <button className="btn btn-secondary m-1" color="secondary">
                  Lista Trabajadores
                </button>
              </Link>
              <button
                onClick={openModalUpdateTrabajador}
                className="btn btn-warning m-1"
              >
                Actualizar
              </button>
              <button
                onClick={openModalDeleteTrabajador}
                className="btn btn-danger m-1"
              >
                Eliminar
              </button>
            </div>
          ) : null}
        </div>
      )}
      <TrabajadorModalUpdate />
      <TrabajadorModalDelete />
      <TrabajadoresModalPassword />
    </div>
  );
};

export default TrabajadorDetail;
