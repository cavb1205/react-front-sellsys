import React, { useContext } from 'react'
import { ModalHeader, Modal,ModalFooter,ModalBody, Button } from 'reactstrap'
import { ClientesContext } from '../../context/ClientesContext'
import AlertError from '../Utils/AlertError'




const ClienteModalDelete = () => {
    const {
        cliente,
        openModalDelete,
        openModalDeleteCliente,
        clienteDeleteItem,
        error,
    }=useContext(ClientesContext)
    
  return (
    <Modal isOpen={openModalDelete}>
        <ModalHeader>
            Eliminar Cliente 
            {error?<AlertError error={error}/>:null}
        </ModalHeader>
        <ModalBody>
            Esta seguro que desea eliminar el cliente <strong className='text-secondary'>{cliente.nombres} {cliente.apellidos} </strong>?
        </ModalBody>
        <ModalFooter>
            <Button   onClick={clienteDeleteItem}   color="danger">Confirmar</Button>
            <Button  onClick={openModalDeleteCliente}    color="secondary">Cancelar</Button>
        </ModalFooter>
    </Modal> 
  )
}

export default ClienteModalDelete