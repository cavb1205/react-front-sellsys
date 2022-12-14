import React, { useContext } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { VentasContext } from '../../context/VentasContext'

const VentasModalDelete = () => {
    const {
        ventaDetail,
        openModalDelete,
        openModalDeleteVenta,
        ventaDeleteItem
    } = useContext(VentasContext)
  return (
    <Modal isOpen={openModalDelete} toggle={openModalDeleteVenta}>
        <ModalHeader toggle={openModalDeleteVenta}>
            Eliminar Venta 
        </ModalHeader>
        <ModalBody>
            {ventaDetail.cliente?
            <span>Esta seguro que desea eliminar la venta de <strong>{ventaDetail.cliente.nombres} {ventaDetail.cliente.apellidos}</strong></span>:null
            }
            
            <span> Con el valor de venta de: <strong>{ventaDetail.valor_venta}</strong> ?</span>
        </ModalBody>
        <ModalFooter>
            <button onClick={ventaDeleteItem} className='btn btn-danger'>Eliminar</button>
            <button onClick={openModalDeleteVenta} className='btn btn-secondary'>Cancelar</button>
        </ModalFooter>
    </Modal>
  )
}

export default VentasModalDelete