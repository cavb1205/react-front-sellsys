import React, { useContext, useEffect } from "react";
import { GastosContext } from "../../context/GastosContext";
import { TiendaContext } from "../../context/TiendaContext";
import { createUtcDateIso } from "../../hooks/useDate";
import AlertLoading from "../Utils/AlertLoading"


const GastosCreate = () => {
  const {
    newGasto,
    setNewGasto,
    handleChange,
    tipoGastos,
    gastoCreateItem,
    getTipoGastos,
    loading
  } = useContext(GastosContext);

  const { selectedStore } = useContext(TiendaContext)

  useEffect(() => {
    getTipoGastos();
    setNewGasto({
      fecha: createUtcDateIso(),
      tipo_gasto: "",
      valor: "",
      comentario: "",
    })
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    gastoCreateItem(selectedStore);
  };
  return (
    <div className="container-sm">
        {
            loading? <AlertLoading /> :

      <div className="card shadow-lg p-3 mb-5 bg-body rounded">
        <h3 className="card-header text-secondary text-center">Crear Gasto</h3>
        <form onSubmit={handleSubmit}>
            <div className="card-body">
                <div className="mb-3">
                    <label>
                        Fecha <span className="text-danger">*</span>
                    </label>
                    <input
                    onChange={handleChange}
                    value={newGasto.fecha}
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
                      Tipo Gasto <span className="text-danger">*</span>
                    </label>
                    <select
                    onChange={handleChange}
                    value={newGasto.tipo_gasto?.id}
                    name="tipo_gasto"
                    type="select"
                    className="form-control"
                    id="floatingInput"
                    required
                    >
                        <option>Select</option>
                    {tipoGastos.map((tipo) => (
                        <option key={tipo.id} value={tipo.id}>
                        {tipo.tipo_gasto}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="floatingInput">
                    Valor <span className="text-danger">*</span>
                    </label>
                    <input
                    onChange={handleChange}
                    name="valor"
                    value={newGasto.valor}
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
                    value={newGasto.comentario}
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    
                    />
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

export default GastosCreate;
