import React from 'react'
import { Link } from 'react-router-dom'
import { Badge, Card, CardBody } from 'reactstrap'

const RecaudosListItem = ({ venta, selectedNoPago, SelectedRecaudo }) => {
  return (
    <Card className='mb-3 shadow rounder'>

      <CardBody>
        <Link className='text-decoration-none' to={`/ventas/${venta.id}/`}>
          <div className='d-flex flex-wrap justify-content-around'>

            <div className=' d-flex flex-row justify-content-around'>
              <div className='p-1'>
                <h2 className='text-capitalize text-secondary'>  {venta.cliente?.nombres} {venta.cliente?.apellidos}</h2>
              </div>
              <div className='p-2'>
                <Badge color={venta.estado_venta === 'Vencido' ? 'danger' : venta.estado_venta === 'Atrasado' ? 'warning' : 'success'} pill>{venta.estado_venta}</Badge>
              </div>
            </div>
            <div>
              <button className='btn btn-outline-danger'>Saldo: {venta.saldo_actual}</button>
            </div>

          </div>

          <div className='text-center'>
            <small className='text-secondary'>Fecha Venta: {venta.fecha_venta}</small>
          </div>
        </Link>
        <div className='d-flex flex-wrap justify-content-around my-2'>
          <h6>Días Pendientes <span className='badge bg-secondary'>{venta.pagos_pendientes}</span></h6>
          {
                (venta.dias_atrasados < 0)
                  ? <h6>Días Adelantados <span className='badge bg-success'>{Math.abs(venta.dias_atrasados)}</span></h6>
                  : <h6>Días Atrasados <span className='badge bg-danger'>{venta.dias_atrasados}</span></h6>
            }
          <h6>Días Abonados <span className='badge bg-success'>{venta.pagos_realizados}</span></h6>
        </div>

        <div className='text-center mb-3'>
          <h5>Cuota <span className='badge bg-secondary'>{venta.valor_cuota}</span></h5>
        </div>
        <div className='d-flex flex-wrap justify-content-around'>
          <button onClick={() => selectedNoPago(venta)} className='btn btn-danger mb-2'>No Pagó</button>
          <button onClick={() => SelectedRecaudo(venta)} className='btn btn-success mb-2'>Abonar</button>
        </div>
      </CardBody>
    </Card>
  )
}

export default RecaudosListItem
