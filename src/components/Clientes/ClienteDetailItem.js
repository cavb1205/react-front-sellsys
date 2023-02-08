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
                <a className="nav-link active" data-bs-toggle="tab" data-bs-target="#info" aria-current="true" >Info Cliente</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" data-bs-target="#ventasActivas" >Historial Ventas</a>
              </li>
            </ul>
          </div>
          
          <div className='tab-content' id='myTabContent'>
            {/* SECCION INFORMACION PERSONAL DEL CLIENTE */}
            
              
              <div className='card-body tab-pane fade show active' id='info'>
                <div>
                  <div className='row justify-content-around my-2'>
                    <div className='col-5'>
                      <strong>Identificación:</strong>
                    </div>
                    <div  className='col-5'>
                      <span>{cliente.identificacion}</span>
                    </div>
                  </div>
                  <div className='row justify-content-around my-2'>
                    <div className='col-5'>
                      <strong>Nombres:</strong>
                    </div>
                    <div  className='col-5'>
                      <span>{cliente.nombres} {cliente.apellidos}</span>
                    </div>
                  </div>
                  <div className='row justify-content-around my-2'>
                    <div className='col-5'>
                      <strong>Nombre Local:</strong>
                    </div>
                    <div  className='col-5'>
                      <span>{cliente.nombre_local}</span>
                    </div>
                  </div>
                  <div className='row justify-content-around my-2'>
                    <div className='col-5'>
                      <strong>Dirección:</strong>
                    </div>
                    <div  className='col-5'>
                      <span>{cliente.direccion}</span>
                    </div>
                  </div>
                  <div className='row justify-content-around my-2'>
                    <div className='col-5'>
                      <strong>Teléfono:</strong>
                    </div>
                    <div  className='col-5'>
                      <span>{cliente.telefono_principal}</span>
                    </div>
                  </div>
                  <div className='row justify-content-around my-2'>
                    <div className='col-5'>
                      <strong>Estado:</strong>
                    </div>
                    <div  className='col-5'>
                    <span className={`badge rounded-pill text-bg-${cliente.estado_cliente=='Bloqueado'?'danger':cliente.estado_cliente=='Inactivo'?'warning':'success'}`}>{cliente.estado_cliente}</span>
                    </div>
                  </div>
                  <div className='row justify-content-around my-2'>
                    <div className='col-5'>
                      <strong>Fecha Creación:</strong>
                    </div>
                    <div  className='col-5'>
                      <span>{cliente.fecha_creacion}</span>
                    </div>
                  </div>
                </div>
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
                          {
                            (venta.estado_venta === 'Perdida')?
                              <span className='badge rounded-pill text-bg-danger'>{venta.estado_venta}</span>
                              :
                              (venta.estado_venta === 'Pagado')?
                                <span className='badge rounded-pill text-bg-secondary'>{venta.estado_venta}</span>
                              :
                                <span className='badge rounded-pill text-bg-success'>{venta.estado_venta}</span>
                          }
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