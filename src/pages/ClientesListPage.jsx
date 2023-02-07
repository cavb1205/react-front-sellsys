
import React,{useContext,useEffect} from 'react';
import { Link } from 'react-router-dom';

import {Card, CardBody} from 'reactstrap';
import ClientesHeaderListPage from "../components/Clientes/ClientesHeaderListPage"
import ClienteModalCreate from '../components/Clientes/ClienteModalCreate';
import AlertMessage from '../components/Utils/AlertMessage';
import AlertLoading from '../components/Utils/AlertLoading'

import { ClientesContext } from '../context/ClientesContext';
import { useFilters } from '../hooks/useFilters';





const ClientesListPage = () => {
    const {
       loading,
       clientes,
       getClientes,
       openModalCreateCliente,
       error,
    } = useContext(ClientesContext)

    const {nextPage,prevPage,listFilter,currentPage,ITEMS} = useFilters()

    
    useEffect(()=>{
        getClientes()
        console.log('ClientesListPage')
    },[])
    
    
    
  return (
    <div className="container-sm">
        {
        !loading?
            <>
            <ClientesHeaderListPage clientes={clientes} />
            <div className="d-flex justify-content-around mb-3">
                <button onClick={openModalCreateCliente} className="btn btn-success">Crear Cliente</button>
                <Link to={'/clientes/disponibles/'}><button  className="btn btn-primary">Clientes Disponibles</button></Link>
            </div>
            {
                clientes.message?
                    <AlertMessage message={'No se han creado clientes.'} />
                :
                    <>
                        {listFilter(clientes,'clientes').map((cliente, index)=>(
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

                        ))
                            
                        }
                        {listFilter(clientes,'clientes').length === 0?
                            <AlertMessage message={'No se encontraron clientes en la búsqueda'} />:null   
                        }
                        <div className='d-flex justify-content-around mb-4'>
                            <button onClick={prevPage} className='btn btn-outline-secondary btn-sm'>Atras</button>
                            <button onClick={nextPage} className='btn btn-outline-secondary btn-sm'>Siguiente</button>
                        </div>
                    </>
            }

            <ClienteModalCreate />

            </>
            :
            <AlertLoading />
        }

        </div>
  )
}

export default ClientesListPage