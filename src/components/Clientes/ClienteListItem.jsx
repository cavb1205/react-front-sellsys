import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'

const ClienteListItem = ({cliente}) => {
  return (
    <Card key={cliente.id} className='mb-3 shadow rounder'>
        <CardBody>
            <div className="d-flex flex-wrap justify-content-center ">
                <h2 className="text-capitalize text-secondary">{cliente.nombres} {cliente.apellidos}</h2>                
            </div>
            <div className="d-flex flex-wrap justify-content-center ">
                <span className={`badge rounded-pill bg-${cliente.estado_cliente=='Bloqueado'?'danger':cliente.estado_cliente=='Inactivo'?'secondary':'success'} my-2`}>{cliente.estado_cliente}</span>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
                <span className="badge text-bg-light">Local {cliente.nombre_local} </span>
            </div>  
            <div className="d-flex flex-wrap justify-content-around mt-2">
                <span className="badge bg-light text-secondary">Direccion: {cliente.direccion} </span>
            </div>
            <div className="d-flex flex-wrap justify-content-around">
                                        <span className="badge bg-light text-secondary">Teléfono: {cliente.telefono_principal} </span>
            </div>
            <div className="d-flex flex-wrap justify-content-around mt-2">
               <Link to={`/clientes/${cliente.id}/`}><button  className="btn btn-primary">Ver Más</button></Link>
            </div>
        </CardBody>
    </Card>                                                        
  )
}

export default ClienteListItem