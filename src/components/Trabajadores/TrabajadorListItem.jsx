import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'

const TrabajadorListItem = ({ trabajador }) => {
  return (
    <Card className='mb-3 shadow rounder'>
      <CardBody>
        <div className='d-flex flex-wrap justify-content-center '>
          <h2 className='text-capitalize text-secondary mx-4 '>{trabajador.trabajador}</h2>
        </div>
        <div className='d-flex flex-wrap justify-content-center'>
          <span className='badge text-bg-light'>{trabajador.identificacion} </span>
        </div>
        <div className='d-flex flex-wrap justify-content-around mt-2'>
          <span className='badge bg-light text-secondary'>Direccion: {trabajador.direccion} </span>
        </div>
        <div className='d-flex flex-wrap justify-content-around'>
          <span className='badge bg-light text-secondary'>Teléfono: {trabajador.telefono} </span>
        </div>
        <div className='d-flex flex-wrap justify-content-around mt-2'>
          <Link to={`/trabajadores/${trabajador.id}/`}><button className='btn btn-primary'>Ver Más</button></Link>
        </div>
      </CardBody>
    </Card>
  )
}

export default TrabajadorListItem
