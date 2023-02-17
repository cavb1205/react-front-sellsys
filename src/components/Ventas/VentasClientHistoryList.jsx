import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'

const VentasClientHistoryList = ({ venta, index }) => {
  return (
    <Card className='mb-2 shadow rounder'>
      <CardBody>
        <div className='d-flex flex-wrap justify-content-between'>
          <span className='badge rounded-pill text-bg-light my-2'>{index + 1}</span>
          <h2 className=' text-capitalize text-secondary mx-4 '>Venta: {venta.valor_venta}</h2>
          <span />
        </div>
        <div className='d-flex flex-wrap justify-content-evenly my-1'>
          <small className='badge rounded-pill text-bg-light'>Fecha Venta: {venta.fecha_venta}</small>
          {
          (venta.estado_venta === 'Perdida')
            ? <span className='badge rounded-pill text-bg-danger'>{venta.estado_venta}</span>
            : (venta.estado_venta === 'Pagado')
                ? <span className='badge rounded-pill text-bg-secondary'>{venta.estado_venta}</span>
                : <span className='badge rounded-pill text-bg-success'>{venta.estado_venta}</span>
        }
        </div>
        <div className='d-flex flex-wrap justify-content-around mt-2'>
          <Link to={`/ventas/${venta.id}/`}><button className='btn btn-primary btn-sm'>Ver Venta</button></Link>
        </div>
      </CardBody>
    </Card>
  )
}

export default VentasClientHistoryList
