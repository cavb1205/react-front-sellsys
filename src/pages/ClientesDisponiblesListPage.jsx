import React,{useContext,useEffect} from 'react';
import { Link } from 'react-router-dom';

import {Card, CardBody} from 'reactstrap';
import ClientesHeaderListPage from "../components/Clientes/ClientesHeaderListPage"
import AlertMessage from '../components/Utils/AlertMessage';
import AlertLoading from '../components/Utils/AlertLoading'

import { ClientesContext } from '../context/ClientesContext';
import { useFilters } from '../hooks/useFilters';
import ClienteListItem from '../components/Clientes/ClienteListItem';


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
                            <ClienteListItem key={cliente.id} cliente={cliente}/>                                                  

                        ))
                            
                        }
                        {listFilter(clientesDisponibles,'clientesDisponibles').length === 0?
                            <AlertMessage message={'No se encontraron clientes en la búsqueda'} />:null   
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