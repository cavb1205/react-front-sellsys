import React, { useContext } from "react";
import {
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { RecaudosContext } from "../../context/RecaudosContext";

const RecaudosModalCreate = () => {
  const {
    openModalCreate,
    openModalCreateRecaudo,
    venta,
    newRecaudo,
    handleChange,
    recaudosCreateItem,
  } = useContext(RecaudosContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    recaudosCreateItem();
  };

  return (
    <Modal isOpen={openModalCreate} toggle={openModalCreateRecaudo}>
      <form onSubmit={handleSubmit}>
        <ModalHeader toggle={openModalCreateRecaudo}>
          Agregar Abono a {venta.cliente?.nombres} {venta.cliente?.apellidos}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Fecha Abono:</Label>
            <Input
              onChange={handleChange}
              type="date"
              name="fecha_recaudo"
              value={newRecaudo.fecha_recaudo}
              className="form-control"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Valor:</Label>
            <Input
              onChange={handleChange}
              type="number"
              name="valor_recaudo"
              value={newRecaudo.valor_recaudo}
              className="form-control"
              required
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <button type="submit" className="btn btn-success">
            Confirmar
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default RecaudosModalCreate;
