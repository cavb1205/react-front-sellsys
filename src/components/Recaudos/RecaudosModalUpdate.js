import React, { useContext } from 'react'
import { FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { RecaudosContext } from '../../context/RecaudosContext'

const RecaudosModalUpdate = () => {
    const {
        openModalUpdate,
        openModalUpdateRecaudo,
        recaudo,
        handleChangeUpdate,
        recaudoUpdateItem,
    } = useContext(RecaudosContext)

    const handleSubmit = (event) => {
        event.preventDefault()
        recaudoUpdateItem(recaudo.id)
    }
    
  return (
    <Modal isOpen={openModalUpdate} toggle={openModalUpdateRecaudo}>
        <ModalHeader toggle={openModalUpdateRecaudo}>
            Editando Recaudo
        </ModalHeader>  
        <ModalBody>
            <form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Fecha Recaudo:</Label>
                <Input onChange={handleChangeUpdate} type='date' name='fecha_recaudo' value={recaudo.fecha_recaudo} required></Input>
            </FormGroup>
            <FormGroup>
                <Label>
                    Valor:
                </Label>
                <Input onChange={handleChangeUpdate} type='number' name='valor_recaudo' value={recaudo.valor_recaudo} required/>
            </FormGroup>
                <ModalFooter>
                    <button type='submit' className='btn btn-warning'>Actualizar</button>
                </ModalFooter>
            </form>
        </ModalBody>
    </Modal>
  )
}

export default RecaudosModalUpdate