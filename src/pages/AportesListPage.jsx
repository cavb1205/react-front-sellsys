import React, { useContext, useEffect } from "react";

import {Card, CardBody} from 'reactstrap';

import { AportesContext } from "../context/AportesContext";
import AportesListHeader from '../components/Aportes/AportesListHeader'
import AlertMessage from "../components/Utils/AlertMessage";
import AlertLoading from '../components/Utils/AlertLoading'
import AportesModalCreate from "../components/Aportes/AportesModalCreate";
import AportesModalDelete from "../components/Aportes/AportesModalDelete";
import AportesModalUpdate from "../components/Aportes/AportesModalUpdate";

import { AuthContext } from "../context/AuthContext";
import { useFilters } from "../hooks/useFilters";

const AportesListPage = () => {
    
    const {
        aportes,
        totalAportes,
        getAportes,
        openModalCreateAporte,
        aporteSeleccionado,
        loading,
    } = useContext(AportesContext);

    const {query} = useContext(AuthContext)

    const {nextPage,prevPage,listFilter} = useFilters()

    useEffect(()=>{
        getAportes()
    },[])
    
    return (
        <div className="container-sm">
            {loading? 
                <AlertLoading />
                :
                <>
            
            <AportesListHeader aportes={aportes} totalAportes={totalAportes} query={query}/>
            <div className="my-2">
                <button onClick={openModalCreateAporte} className="btn btn-success">Crear Aporte</button>
            </div>
            {
                aportes.message?
                    <AlertMessage message={'No se han creado aportes.'} />
                :
                    <>
                    {listFilter(aportes,'aportes').map((aporte, index)=>(
                        <Card key={aporte.id} className='mb-3 shadow rounder'>
                            <CardBody>
                                <div className="d-flex flex-wrap justify-content-between">
                                    <span># {index+1}</span>
                                    <h2 className="text-capitalize text-secondary">{aporte.trabajador?.trabajador}</h2>
                                    <span></span>
                                </div>
                                <div className="d-flex flex-wrap justify-content-around">
                                    <span className="badge bg-secondary">Fecha: {aporte.fecha}</span>
                                    <span className="badge bg-success">Valor: {aporte.valor}</span>
                                </div>
                                <div className="d-flex flex-wrap justify-content-around mt-2">
                                    <p className="badge bg-light text-secondary">Comentario: {aporte.comentario}</p>
                                </div>
                                <div className="d-flex flex-wrap justify-content-around mt-1">
                                    <button onClick={()=>aporteSeleccionado(aporte,'Editar')} className="btn btn-warning">Actualizar</button>
                                    <button onClick={()=>aporteSeleccionado(aporte,'Eliminar')} className="btn btn-danger">ELiminar</button>
                                </div>

                            </CardBody>
                        </Card>
                    ))}
                    {
                        listFilter(aportes,'aportes').filter(aporte => aporte.trabajador.trabajador.toLowerCase().includes(query)).length === 0 ?
                            <AlertMessage message={'No se encontraron aportes en la búsqueda'}/> : null
                    }
                    <div className='d-flex justify-content-around mb-4'>
                            <button onClick={prevPage} className='btn btn-outline-secondary btn-sm'>Atras</button>
                            <button onClick={nextPage} className='btn btn-outline-secondary btn-sm'>Siguiente</button>
                    </div>
                    </>
            }

            <AportesModalCreate />
            <AportesModalUpdate />
            <AportesModalDelete />
            </>}
        </div>

     
        
    )
}


export {AportesListPage};