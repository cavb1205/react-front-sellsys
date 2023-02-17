import React, { useContext } from 'react'
import { FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { RecaudosContext } from '../../context/RecaudosContext'

const RecaudosModalNoPago = () => {
  const {
    venta,
    openModalNoPago,
    setOpenModalNoPago,
    handleChangeNoPago,
    recaudosCreateNoPago
  } = useContext(RecaudosContext)

  return (
    <Modal isOpen={openModalNoPago} toggle={() => setOpenModalNoPago(!openModalNoPago)}>
      <ModalHeader toggle={() => setOpenModalNoPago(!openModalNoPago)}>
        Reportar No Pago a {venta.cliente?.nombres} {venta.cliente?.apellidos}
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Tipo de Falla</Label>
          <Input onChange={handleChangeNoPago} type='select' name='tipo_falla'>
            <option value='Casa o Local Cerrado'>Casa o Local Cerrado</option>
            <option value='Cliente no Tiene Dinero'>Cliente no Tiene Dinero</option>
            <option value='Cliente de Viaje'>Cliente de Viaje</option>
            <option value='Cliente no Aparece'>Cliente no Aparece</option>
            <option value='Cliente Enfermo'>Cliente Enfermo</option>
            <option value='Otro Motivo'>Otro Motivo</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Comentario</Label>
          <Input onChange={handleChangeNoPago} type='textarea' name='comentario' />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <button onClick={recaudosCreateNoPago} className='btn btn-success'>Confirmar</button>
        <button onClick={() => setOpenModalNoPago(!openModalNoPago)} className='btn btn-secondary'>Cancelar</button>
      </ModalFooter>
    </Modal>
  )
}

export default RecaudosModalNoPago
