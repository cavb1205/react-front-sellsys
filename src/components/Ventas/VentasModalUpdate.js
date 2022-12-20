import React, { useContext, useEffect } from 'react'
import { Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { ClientesContext } from '../../context/ClientesContext'
import { VentasContext } from '../../context/VentasContext'

const VentasModalUpdate = () => {
    const {
        ventaDetail,
        openModalUpdate,
        openModalUpdateVenta,
        ventaUpdateItem,
        handleChangeUpdate,
    } = useContext(VentasContext)

    const handleSubmit = (event) => {
      event.preventDefault()
      ventaUpdateItem()
    }
   
    
   
  return (
    <Modal isOpen={openModalUpdate} toggle={openModalUpdateVenta}>
        <ModalHeader toggle={openModalUpdateVenta}>
           Editando Venta {ventaDetail.id}
        </ModalHeader>
        <form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label>Fecha Venta</Label>
            <Input onChange={handleChangeUpdate} value={ventaDetail.fecha_venta} name='fecha_venta' type='date' required />
          </FormGroup>
          <FormGroup>
            <Label>Valor</Label>
            <Input onChange={handleChangeUpdate} value={ventaDetail.valor_venta} name='valor_venta' type='number' required />
          </FormGroup>
          <FormGroup>
                <Label>Interés %</Label>
                <Input onChange={handleChangeUpdate} value={ventaDetail.interes} name='interes' type="number" className="form-control" required/>
            </FormGroup>
            <FormGroup>
                <Label>Cuotas</Label>
                <Input onChange={handleChangeUpdate} value={ventaDetail.cuotas} name='cuotas' type="number" className="form-control" required/>
            </FormGroup>
          <FormGroup>
            <Label>Comentario</Label>
            <Input onChange={handleChangeUpdate} value={ventaDetail.comentario} name='comentario' type='text' />
          </FormGroup>
          <FormGroup>
            <Label>Cliente</Label>
            <Input onChange={handleChangeUpdate} value={ventaDetail.cliente?.nombres + ' ' + ventaDetail.cliente?.apellidos}  name='cliente' type='text' disabled />                                     
          </FormGroup>
        </ModalBody>
        <ModalFooter>
		        <button type='submit' className='btn btn-warning'>Actualizar</button>            
        </ModalFooter>
        </form>
    </Modal>
  )
}

export default VentasModalUpdate