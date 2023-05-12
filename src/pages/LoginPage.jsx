import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AlertError from "../components/Utils/AlertError";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const { loginUser, error } = useContext(AuthContext);

  return (
    
    <div className="container-sm">
      <div className="card shadow-lg p-3 mb-3 bg-body rounded">
        <form onSubmit={loginUser} className='m-2'>
          <h3 className="text-center text-secondary">Ingreso al Sistema</h3>
          {error && <AlertError error={"Usuario o contraseña incorrectos."} />}
          <div className="form-floating mb-3">
            <input
              type="text"
              name="username"
              className="form-control"
              id="floatingInput"
              placeholder="Usuario"
            />
            <label className="text-secondary">Usuario</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              name="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label className="text-secondary">Contraseña</label>
          </div>
          <div className="text-center mt-3">
            <button type="submmit" className="btn btn-success btn-lg">
              Ingresar
            </button>
          </div>
        </form>
       
        <div className="text-center m-4">
          <p className="text-secondary">No tienes una cuenta?</p>
          <Link to={"/register/"}>
            <button type="button" className="btn btn-outline-primary">
              Crear Cuenta
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
