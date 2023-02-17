import React, { useContext } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { GastosContext } from '../../context/GastosContext'

const GastosModalDelete = () => {
  const {
    gasto,
    openModalDelete,
    gastoDeleteItem,
    openModalDeleteGasto
  } = useContext(GastosContext)
  return (
    <Modal isOpen={openModalDelete} toggle={openModalDeleteGasto}>
      <ModalHeader toggle={openModalDeleteGasto}>
        Eliminar Gasto De {gasto.valor}
      </ModalHeader>
      <ModalBody>
        Esta seguro que desea eliminar el gasto de <strong className='text-secondary'>{gasto.tipo_gasto?.tipo_gasto}</strong>?
      </ModalBody>
      <ModalFooter>
        <Button onClick={gastoDeleteItem} color='danger'>Confirmar</Button>
        <Button onClick={openModalDeleteGasto} color='secondary'>Cancelar</Button>
      </ModalFooter>
    </Modal>
  )
}

export default GastosModalDelete
