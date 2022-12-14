import React, { useContext } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { VentasContext } from '../../context/VentasContext'


const VentasModalRecaudosDetail = () => {
    const {
        openModalDetailRecaudoItem,
        setOpenModalDetailRecaudoItem,
        recaudo,
        openModalDeleteRecaudo,
        openModalUpdateRecaudo,
        }=useContext(VentasContext)
  return (
    <Modal isOpen={openModalDetailRecaudoItem} toggle={()=>setOpenModalDetailRecaudoItem(!openModalDetailRecaudoItem)} >
        <ModalHeader toggle={()=>setOpenModalDetailRecaudoItem(!openModalDetailRecaudoItem)}>
            Recaudo
        </ModalHeader>
        <ModalBody>
            <p><strong>Fecha Recaudo:</strong> {recaudo.fecha_recaudo} </p>
            <p><strong>Valor Recaudo:</strong> {recaudo.valor_recaudo} </p>
        </ModalBody>
        <ModalFooter>
            <button onClick={null} className='btn btn-danger'>Eliminar</button>
            <button onClick={null} className='btn btn-warning'>Actuatilizar</button>
            <button onClick={()=>setOpenModalDetailRecaudoItem(!openModalDetailRecaudoItem)} className='btn btn-secondary'>Cerrar</button>
        </ModalFooter>
    </Modal>
  )
}

export default VentasModalRecaudosDetail