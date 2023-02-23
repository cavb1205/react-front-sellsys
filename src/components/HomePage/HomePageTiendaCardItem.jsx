import React from 'react'

const HomePageTiendaCardItem = ({ tipo, total }) => {
  const cardColor = () => {
    if (tipo === 'Inversión') {
      return 'primary'
    } else if (tipo === 'Gastos') {
      return 'warning'
    } else if (tipo === 'Utilidades') {
      return 'success'
    } else if (tipo === 'Pérdidas') {
      return 'danger'
    } else if (tipo === 'Ingresos x Ventas') {
      return 'success'
    } else {
      return 'secondary'
    }
  }
  return (
    <div className={`card border-${cardColor()} shadow`}>
      <div className={`card-body text-${cardColor()} text-center`}>
        <h4 className='card-title'>{tipo}</h4>
        <h2 className='card-text'>$ {total}</h2>
      </div>
    </div>
  )
}

export default HomePageTiendaCardItem
