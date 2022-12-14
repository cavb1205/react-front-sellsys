import React from 'react'
import Search from '../Utils/Search'

const GastosListHeader = ({gastos,totalGastos,query}) => {
    
  return (
    <>
    <div className="text-center">
        <h1>Lista de Gastos</h1>
        {gastos.message?
            <span># de Gastos: <span className='badge bg-secondary'>0</span></span>:
            <span># de Gastos: <span className='badge bg-secondary'>{gastos.filter(gasto => gasto.tipo_gasto?.tipo_gasto.toLowerCase().includes(query)).length}</span></span>
    }
        <p>Total Gastos: <span className='badge bg-danger'>{totalGastos()}</span></p>
        
    </div>
    <div>
      <Search />
    </div>
    </>
  )
}

export default GastosListHeader