
import React,{useContext,useEffect} from 'react';
import { Link } from 'react-router-dom';


import ClientesHeaderListPage from "../components/Clientes/ClientesHeaderListPage"
import ClienteModalCreate from '../components/Clientes/ClienteModalCreate';
import AlertMessage from '../components/Utils/AlertMessage';
import AlertLoading from '../components/Utils/AlertLoading'

import { ClientesContext } from '../context/ClientesContext';
import { useFilters } from '../hooks/useFilters';
import ClienteListItem from '../components/Clientes/ClienteListItem';


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
                            <ClienteListItem key={cliente.id} cliente={cliente} />
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