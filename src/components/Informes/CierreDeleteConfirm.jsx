import React from 'react'
import { Link } from 'react-router-dom'

const CierreDeleteConfirm = () => {
  return (
    <div className='container-sm'>
        <div className='card shadow-lg p-3 mb-5 bg-body rounded'>
            <h3 className='card-body text-center text-danger'>Cierre de Caja Eliminado Correctamente</h3>
            <Link to={'/cierres/'} className='btn btn-secondary'>Continuar</Link>
        </div>
    </div>
  )
}

export default CierreDeleteConfirm