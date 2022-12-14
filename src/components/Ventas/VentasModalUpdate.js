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

    const {getClientes,clientes} = useContext(ClientesContext)

    useEffect(()=>{
      getClientes()
    },[])
  return (
    <Modal isOpen={openModalUpdate} toggle={openModalUpdateVenta}>
        <ModalHeader toggle={openModalUpdateVenta}>
           Editando Venta 
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Fecha Venta</Label>
            <Input onChange={handleChangeUpdate} value={ventaDetail.fecha_venta} name='fecha_venta' type='date' />
          </FormGroup>
          <FormGroup>
            <Label>Valor</Label>
            <Input onChange={handleChangeUpdate} value={ventaDetail.valor_venta} name='valor_venta' type='number' />
          </FormGroup>
          <FormGroup>
                <Label>Interés %</Label>
                <Input onChange={handleChangeUpdate} value={ventaDetail.interes} name='interes' type="number" className="form-control"/>
            </FormGroup>
            <FormGroup>
                <Label>Cuotas</Label>
                <Input onChange={handleChangeUpdate} value={ventaDetail.cuotas} name='cuotas' type="number" className="form-control"/>
            </FormGroup>
          <FormGroup>
            <Label>Comentario</Label>
            <Input onChange={handleChangeUpdate} value={ventaDetail.comentario} name='comentario' type='text' />
          </FormGroup>
          <FormGroup>
            <Label>Cliente</Label>
            <Input onChange={handleChangeUpdate}  name='cliente' type='select'>
              <option value={-1}>Seleccione</option>
              {clientes.map((cliente)=>(
                <option key={cliente.id} value={cliente.id}>{cliente.nombres} {cliente.apellidos}</option>
              ))}
            </Input>
           
          </FormGroup>
        </ModalBody>
        <ModalFooter>
		        <button onClick={ventaUpdateItem} className='btn btn-warning'>Actualizar</button>
            <button onClick={openModalUpdateVenta} className='btn btn-secondary'>Cerrar</button>
        </ModalFooter>
    </Modal>
  )
}

export default VentasModalUpdate