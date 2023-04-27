import React, { useContext } from 'react'
import { TiendaContext } from '../../context/TiendaContext'

const AlertWaitPayment = () => {
    const {tienda} = useContext(TiendaContext)
  return (
    <div className="alert alert-warning text-center">
        {tienda.estado}, la suscripción venció el {tienda.fecha_vencimiento} 
    </div>
  )
}

export default AlertWaitPayment