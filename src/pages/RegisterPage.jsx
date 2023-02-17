import React, { useState } from "react";
import { URL } from "../config";
import { useNavigate } from "react-router-dom";
import AlertError from "../components/Utils/AlertError";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [userRegister, setUserRegister] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    nombre_ruta: "",
  });

  const [error, setError] = useState(null);

  const registerCreate = async () => {
    try {
      const response = await fetch(`${URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userRegister),
      });
      const data = await response.json();
      if (response.status === 200) {
        alert("Usuario creado con éxito.");
        navigate("/login/");
      } else {
        console.log("no se pudo crear el usuario");
        setError(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registerCreate();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserRegister({
      ...userRegister,
      [name]: value,
    });
  };

  return (
    <div className="container-sm">
      <div className="card shadow-lg p-3 mb-5 bg-body rounded">
        <div className="card-body">
          <h2 className="text-secondary text-center">Registro Rutas</h2>
          {error ? <AlertError error={error} /> : null}
          <div>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label>Nombre Usuario</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="username"
                  className="form-control"
                  required
                />
              </div>

              <div className=" mb-2">
                <label>Nombres</label>
                <input
                  onChange={handleChange}
                  name="first_name"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-2">
                <label>Apellidos</label>
                <input
                  onChange={handleChange}
                  name="last_name"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-2">
                <label>Correo</label>
                <input
                  onChange={handleChange}
                  name="email"
                  type="email"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-2">
                <label>Contraseña</label>
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-2">
                <label>Nombre Ruta</label>
                <input
                  onChange={handleChange}
                  name="nombre_ruta"
                  type="text"
                  className="form-control"
                  required
                />
              </div>

              <div className="d-grid gap-2 col-6 mx-auto">
                <button className="btn btn-success" type="submit">
                  Crear Ruta
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
