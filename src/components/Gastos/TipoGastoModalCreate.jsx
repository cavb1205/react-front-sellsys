import React, { useContext } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  Label,
} from "reactstrap";
import { GastosContext } from "../../context/GastosContext";

const TipoGastoModalCreate = () => {
  const {
    openModalCreateTipoGasto,
    openModalTipoGasto,
    setNewTipoGasto,
    newTipoGasto,
    tipoGastoCreate,
  } = useContext(GastosContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    tipoGastoCreate();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTipoGasto({
      ...newTipoGasto,
      [name]: value,
    });
  };

  return (
    <Modal isOpen={openModalTipoGasto} toggle={openModalCreateTipoGasto}>
      <ModalHeader toggle={openModalCreateTipoGasto}>
        Crear Tipo de Gasto
      </ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <Label>Tipo de Gasto</Label>
          <Input
            onChange={handleChange}
            value={newTipoGasto?.tipoGasto}
            name="tipo_gasto"
            type="text"
            required
          />
        </ModalBody>
        <ModalFooter>
          <button type="submit" className="btn btn-success">
            Crear
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default TipoGastoModalCreate;
