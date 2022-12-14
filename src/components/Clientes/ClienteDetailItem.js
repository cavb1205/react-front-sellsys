import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ClientesContext } from '../../context/ClientesContext';


import ClienteModalDelete from './ClienteModalDelete';
import ClienteModalUpdate from './ClienteModalUpdate';
import AlertMessage from '../Utils/AlertMessage';
import { Card, CardBody } from 'reactstrap';
import AlertError from '../Utils/AlertError';
import AlertLoading from '../Utils/AlertLoading'


const ClienteDetailItem = () => {
  
  const {
    cliente,
    clienteMessage,
    getCliente,
    openModalUpdateCliente,
    openModalDeleteCliente,
    openModalDetailVentaCliente,
    getVentasActivasCliente,
    ventasActivas,
    error,
    loading,
  } = useContext(ClientesContext);

  const {clienteId}=useParams();
  
  useEffect(()=>{
    getCliente(clienteId);
    getVentasActivasCliente(clienteId);
  },[])


  return (
    
    <div className='container-sm'>
        {loading?<AlertLoading />:null}
       {error?<AlertError error={error}/>:null}
       
        <div className='card text center shadow'>
          <div className='card-header'>
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <a className="nav-link active" data-bs-toggle="tab" data-bs-target="#info" aria-current="true" >Info CLiente</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" data-bs-target="#ventasActivas" >Historial Ventas</a>
              </li>
            </ul>
          </div>
          
          <div className='tab-content' id='myTabContent'>
            {/* SECCION INFORMACION PERSONAL DEL CLIENTE */}
            
              
              <div className='card-body tab-pane fade show active' id='info'>
                {clienteMessage?<AlertMessage message={clienteMessage.message}/>:null}
                <p className='card-text'><strong>Identificación:</strong> {cliente.identificacion}</p>
                <p><strong>Nombres:</strong> {cliente.nombres} {cliente.apellidos} </p>
                <p><strong>Nombre Local:</strong> {cliente.nombre_local}</p>
                <p><strong>Dirección:</strong> {cliente.direccion}</p>
                <p><strong>Teléfono:</strong> {cliente.telefono_principal}</p>
                <p><strong>Estado:</strong> <span className={`badge rounded-pill text-bg-${cliente.estado_cliente=='Bloqueado'?'danger':cliente.estado_cliente=='Inactivo'?'warning':'success'}`}>{cliente.estado_cliente}</span></p>
                <small><strong>Fecha Creación:</strong> {cliente.fecha_creacion}</small>
              </div>
            
            
              {/* SECCION HISTORIAL VENTAS DEL CLIENTE */}
              <div className='card-body tab-pane fade' id='ventasActivas'>
                {ventasActivas.message?<AlertMessage message={'No existen ventas activas'} />:
                <div>
                  {ventasActivas.message?
                    <AlertMessage message={'No hay ventas para mostrar'}/>
                  :
                  <>
                  {ventasActivas.map((venta,index)=>(
                    <Card key={venta.id} className='mb-2 shadow rounder'>
                      <CardBody>
                        <div className="d-flex flex-wrap justify-content-between">
                          <span className='badge rounded-pill text-bg-light my-2'>{index+1}</span>
                          <h2 className=" text-capitalize text-secondary mx-4 ">Venta: {venta.valor_venta}</h2>
                          <span></span>
                        </div>
                        <div className='d-flex flex-wrap justify-content-evenly my-1'>
                          <small className='badge rounded-pill text-bg-light'>Fecha Venta: {venta.fecha_venta}</small>
                          <span className='badge rounded-pill text-bg-success'>{venta.estado_venta}</span>
                        </div>
                        <div className='d-flex flex-wrap justify-content-around mt-2'>
                          <Link to={`/ventas/${venta.id}/`}><button className='btn btn-primary btn-sm'>Ver Venta</button></Link>
                        </div>
                      </CardBody>
                    </Card>

                    ))
                  }
                  </>
                  }
                </div>
                
                }
              </div>
          </div>
              

  
          <div className='card-footer d-flex flex-wrap justify-content-around'>
            <Link to={'/clientes/'}><button className='btn btn-primary mb-1'>Lista Clientes</button></Link>
            <button onClick={openModalUpdateCliente} className='btn btn-warning mb-1'>Actualizar</button>
            <button onClick={openModalDeleteCliente} className='btn btn-danger mb-1'>Eliminar</button>
          </div>   
        </div>
      
      <ClienteModalUpdate />
      <ClienteModalDelete />
    </div>
  )
}

export default ClienteDetailItem