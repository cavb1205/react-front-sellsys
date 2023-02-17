import React, { useContext } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

import { TrabajadoresContext } from '../../context/TrabajadoresContext'

const TrabajadorModalDelete = () => {
  const {
    openModalDelete,
    trabajador,
    trabajadorDeleteItem,
    openModalDeleteTrabajador

  } = useContext(TrabajadoresContext)

  return (
    <Modal isOpen={openModalDelete} toggle={openModalDeleteTrabajador}>
      <ModalHeader toggle={openModalDeleteTrabajador}>
        Eliminar Trabajador {trabajador.id}
      </ModalHeader>
      <ModalBody>
        Esta seguro que desea eliminar el trabajador <strong className='text-capitalize'>{trabajador.first_name} {trabajador.last_name}</strong>?
      </ModalBody>
      <ModalFooter>
        <button onClick={trabajadorDeleteItem} className='btn btn-danger'>Confirmar</button>
        <button onClick={openModalDeleteTrabajador} className='btn btn-secondary'>Cancelar</button>
      </ModalFooter>
    </Modal>
  )
}

export default TrabajadorModalDelete
