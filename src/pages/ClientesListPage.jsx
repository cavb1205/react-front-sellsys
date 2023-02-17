
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import ClientesHeaderListPage from '../components/Clientes/ClientesHeaderListPage'
import ClienteModalCreate from '../components/Clientes/ClienteModalCreate'
import AlertMessage from '../components/Utils/AlertMessage'
import AlertLoading from '../components/Utils/AlertLoading'
import Paginator from "../components/Utils/Paginator"
import { ClientesContext } from '../context/ClientesContext'
import { useFilters } from '../hooks/useFilters'
import ClienteListItem from '../components/Clientes/ClienteListItem'


const ClientesListPage = () => {
  const {
    loading,
    clientes,
    getClientes,
    openModalCreateCliente
  } = useContext(ClientesContext)

  const { nextPage, prevPage, listFilter } = useFilters()

  useEffect(() => {
    getClientes()
  }, [])

  return (
    <div className='container-sm'>
      {
        !loading
          ? <>
            <ClientesHeaderListPage clientes={clientes} />
            <div className='d-flex justify-content-around mb-3'>
              <button onClick={openModalCreateCliente} className='btn btn-success'>Crear Cliente</button>
              <Link to='/clientes/disponibles/'><button className='btn btn-primary'>Clientes Disponibles</button></Link>
            </div>
            {
                clientes.message
                  ? <AlertMessage message='No se han creado clientes.' />
                  : <>
                    {listFilter(clientes, 'clientes').map((cliente) => (
                      <ClienteListItem 
                        key={cliente.id} 
                        cliente={cliente} 
                      />
                    ))}
                    {listFilter(clientes, 'clientes').length === 0
                      ? <AlertMessage message='No se encontraron clientes en la búsqueda' />
                      : null}
                    <Paginator
                      nextPage={nextPage} 
                      prevPage={prevPage} 
                    />
                    </>
            }

            <ClienteModalCreate />

            </>
          : <AlertLoading />
        }

    </div>
  )
}

export default ClientesListPage
