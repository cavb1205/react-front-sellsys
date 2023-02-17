import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { VentasContext } from '../../context/VentasContext'

const VentasModalPerdida = (props) => {
  const navigate = useNavigate()

  const {
    ventaPerdida
  } = useContext(VentasContext)

  const {
    venta,
    clickOpenModalPerdida,
    openModalPerdida
  } = props

  const valorPerdida = (venta.saldo_actual)

  const sendPerdida = () => {
    ventaPerdida()
    clickOpenModalPerdida()
    navigate('/ventas/perdidas/')
  }

  return (
    <Modal isOpen={openModalPerdida} toggle={clickOpenModalPerdida}>
      <ModalHeader className='alert alert-danger d-flex align-items-center' toggle={clickOpenModalPerdida}>
        Pérdida Venta por {valorPerdida}
      </ModalHeader>
      <ModalBody>
        Esta seguro que desea enviar la venta de <span className='text-primary'>{venta.cliente?.nombres} {venta.cliente?.apellidos}</span> como pérdida?
        <p>El valor de la pérdida es de <span className='badge bg-danger'>{valorPerdida}</span></p>
      </ModalBody>
      <ModalFooter>
        <button className='btn btn-danger' onClick={sendPerdida}>Confirmar</button>
      </ModalFooter>
    </Modal>
  )
}

export default VentasModalPerdida
