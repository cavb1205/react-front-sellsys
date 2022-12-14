import React, { useContext, useEffect } from 'react'

import {Button,Modal,ModalBody,ModalFooter,Container, ModalHeader, FormGroup, Label, Input} from 'reactstrap';

import { UtilidadesContext } from '../../context/UtilidadesContext'


const UtilidadesModalCreate = () => {
    const {
        newUtilidad,
        aportantes,
        handleChange,
        openModalCreate,
        openModalCreateUtilidad,
        utilidadCreateItem,
        getAportantes,
    } = useContext(UtilidadesContext)

    useEffect(()=>{
        getAportantes()
    },[])

    const handleSubmit = (event) => {
        event.preventDefault()
        utilidadCreateItem()
    }
    
  return (
    
    <Modal isOpen={openModalCreate} toggle={openModalCreateUtilidad}>
        <ModalHeader toggle={openModalCreateUtilidad}>
            Crear Utilidad
        </ModalHeader>
    <ModalBody>
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Fecha</Label>
                <Input onChange={handleChange} value={newUtilidad.fecha} name='fecha' type="date" className="form-control"  required />
            </FormGroup>
            <FormGroup>
                <Label>Valor</Label>
                <Input onChange={handleChange} value={newUtilidad.valor} name='valor' type="number" className="form-control" required />
            </FormGroup>
            <FormGroup>
                <Label >Comentario</Label>
                <Input onChange={handleChange} value={newUtilidad.comentario} name='comentario' type="text" className="form-control"  />
            </FormGroup>
            <FormGroup>
                <Label>Socio</Label>
                <Input type='select' onChange={handleChange} value={newUtilidad.trabajador} name='trabajador' className="form-control" required >
                    <option></option>
                    {aportantes.map((aportante)=>(
                        <option key={aportante.id} value={aportante.id}>{aportante.trabajador}</option>
                    ))}
                </Input>
            </FormGroup>
            <ModalFooter>
                <Button type='submit' color="success">Crear Utilidad</Button>
            </ModalFooter>
        </form>
    </ModalBody>
</Modal>
  )
}

export default UtilidadesModalCreate