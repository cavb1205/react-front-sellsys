import React, { useContext } from 'react'
import { AportesContext } from '../../context/AportesContext'
import { Modal, ModalBody, ModalFooter, FormGroup, Input, Label, ModalHeader, Button } from 'reactstrap'

const AportesModalUpdate = () => {
  const {
    openModalUpdate,
    handleChangeUpdate,
    aporteId,
    aporteUpdateItem,
    openModalUpdateAporte
  } = useContext(AportesContext)

  const handleSubmit = (event) => {
    event.preventDefault()
    aporteUpdateItem()
  }

  return (
    <Modal isOpen={openModalUpdate} toggle={openModalUpdateAporte}>
      <ModalHeader toggle={openModalUpdateAporte}>
        Editando Aporte de <span className='text-capitalize'>{aporteId.trabajador?.trabajador}</span>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Fecha</Label>
            <Input onChange={handleChangeUpdate} value={aporteId.fecha} name='fecha' type='date' className='form-control' id='floatingInput' placeholder='fecha' />
          </FormGroup>
          <FormGroup>
            <Label for='floatingInput'>Valor</Label>
            <Input onChange={handleChangeUpdate} value={aporteId.valor} name='valor' type='number' className='form-control' id='floatingInput' placeholder='valor' />
          </FormGroup>
          <FormGroup>
            <Label for='floatingInput'>Comentario</Label>
            <Input onChange={handleChangeUpdate} value={aporteId.comentario} name='comentario' type='text' className='form-control' id='floatingInput' placeholder='' />
          </FormGroup>
          <FormGroup>
            <Label for='floatingInput'>Aportante</Label>
            <Input onChange={handleChangeUpdate} value={aporteId.trabajador?.trabajador} name='trabajador' type='text' className='form-control' id='floatingInput' disabled />
          </FormGroup>
          <ModalFooter>
            <Button type='submit' color='success'>Actualizar</Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default AportesModalUpdate
