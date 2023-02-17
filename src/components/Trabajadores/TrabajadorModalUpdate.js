import React, { useContext } from 'react'
import { TrabajadoresContext } from '../../context/TrabajadoresContext'
import { Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Label, Input } from 'reactstrap'

const TrabajadorModalUpdate = () => {
  const {
    openModalUpdate,
    trabajador,
    handleChangeUpdate,
    trabajadorUpdateItem,
    openModalUpdateTrabajador
  } = useContext(TrabajadoresContext)

  const handleSubmit = (event) => {
    event.preventDefault()
    trabajadorUpdateItem()
  }

  return (

    <Modal isOpen={openModalUpdate} toggle={openModalUpdateTrabajador}>
      <ModalHeader toggle={openModalUpdateTrabajador}>
        Editar Trabajador
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Nombre de Usuario</Label>
            <Input onChange={handleChangeUpdate} value={trabajador.username} name='username' type='text' className='form-control' disabled />
          </FormGroup>
          <FormGroup>
            <Label># Identificación</Label>
            <Input onChange={handleChangeUpdate} value={trabajador.identificacion} name='identificacion' type='text' className='form-control' required />
          </FormGroup>
          <FormGroup>
            <Label>Nombres</Label>
            <Input onChange={handleChangeUpdate} value={trabajador.first_name} name='first_name' type='text' className='form-control' required />
          </FormGroup>
          <FormGroup>
            <Label>Apellidos</Label>
            <Input onChange={handleChangeUpdate} value={trabajador.last_name} name='last_name' type='text' className='form-control' required />
          </FormGroup>
          <FormGroup>
            <Label>Teléfono</Label>
            <Input onChange={handleChangeUpdate} value={trabajador.telefono} name='telefono' type='text' className='form-control' required />
          </FormGroup>
          <FormGroup>
            <Label>Dirección</Label>
            <Input onChange={handleChangeUpdate} value={trabajador.direccion} name='direccion' type='text' className='form-control' required />
          </FormGroup>
          <FormGroup>
            <Label>Estado Activo</Label>
            <Input onChange={handleChangeUpdate} value checked={!!trabajador.is_active} name='is_active' type='checkbox' className='form-control' />
          </FormGroup>
          <ModalFooter>
            <button type='submit' className='btn btn-success'>Actualizar</button>
            <button onClick={openModalUpdateTrabajador} className='btn btn-secondary'>Cancelar</button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default TrabajadorModalUpdate
