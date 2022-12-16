import React, { useContext, useEffect } from 'react'
import { GastosContext } from '../../context/GastosContext'
import { Modal, ModalHeader, ModalBody, ModalFooter,Button,FormGroup,Label, Input,Container, Form } from 'reactstrap'
import AlertError from '../Utils/AlertError'

const GastosModalCreate = () => {
    const {
        newGasto,
        openModalCreate,
        handleChange,
        openModalCreateGasto,
        tipoGastos,
        gastoCreateItem,
        getTipoGastos
    } = useContext(GastosContext)

    useEffect(()=>{
        getTipoGastos()
    },[])

    const handleSubmit = (event)=>{
        event.preventDefault()
        gastoCreateItem()
        openModalCreateGasto()
    }
  return (
    
            <Modal isOpen={openModalCreate} toggle={openModalCreateGasto}>
                <ModalHeader toggle={openModalCreateGasto}>
                    Crear Gasto
                </ModalHeader>
                <ModalBody>
                    
                    
                        <form onSubmit={handleSubmit} >
                            <FormGroup>
                                <Label>Fecha <span className='text-danger'>*</span></Label>
                                <Input onChange={handleChange} value={newGasto.fecha} name='fecha' type="date" className="form-control" id="floatingInput" required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="floatingInput">Tipo de Gasto <span className='text-danger'>*</span></Label>
                                <Input onChange={handleChange} value={newGasto.tipo_gasto?.id} name='tipo_gasto' type="select" className="form-control" id="floatingInput" required> 
                                        <option></option>
                                    {
                                        tipoGastos.message?
                                            <option>No se han creado tipo de gastos</option>
                                        :
                                        tipoGastos.map((tipo)=>(
                                            <option key={tipo.id} value={tipo.id}>{tipo.tipo_gasto}</option>
                                        ))
                                    }
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="validationValor">Valor <span className='text-danger'>*</span></Label>
                                <Input onChange={handleChange} value={newGasto.valor} name='valor' type="number" className="form-control" id="validationValor" required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="floatingInput">Comentario</Label>
                                <Input onChange={handleChange} value={newGasto.comentario} name='comentario' type="text" className="form-control" id="floatingInput"  />
                            </FormGroup>
                       
                            <ModalFooter>
                                <button type='submit' className='btn btn-success'>Crear Gasto</button>
                                
                            </ModalFooter>
                        </form>
                       
                </ModalBody>
                
            </Modal>
            
          
  )
}

export default GastosModalCreate