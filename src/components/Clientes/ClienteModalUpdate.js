import React, { useContext } from 'react'
import { Modal, ModalHeader, ModalBody, Label, Input, FormGroup, ModalFooter, Button } from 'reactstrap'
import { ClientesContext } from '../../context/ClientesContext'
import AlertError from '../Utils/AlertError'

const ClienteModalUpdate = () => {
  const {
    cliente,
    openModalUpdate,
    handleChangeUpdate,
    openModalUpdateCliente,
    clienteUpdateItem,
    error
  } = useContext(ClientesContext)

  const handleSubmit = (event) => {
    event.preventDefault()
    clienteUpdateItem()
  }

  return (
    <Modal isOpen={openModalUpdate} toggle={openModalUpdateCliente}>
      <ModalHeader toggle={openModalUpdateCliente}>
        Editar Cliente {cliente.nombres} {cliente.apellidos}
        {error ? <AlertError error={error} /> : null}
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label># Identificación</Label>
            <Input onChange={handleChangeUpdate} value={cliente.identificacion} name='identificacion' type='text' className='form-control' id='floatingInput' placeholder='Identificación' required disabled />
          </FormGroup>
          <FormGroup>
            <Label for='floatingInput'>Nombres</Label>
            <Input onChange={handleChangeUpdate} value={cliente.nombres} name='nombres' type='text' className='form-control' id='floatingInput' placeholder='nombres' required />
          </FormGroup>
          <FormGroup>
            <Label for='floatingInput'>Apellidos</Label>
            <Input onChange={handleChangeUpdate} value={cliente.apellidos} name='apellidos' type='text' className='form-control' id='floatingInput' placeholder='Apellidos' required />
          </FormGroup>
          <FormGroup>
            <Label for='floatingInput'>Nombre Local</Label>
            <Input onChange={handleChangeUpdate} value={cliente.nombre_local} name='nombre_local' type='text' className='form-control' id='floatingInput' placeholder='Nombre del local' required />
          </FormGroup>
          <FormGroup>
            <Label for='floatingInput'>Teléfono</Label>
            <Input onChange={handleChangeUpdate} value={cliente.telefono_principal} name='telefono_principal' type='text' className='form-control' id='floatingInput' placeholder='Teléfono principal' required />
          </FormGroup>
          <FormGroup>
            <Label for='floatingInput'>Dirección</Label>
            <Input onChange={handleChangeUpdate} value={cliente.direccion} name='direccion' type='text' className='form-control' id='floatingInput' placeholder='Dirección casa o local' required />
          </FormGroup>
          <FormGroup>
            <Label for='floatingInput'>Estado</Label>
            <Input onChange={handleChangeUpdate} value={cliente.estado_cliente} name='estado_cliente' type='select' className='form-control' id='floatingInput' required>
              <option value='Activo'>Activo</option>
              <option value='Inactivo'>Inactivo</option>
              <option value='Bloqueado'>Bloqueado</option>
            </Input>
          </FormGroup>
          <ModalFooter>
            <Button type='submit' color='success'>Actualizar</Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default ClienteModalUpdate
