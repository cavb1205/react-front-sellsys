import React, { useContext } from 'react'
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { GastosContext } from '../../context/GastosContext'

const GastosModalUpdate = () => {
  const {
    gasto,
    gastoUpdateItem,
    handleChangeUpdate,
    openModalUpdate,
    openModalUpdateGasto
  } = useContext(GastosContext)

  const handleSubmit = (event) => {
    event.preventDefault()
    gastoUpdateItem()
  }

  return (
    <Modal isOpen={openModalUpdate} toggle={openModalUpdateGasto}>
      <ModalHeader toggle={openModalUpdateGasto}>
        Editar Gasto De {gasto.tipo_gasto?.tipo_gasto}
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Fecha</Label>
            <Input onChange={handleChangeUpdate} value={gasto.fecha} name='fecha' type='date' className='form-control' id='floatingInput' required />
          </FormGroup>
          <FormGroup>
            <Label for='floatingInput'>Tipo de Gasto</Label>
            <Input onChange={handleChangeUpdate} name='tipo_gasto' value={gasto.tipo_gasto?.tipo_gasto} type='text' className='form-control' id='floatingInput' disabled />

          </FormGroup>
          <FormGroup>
            <Label for='floatingInput'>Valor</Label>
            <Input onChange={handleChangeUpdate} value={gasto.valor} name='valor' type='number' className='form-control' id='floatingInput' required />
          </FormGroup>
          <FormGroup>
            <Label for='floatingInput'>Comentario</Label>
            <Input onChange={handleChangeUpdate} value={gasto.comentario} name='comentario' type='text' className='form-control' id='floatingInput' />
          </FormGroup>
          <ModalFooter>
            <Button type='submit' color='success'>Actualizar</Button>

          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default GastosModalUpdate
