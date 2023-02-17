import React, { useContext } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { UtilidadesContext } from '../../context/UtilidadesContext'

const UtilidadesModalDelete = () => {
  const {
    utilidad,
    openModalDelete,
    openModalDeleteUtilidad,
    utilidadDeleteItem
  } = useContext(UtilidadesContext)
  return (
    <Modal isOpen={openModalDelete} toggle={openModalDeleteUtilidad}>
      <ModalHeader toggle={openModalDeleteUtilidad}>
        Eliminar Utiliidad De {utilidad.valor}
      </ModalHeader>
      <ModalBody>
        Esta seguro que desea eliminar la utilidad de <strong className='text-secondary text-capitalize'>{utilidad.trabajador?.trabajador}</strong> ?
      </ModalBody>
      <ModalFooter>
        <button onClick={utilidadDeleteItem} className='btn btn-danger'>Eliminar</button>
        <button onClick={openModalDeleteUtilidad} className='btn btn-secondary'>Cancelar</button>
      </ModalFooter>
    </Modal>
  )
}

export default UtilidadesModalDelete
