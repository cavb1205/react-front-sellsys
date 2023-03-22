import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { URL } from "../config";
import { AuthContext } from "../context/AuthContext";

const TiendasCreateAdmin = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [newTienda, setNewTienda] = useState({
    nombre: "",
    administrador: user.id,
  });
  console.log(newTienda);
  const tiendaCreate = async () => {
    try {
      const response = await fetch(`${URL}/tiendas/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTienda),
      });
      console.log(response);
      if (response.status === 200) {
        alert("Ruta creada con éxito.");
        navigate("/select/");
      } else {
        alert("no se pudo crear la ruta");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTienda({
      ...newTienda,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    tiendaCreate();
  };
  return (
    <div className="container-sm">
      <div className="card shadow-lg p-3 mb-5 bg-body rounded">
        <div className="card-body">
          <h2 className="text-secondary text-center">Crear Ruta</h2>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="input-group my-3">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Nombre Ruta
                </span>
                <input
                  type="text"
                  onChange={handleChange}
                  name="nombre"
                  className="form-control"
                  required
                />
              </div>

              <div className="d-grid gap-2 col-6 mx-auto my-4">
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

export default TiendasCreateAdmin;
