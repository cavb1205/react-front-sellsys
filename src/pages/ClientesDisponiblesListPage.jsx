import React,{useContext,useEffect} from 'react';
import { Link } from 'react-router-dom';

import {Card, CardBody} from 'reactstrap';
import ClientesHeaderListPage from "../components/Clientes/ClientesHeaderListPage"
import AlertMessage from '../components/Utils/AlertMessage';
import AlertLoading from '../components/Utils/AlertLoading'

import { ClientesContext } from '../context/ClientesContext';
import { useFilters } from '../hooks/useFilters';


const ClientesDisponiblesListPage = () => {
    const {
       loading,
       clientesDisponibles,
       getClientesDisponibles,
       error,
    } = useContext(ClientesContext)

    const {nextPage,prevPage,listFilter,currentPage,ITEMS} = useFilters()

    
    useEffect(()=>{
        getClientesDisponibles()
    },[])
    
  return (
    <div className="container-sm">
        {
        !loading?
            <>
            <ClientesHeaderListPage clientes={clientesDisponibles} />

            {
                clientesDisponibles.message?
                    <AlertMessage message={'No hay clientes disponibles.'} />
                :
                    <>
                        {listFilter(clientesDisponibles,'clientesDisponibles').map((cliente, index)=>(
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
                                        <span className="badge bg-light text-secondary">Tel??fono: {cliente.telefono_principal} </span>
                                    </div>
                                    <div className="d-flex flex-wrap justify-content-around mt-2">
                                       <Link to={`/clientes/${cliente.id}/`}><button  className="btn btn-primary">Ver M??s</button></Link>
                                    </div>
                                </CardBody>
                            </Card>                                                        

                        ))
                            
                        }
                        {listFilter(clientesDisponibles,'clientesDisponibles').length === 0?
                            <AlertMessage message={'No se encontraron clientes en la b??squeda'} />:null   
                        }
                        <div className='d-flex justify-content-around mb-4'>
                            <button onClick={prevPage} className='btn btn-outline-secondary btn-sm'>Atras</button>
                            <button onClick={nextPage} className='btn btn-outline-secondary btn-sm'>Siguiente</button>
                        </div>
                    </>
            }

            

            </>
            :
            <AlertLoading />
        }

        </div>
  )
}

export default ClientesDisponiblesListPage