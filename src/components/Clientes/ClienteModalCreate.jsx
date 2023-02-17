import React, { useContext } from "react";
import {
  Input,
  Label,
  ModalBody,
  ModalHeader,
  Modal,
  ModalFooter,
  Button,
  FormGroup,
} from "reactstrap";
import { ClientesContext } from "../../context/ClientesContext";
import AlertError from "../Utils/AlertError";

const ClienteModalCreate = () => {
  const {
    openModalCreate,
    handleChange,
    clienteCreateItem,
    openModalCreateCliente,
    error,
  } = useContext(ClientesContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    clienteCreateItem();
  };

  return (
    <Modal isOpen={openModalCreate} toggle={openModalCreateCliente}>
      <ModalHeader toggle={openModalCreateCliente}>
        Crear Cliente
        {error ? <AlertError error={error} /> : null}
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Identificación</Label>
            <Input
              onChange={handleChange}
              name="identificacion"
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Identificación"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="floatingInput">Nombres</Label>
            <Input
              onChange={handleChange}
              name="nombres"
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="nombres"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="floatingInput">Apellidos</Label>
            <Input
              onChange={handleChange}
              name="apellidos"
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Apellidos"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="floatingInput">Nombre Local</Label>
            <Input
              onChange={handleChange}
              name="nombre_local"
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Nombre del local"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="floatingInput">Teléfono</Label>
            <Input
              onChange={handleChange}
              name="telefono_principal"
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Teléfono principal"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="floatingInput">Dirección</Label>
            <Input
              onChange={handleChange}
              name="direccion"
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Dirección casa o local"
              required
            />
          </FormGroup>
          <ModalFooter>
            <Button type="submit" color="success">
              Crear Cliente
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ClienteModalCreate;
