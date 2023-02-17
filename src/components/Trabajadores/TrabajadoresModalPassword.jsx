import React, { useContext } from "react";
import {
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { TrabajadoresContext } from "../../context/TrabajadoresContext";
import AlertError from "../Utils/AlertError";

const TrabajadoresModalPassword = () => {
  const {
    openModalPassword,
    openModalPasswordTrabajador,
    passwordUpdate,
    error,
    handleChangePassword,
    trabajadorUpdatePassword,
  } = useContext(TrabajadoresContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    trabajadorUpdatePassword();
  };

  return (
    <Modal isOpen={openModalPassword} toggle={openModalPasswordTrabajador}>
      <ModalHeader toggle={openModalPasswordTrabajador}>
        Cambiar Contraseña
        {error && <AlertError error={error} />}
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Nueva Contraseña</label>
            <input
              onChange={handleChangePassword}
              type="password"
              name="passwordNuevo"
              value={passwordUpdate.passwordNuevo}
              className="form-control"
              required
            />
          </FormGroup>
          <ModalFooter>
            <button type="submit" className="btn btn-success">
              Cambiar Contraseña
            </button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default TrabajadoresModalPassword;
