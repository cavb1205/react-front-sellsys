import React, { useContext } from 'react'
import { RecaudosContext } from '../../context/RecaudosContext'

import  Search  from '../Utils/Search'

const LiquidarVentasListHeader = (props) => {
    
    const {ventas,handleSearch, ventasActivas} = props

    const {handleChangeDate,
        openModalDate,
        liquidarDate,
        recaudos,
        totalRecaudosFecha,
    } = useContext(RecaudosContext)

    const totalRecaudar = () => {
      if (ventas.message){
          return 0;
      } else {
          return ventas.map(venta => parseFloat(venta.valor_cuota)).reduce((a,b) => a + b, 0)
      }
  }

    const totalRecaudarVentas = () => {
        if (ventasActivas.message){
            return 0;
        } else {
            return ventasActivas.map(venta => parseFloat(venta.valor_cuota)).reduce((a,b) => a + b, 0)
        }
    }
 
    
  return (
    <div className="text-center mb-4">
        <h1>Liquidar Ventas</h1>
        <div className='d-flex flex-wrap justify-content-evenly'>

            {ventas.message?
                <p className='badge rounded-pill text-bg-secondary'>Ventas por Cobrar: 0</p>:
                <p className='badge rounded-pill text-bg-secondary'>Ventas por Cobrar: {ventas.length}</p>
            }
            <p className='badge rounded-pill text-bg-primary'>Total a Recaudar: {totalRecaudarVentas()}</p>
            <p className='badge rounded-pill text-bg-warning'>Pendiente por Recaudar: {totalRecaudar()}</p>
            <p className='badge rounded-pill text-bg-success'>Total Recaudado: {totalRecaudosFecha()}</p>
        </div>
        
        <br />
        <p  className='badge bg-primary'>Fecha: <input onChange={handleChangeDate} type="date" name='fecha_liquidar' value={liquidarDate.fecha_liquidar}></input></p>
        
        <Search/>
        
        
    </div>
  )
}

export default LiquidarVentasListHeader