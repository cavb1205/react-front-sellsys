import React, { useContext } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { RecaudosContext } from '../../context/RecaudosContext'

const RecaudosModalDelete = () => {
    const {
        recaudoDeleteItem,
        recaudo,
        openModalDelete,
        setOpenModalDelete,
        openModalDeleteRecaudo,
    } = useContext(RecaudosContext)

  return (
    <Modal isOpen={openModalDelete} toggle={openModalDeleteRecaudo}>
        <ModalHeader toggle={openModalDeleteRecaudo}>
            Eliminar Recaudo
        </ModalHeader>
        <ModalBody>
            Esta seguro que desea eliminar el recaudo de <strong>{recaudo.valor_recaudo}</strong> ?
        </ModalBody>
        <ModalFooter>
            <button onClick={()=>recaudoDeleteItem(recaudo.id, recaudo.venta?.id)} className='btn btn-danger'>Eliminar</button>
            <button onClick={openModalDeleteRecaudo} className='btn btn-secondary'>Cancelar</button>
        </ModalFooter>
    </Modal>
  )
}

export default RecaudosModalDelete