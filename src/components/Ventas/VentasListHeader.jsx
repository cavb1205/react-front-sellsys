import React, { useContext } from 'react'
import { VentasContext } from '../../context/VentasContext'
import Search from '../Utils/Search'

const VentasListHeader = (props) => {
  const {

    totalVentas,
    totalPerdidas,
    totalVentasInteres
  } = useContext(VentasContext)
  const { titulo, ventas } = props

  return (
    <div className='text-center mb-4'>
      <h1>{titulo}</h1>
      {ventas.message
        ? <small className='badge rounded-pill text-bg-secondary'># de Ventas: 0</small>
        : <small className='badge rounded-pill text-bg-secondary'># de Ventas: {ventas.length}</small>}
      <br />
      {titulo === 'Ventas Activas'
        ? <><p className='badge rounded-pill text-bg-light'>Ventas Netas: {totalVentas()}</p> <p className='badge rounded-pill text-bg-primary'>Total Saldos: {totalVentasInteres()}</p> <div className='mt-1'><Search /></div></>
        : null}
      {titulo === 'Ventas Pérdida'
        ? <p className='badge rounded-pill text-bg-danger'>Total Pérdidas: {totalPerdidas()}</p>
        : null}
    </div>
  )
}

export default VentasListHeader
