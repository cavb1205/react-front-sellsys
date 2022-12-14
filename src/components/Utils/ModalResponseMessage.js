import React, { useContext } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { VentasContext } from '../../context/VentasContext'

const ModalResponseMessage = ({response,openModalResponse,setOpenModalResponse}) => {
    
  return (
    <Modal isOpen={openModalResponse} toggle={()=>setOpenModalResponse(!openModalResponse)}>
        <ModalHeader toggle={()=>setOpenModalResponse(!openModalResponse)}>

        </ModalHeader>
        <ModalBody className='alert alert-danger'>
            {response.message}
        </ModalBody>
        <ModalFooter>
            <button onClick={()=>setOpenModalResponse(!openModalResponse)} className='btn btn-secondary'>Cerrar</button>
        </ModalFooter>
    </Modal>
  )
}

export default ModalResponseMessage