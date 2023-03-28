import React, { useContext, useEffect } from "react";
import { AportesContext } from "../../context/AportesContext";
import { TiendaContext } from "../../context/TiendaContext";
import { TrabajadoresContext } from "../../context/TrabajadoresContext";
import AlertLoading from "../Utils/AlertLoading";

const AportesCreate = () => {
    
  const { aporteCreateItem, newAporte, handleChange, loading } =
    useContext(AportesContext);

  const { selectedStore } = useContext(TiendaContext);

  const { getTrabajadores, trabajadores } = useContext(TrabajadoresContext);
  console.log(newAporte)
  const handleSubmit = (event) => {
    event.preventDefault();
    aporteCreateItem(selectedStore);
  };

  useEffect(() => {
    getTrabajadores(selectedStore);
  }, []);
  return (
    <div className="container-sm">
        {
            loading? <AlertLoading /> :

      <div className="card shadow-lg p-3 mb-5 bg-body rounded">
        <h3 className="card-header text-secondary text-center">Crear Aporte</h3>
        <form onSubmit={handleSubmit}>
            <div className="card-body">
                <div className="mb-3">
                    <label>
                        Fecha <span className="text-danger">*</span>
                    </label>
                    <input
                    onChange={handleChange}
                    value={newAporte.fecha}
                    name="fecha"
                    type="date"
                    className="form-control"
                    id="floatingInput"
                    placeholder="fecha"
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="floatingInput">
                    Valor <span className="text-danger">*</span>
                    </label>
                    <input
                    onChange={handleChange}
                    name="valor"
                    type="number"
                    className="form-control"
                    id="floatingInput"
                    placeholder="valor"
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="floatingInput">Comentario</label>
                    <input
                    onChange={handleChange}
                    name="comentario"
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder=""
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="floatingInput">
                    Aportante <span className="text-danger">*</span>
                    </label>
                    <select
                    onChange={handleChange}
                    value={newAporte.trabajador?.id}
                    name="trabajador"
                    type="select"
                    className="form-control"
                    id="floatingInput"
                    required
                    >
                        <option>Select</option>
                    {trabajadores.map((aportante) => (
                        <option key={aportante.id} value={aportante.id}>
                        {aportante.trabajador}
                        </option>
                    ))}
                    </select>
                </div>
            </div>
            <div className="card-footer text-center">
                <button type="submit" className="btn btn-success btn-lg">
                    Crear
                </button>
            </div>
        </form>
      </div>
        }
    </div>
  );
};

export default AportesCreate;
