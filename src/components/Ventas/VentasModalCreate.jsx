import React, { useContext, useEffect, useState } from 'react'


import {Modal,ModalBody,ModalFooter,Container, ModalHeader, FormGroup, Label, Input} from 'reactstrap';
import { AuthContext } from '../../context/AuthContext';
import { ClientesContext } from '../../context/ClientesContext';
import { VentasContext } from '../../context/VentasContext';

import AlertError from '../Utils/AlertError';

const VentasModalCreate = () => {
    const {query,handleSearch} = useContext(AuthContext)

    const {
        error,
        openModalCreate,
        openModalCreateVenta,
        newVenta,
        handleChange,
        ventasCreateItem,
    } = useContext(VentasContext)

    const {getClientesActivos,clientesActivos} = useContext(ClientesContext)


    useEffect(()=>{
        getClientesActivos()
    },[])

    const handleSubmit = (event) => {
        event.preventDefault()
        ventasCreateItem()
    }

  return (
    <Modal isOpen={openModalCreate} toggle={openModalCreateVenta}>
        <form onSubmit={handleSubmit}>
        <ModalHeader toggle={openModalCreateVenta}>
            Crear Venta
            {error && <AlertError error={error} />}
        </ModalHeader>
    <ModalBody>
        <Container>
            <FormGroup>
                <Label>Fecha Venta</Label>
                <Input onChange={handleChange} value={newVenta.fecha_venta} name='fecha_venta' type="date" className="form-control" required  />
            </FormGroup>
            <FormGroup>
                <Label>Valor</Label>
                <Input onChange={handleChange} value={newVenta.valor_venta} name='valor_venta' type="number" className="form-control" required/>
            </FormGroup>
            <FormGroup>
                <Label>Interés %</Label>
                <Input onChange={handleChange} value={newVenta.interes} name='interes' type="number" className="form-control" required/>
            </FormGroup>
            <FormGroup>
                <Label>Cuotas</Label>
                <Input onChange={handleChange} value={newVenta.cuotas} name='cuotas' type="number" className="form-control" required/>
            </FormGroup>
            <FormGroup>
                <Label >Comentario</Label>
                <Input onChange={handleChange} value={newVenta.comentario} name='comentario' type="text" className="form-control"  />
            </FormGroup>
            <FormGroup>
                <Label>Cliente</Label>               
                <Input type='select' onChange={handleChange} value={newVenta.cliente} name='cliente' className="form-control" placeholder='Seleccione' required>
                    <option value={''}>Seleccione</option>
                    {clientesActivos.message?
                    <option>No se han creado clientes</option>
                    :
                    clientesActivos.filter(cliente => cliente.nombres.toLowerCase().includes(query)).map((cliente)=>(
                        <option key={cliente.id} value={cliente.id}>{cliente.nombres} {cliente.apellidos}</option>
                    ))}
                </Input>
            </FormGroup>
        </Container>
    </ModalBody>
    <ModalFooter>
        <button type='submit' className='btn btn-success'>Crear Venta</button>
    </ModalFooter>
    </form>
</Modal>
  )
}

export default VentasModalCreate