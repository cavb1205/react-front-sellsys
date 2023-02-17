import React, { useMemo } from 'react'

const VentasClienteResume = ({ ventas }) => {
  const totalVentasNetas = useMemo(() => () => {
    if (ventas.message) {
      return 0
    } else {
      return ventas.map(venta => parseFloat(venta.valor_venta)).reduce((a, b) => a + b, 0)
    }
  }, [ventas])

  const totalIngresosVentas = useMemo(() => () => {
    if (ventas.message) {
      return 0
    } else {
      return ventas.filter(venta => venta.estado_venta === 'Pagado').map(venta => parseFloat(venta.total_a_pagar) - parseFloat(venta.valor_venta)).reduce((a, b) => a + b, 0)
    }
  }, [ventas])

  const totalPerdidasVentas = () => {
    if (ventas.message) {
      return 0
    } else {
      return ventas.filter(venta => venta.estado_venta === 'Perdida').map(venta => parseFloat(venta.saldo_actual)).reduce((a, b) => a + b, 0)
    }
  }

  return (
    <div className='text-center m-3'>
      <h2 className='text-secondary'>Resumen Ventas</h2>
      <div className='d-flex flex-wrap justify-content-around'>
        <span className='badge bg-secondary mb-2'># Ventas {ventas.length} </span>
        <span className='badge bg-primary mb-2'>Ventas Netas ${totalVentasNetas()} </span>
        <span className='badge bg-success mb-2'>Ingresos x Ventas ${totalIngresosVentas()} </span>
        <span className='badge bg-danger mb-2'>Ventas Pérdida ${totalPerdidasVentas()} </span>
      </div>
    </div>
  )
}

export default VentasClienteResume
