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
import { UtilidadesContext } from "../../context/UtilidadesContext";

const UtilidadesModalUpdate = () => {
  const {
    utilidad,
    openModalUpdate,
    openModalUpdateUtilidad,
    handleChangeUpdate,
    utilidadUpdateItem,
  } = useContext(UtilidadesContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    utilidadUpdateItem();
  };

  return (
    <Modal isOpen={openModalUpdate} toggle={openModalUpdateUtilidad}>
      <ModalHeader toggle={openModalUpdateUtilidad}>
        Editando Utilidad De{" "}
        <span className="text-capitalize">
          {utilidad.trabajador?.trabajador}
        </span>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Fecha</Label>
            <Input
              onChange={handleChangeUpdate}
              value={utilidad.fecha}
              name="fecha"
              type="date"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Valor</Label>
            <Input
              onChange={handleChangeUpdate}
              value={utilidad.valor}
              name="valor"
              type="number"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Comentario</Label>
            <Input
              onChange={handleChangeUpdate}
              value={utilidad.comentario}
              name="comentario"
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label>Socio</Label>
            <Input
              type="text"
              value={utilidad.trabajador?.trabajador}
              onChange={handleChangeUpdate}
              name="trabajador"
              disabled
            />
          </FormGroup>
          <ModalFooter>
            <button type="submit" className="btn btn-success">
              Actualizar
            </button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default UtilidadesModalUpdate;
