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
   //formato de miles y millones a valores del homepage
   const formatNumber = (number) => {
    return number.toLocaleString()
  }
  return (
    <div className={`card border-${cardColor()} shadow`}>
      <div className={`card-body text-${cardColor()} text-center`}>
        <h4 className='card-title'>{tipo}</h4>
        <h2 className='card-text'>$ {total?formatNumber(total):total}</h2>
      </div>
    </div>
  )
}

export default HomePageTiendaCardItem
