import React from 'react'
import Search from '../Utils/Search'

const AportesListHeader = (props) => {
  const {aportes,totalAportes,query}=props
  return (
    <>
    <div className="text-center">
        <h1>Lista de Aportes</h1>
        {aportes.message
        ?
          <span># de Aportes: <span className='badge bg-secondary'>0</span></span>
        :
          <span># de Aportes: 
            <span className='badge bg-secondary'>
              {aportes.filter(aporte => aporte.trabajador?.trabajador.toLowerCase().includes(query)).length}
            </span>
          </span>
      }
        <p>Total Aportado: <span className='badge bg-success'>{totalAportes()}</span></p>
    </div>
    <div>
      <Search />
    </div>
    </>
  )
}

export default AportesListHeader