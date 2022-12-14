import React, { useContext } from 'react';
import { AportesContext } from '../../context/AportesContext';
import { Modal, ModalHeader,Button,ModalBody,ModalFooter } from 'reactstrap';

const AportesModalDelete = () => {
    const {
        openModalDelete,
        aporteId,
        aporteDeleteItem,
        openModalDeleteAporte
    } = useContext(AportesContext)
    console.log(aporteId)
  return (
    <Modal isOpen={openModalDelete} toggle={openModalDeleteAporte}>
        <ModalHeader toggle={openModalDeleteAporte}>
            Eliminar Aporte por {aporteId.valor}
        </ModalHeader>
        <ModalBody>
            Esta seguro que desea eliminar el aporte de <strong className='text-secondary'>{aporteId.trabajador?.trabajador} </strong> ?
        </ModalBody>
        <ModalFooter>
            <Button onClick={aporteDeleteItem} color="danger">Confirmar</Button>
            <Button onClick={openModalDeleteAporte} color="secondary">Cancelar</Button>
        </ModalFooter>
    </Modal>
  )
}

export default AportesModalDelete