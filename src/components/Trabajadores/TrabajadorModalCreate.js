import React, { useContext } from 'react'
import { Modal,ModalHeader,ModalBody,ModalFooter,FormGroup,Label,Input } from 'reactstrap'
import { TrabajadoresContext } from '../../context/TrabajadoresContext'
import AlertError from '../Utils/AlertError'

const TrabajadorModalCreate = () => {
    const {        
        trabajadorCreateItem,
        handleChange,
        openModalCreate,
        openModalCreateTrabajador,
        error,
        
    } = useContext(TrabajadoresContext)

    const handleSubmit = (event) => {
        event.preventDefault()
        trabajadorCreateItem()
    }
    
  return (
            <Modal isOpen={openModalCreate} toggle={openModalCreateTrabajador}>
                <ModalHeader toggle={openModalCreateTrabajador}>
                    Crear Trabajador
                    {error?<AlertError error={error}/>:null}
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input onChange={handleChange} name='username' type="text" className="form-control" required  />
                        </FormGroup>
                        <FormGroup>
                            <Label >Nombres</Label>
                            <Input onChange={handleChange}  name='first_name' type="text" className="form-control" required  />
                        </FormGroup>
                        <FormGroup>
                            <Label >Apellidos</Label>
                            <Input onChange={handleChange}  name='last_name' type="text" className="form-control"  required />
                        </FormGroup>
                        <FormGroup>
                            <Label >Contraseña</Label>
                            <Input onChange={handleChange}  name='password' type="password" className="form-control" required />
                        </FormGroup>
                        <FormGroup>
                            <Label ># Identificación</Label>
                            <Input onChange={handleChange}  name='identificacion' type="text" className="form-control" required  />
                        </FormGroup>
                        <FormGroup>
                            <Label >Teléfono</Label>
                            <Input onChange={handleChange}  name='telefono' type="text" className="form-control"  required/>
                        </FormGroup>
                        <FormGroup>
                            <Label >Dirección</Label>
                            <Input onChange={handleChange}  name='direccion' type="text" className="form-control" required />
                        </FormGroup>
                        <ModalFooter>
                            <button type='submit' className='btn btn-success'>Crear Trabajador</button>
                            <button onClick={openModalCreateTrabajador} className="btn btn-secondary">Cerrar</button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </Modal>
  )
}

export default TrabajadorModalCreate