import React, { useContext, useEffect } from 'react'

import AlertLoading from '../components/Utils/AlertLoading';

import AlertMessage from '../components/Utils/AlertMessage';

import { UtilidadesContext } from '../context/UtilidadesContext'
import UtilidadesListHeader from '../components/Utilidades/UtilidadesHeader';
import UtilidadesModalCreate from '../components/Utilidades/UtilidadesModalCreate';
import UtilidadesModalDelete from '../components/Utilidades/UtilidadesModalDelete';
import UtilidadesModalUpdate from '../components/Utilidades/UtilidadesModalUpdate';
import { AuthContext } from '../context/AuthContext';
import { Card, CardBody } from 'reactstrap';
import { useFilters } from '../hooks/useFilters';

const UtilidadesListPage = () => {
    const {
        utilidades,
        totalUtilidades,
        Selected,
        getUtilidades,
        openModalCreateUtilidad,
        loading,
        
    } = useContext(UtilidadesContext)
    
    const{query}=useContext(AuthContext)

    const {listFilter,prevPage, nextPage} = useFilters()

    useEffect(()=>{
        getUtilidades()
    },[])
    

  return (
    <div className="container-sm">
        {loading?
            <AlertLoading />
            :
            <>
            <UtilidadesListHeader utilidades={utilidades} totalUtilidades={totalUtilidades} query={query} />
            <div className="my-2">
                <button onClick={openModalCreateUtilidad} className="btn btn-success">Crear Utilidad</button>
            </div>
            {
                utilidades.message?
                    <AlertMessage message={'No se han creado utilidades.'} />
                :
                    <>
                    {listFilter(utilidades,'utilidades').map((utilidad, index)=>(
                        <Card key={utilidad.id} className='mb-3 shadow rounder'>
                            <CardBody>
                                <div className="d-flex flex-wrap justify-content-between">
                                    <span># {index+1}</span>
                                    <h2 className="text-capitalize text-secondary">{utilidad.trabajador?.trabajador}</h2>
                                    <span></span>
                                </div>
                                <div className="d-flex flex-wrap justify-content-around">
                                    <span className="badge bg-secondary">Fecha: {utilidad.fecha}</span>
                                    <span className="badge bg-success">Valor: {utilidad.valor}</span>
                                </div>  
                                <div className="d-flex flex-wrap justify-content-around mt-2">
                                    <p className="badge bg-light text-secondary">Comentario: {utilidad.comentario}</p>
                                </div>
                                <div className="d-flex flex-wrap justify-content-around mt-1">
                                    <button onClick={()=>Selected(utilidad,'Editar')} className="btn btn-warning">Actualizar</button>
                                    <button onClick={()=>Selected(utilidad,'Eliminar')} className="btn btn-danger">ELiminar</button>
                                </div>

                            </CardBody>
                        </Card>
                       

                    ))
                        
                    }
                    {listFilter(utilidades,'utilidades').length === 0?
                        <AlertMessage message={'No se encontraron utilidades en la búsqueda'} />:null   
                    }
                    <div className='d-flex justify-content-around mb-4'>
                            <button onClick={prevPage} className='btn btn-outline-secondary btn-sm'>Atras</button>
                            <button onClick={nextPage} className='btn btn-outline-secondary btn-sm'>Siguiente</button>
                    </div>
                    </>
            }

           <UtilidadesModalCreate />
           <UtilidadesModalUpdate />
           <UtilidadesModalDelete />
           </>
        }
        </div>
  )
}

export default UtilidadesListPage