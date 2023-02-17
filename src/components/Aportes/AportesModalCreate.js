import React, { useContext, useEffect } from 'react'

import { AportesContext } from '../../context/AportesContext'

import { Modal, ModalBody, ModalHeader, ModalFooter, Label, Input, FormGroup, Container } from 'reactstrap'
import { TrabajadoresContext } from '../../context/TrabajadoresContext'

const AportesModalCreate = () => {
  const {
    openModalCreate,
    handleChange,
    newAporte,
    aporteCreateItem,
    openModalCreateAporte
  } = useContext(AportesContext)

  const { getTrabajadores, trabajadores } = useContext(TrabajadoresContext)

  const handleSubmit = (event) => {
    event.preventDefault()
    aporteCreateItem()
  }

  useEffect(() => {
    getTrabajadores()
  }, [])

  return (
    <Modal isOpen={openModalCreate} toggle={openModalCreateAporte}>
      <ModalHeader toggle={openModalCreateAporte}>
        Crear Aporte
      </ModalHeader>
      <ModalBody>
        <Container>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Fecha <span className='text-danger'>*</span></Label>
              <Input onChange={handleChange} value={newAporte.fecha} name='fecha' type='date' className='form-control' id='floatingInput' placeholder='fecha' required />
            </FormGroup>
            <FormGroup>
              <Label for='floatingInput'>Valor <span className='text-danger'>*</span></Label>
              <Input onChange={handleChange} name='valor' type='number' className='form-control' id='floatingInput' placeholder='valor' required />
            </FormGroup>
            <FormGroup>
              <Label for='floatingInput'>Comentario</Label>
              <Input onChange={handleChange} name='comentario' type='text' className='form-control' id='floatingInput' placeholder='' />
            </FormGroup>
            <FormGroup>
              <Label for='floatingInput'>Aportante <span className='text-danger'>*</span></Label>
              <Input onChange={handleChange} value={newAporte.trabajador?.id} name='trabajador' type='select' className='form-control' id='floatingInput' required>
                <option />
                {trabajadores.map((aportante) => (
                  <option key={aportante.id} value={aportante.id}>{aportante.trabajador}</option>
                ))}
              </Input>
            </FormGroup>
            <ModalFooter>
              <button type='submit' className='btn btn-success'>Crear</button>
            </ModalFooter>
          </form>
        </Container>
      </ModalBody>
    </Modal>
  )
}

export default AportesModalCreate
