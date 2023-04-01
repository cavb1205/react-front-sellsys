import React, { useContext, useEffect } from "react";


import { TrabajadoresContext } from "../../context/TrabajadoresContext";
import AlertError from "../Utils/AlertError";
import AlertLoading from "../Utils/AlertLoading";

const TrabajadoresPassword = () => {
  const {
    trabajador,
    passwordUpdate,
    setPasswordUpdate,
    error,
    handleChangePassword,
    trabajadorUpdatePassword,
    loading,
  } = useContext(TrabajadoresContext);

  useEffect(()=>{
    setPasswordUpdate({'passwordNuevo':''})
  },[])
  
  const handleSubmit = (event) => {
    event.preventDefault();
    trabajadorUpdatePassword(trabajador.id);
  };

  return (
    <div className="container-sm">
      {loading ? (
        <AlertLoading />
      ): (

      <div className="card shadow-lg p-3 mb-5 bg-body rounded">
        <h3 className="card-header text-secondary text-center">Cambiar Contraseña de {trabajador.first_name}</h3>
        {error && <AlertError error={error} />}
      
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <label>Nueva Contraseña</label>
            <input
              onChange={handleChangePassword}
              type="password"
              name="passwordNuevo"
              value={passwordUpdate.passwordNuevo}
              className="form-control"
              required
            />
          </div>
          <div className="card-footer text-center">
            <button type="submit" className="btn btn-success">
              Cambiar Contraseña
            </button>
          </div>
        </form>
      </div>
      )}
    </div>
  );
};

export default TrabajadoresPassword;
