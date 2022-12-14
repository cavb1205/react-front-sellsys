import React, { useContext } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { TiendaContext } from '../../context/TiendaContext'

const CierreCajaModalDelete = () => {
    const {
        openModalDelete,
        openModalDeleteCierre,
        cierre,
        deleteCierresCaja,
    } = useContext(TiendaContext)
  return (
    <Modal isOpen={openModalDelete} toggle={openModalDeleteCierre}>
        <ModalHeader toggle={openModalDeleteCierre}>
            Eliminar Cierre Caja
        </ModalHeader>
        <ModalBody>
            Esta seguro que desea eliminar el cierre de caja {cierre.valor} ?
        </ModalBody>
        <ModalFooter>
            <button onClick={()=>deleteCierresCaja(cierre.id)} className='btn btn-danger'>Eliminar</button>
            <button onClick={openModalDeleteCierre} className='btn btn-secondary'>Cancelar</button>
        </ModalFooter>
    </Modal>
  )
}

export default CierreCajaModalDelete