import React, { useContext, useEffect } from 'react'
import { TiendaContext } from '../context/TiendaContext'
import {Card,CardBody} from 'reactstrap'
import AlertLoading from '../components/Utils/AlertLoading'
import AlertMessage from '../components/Utils/AlertMessage'
import { useFilters } from "../hooks/useFilters";

const TiendasListPage = () => {
    const {
        tiendas,
        getAllTiendas,
        loading,
    } = useContext(TiendaContext)
    const {nextPage,prevPage,listFilter} = useFilters()

    useEffect(()=>{
        getAllTiendas()
    },[])

    console.log(tiendas)
  return (
    <div className='container-sm'>
        
        {
            loading?
                <AlertLoading />
            :
            <>    
            <h2 className='text-secondary text-center'>Listado de Tiendas</h2>
            <div className='text-center'>
                <span className="badge rounded-pill text-bg-secondary">Total Tiendas: {tiendas.length}</span>
            </div>
            <div className='d-flex justify-content-around m-4'>
                <span className="badge rounded-pill text-bg-success">Tiendas Activas: 10</span>
                <span className="badge rounded-pill text-bg-danger">Tiendas Inactivas: 20</span>
            </div>
            
            {
                tiendas.message?
                <AlertMessage message={'No se han creado tiendas'}/>
                :
                <>
                {
                    listFilter(tiendas,'tiendas').map((tienda)=>(
                        <Card key={tienda.id} className='mb-3 shadow rounder'>
                            <CardBody>
                                <div className='d-flex justify-content-center'>
                                    <h3 className='text-secondary'>{tienda.nombre}</h3>
                                </div>
                                <div className='d-flex justify-content-around'>
                                    <span className={`badge rounded-pill text-bg-${tienda.estado?'success':'danger'}`}>Estado:{tienda.estado? 'Activa' : 'Inactiva'}</span>
                                    <span className={`badge rounded-pill text-bg-light`}>Registro:{tienda.fecha_registro}</span>
                                </div>
                                <div className='d-flex justify-content-around m-2'>
                                    <button className='btn btn-danger btn-sm'>Desactivar</button>
                                    <button className='btn btn-success btn-sm'>Activar</button>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                }
                <div className='d-flex justify-content-around m-4'>
                        <button onClick={prevPage} className='btn btn-outline-secondary btn-sm'>Atras</button>
                        <button onClick={nextPage} className='btn btn-outline-secondary btn-sm'>Siguiente</button>
                </div>
                </>
            }
                
            </>
        }
    </div>
  )
}

export default TiendasListPage