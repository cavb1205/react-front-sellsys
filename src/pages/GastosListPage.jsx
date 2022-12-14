import React, { useContext } from "react";

import { Card, CardBody} from 'reactstrap';

import { GastosContext } from "../context/GastosContext";

import GastosListHeader from "../components/Gastos/GastosListHeader";
import AlertMessage from "../components/Utils/AlertMessage";
import AlertLoading from '../components/Utils/AlertLoading'
import GastosModalCreate from "../components/Gastos/GastosModalCreate";
import GastosModalDelete from "../components/Gastos/GastosModalDelete";
import GastosModalUpdate from "../components/Gastos/GastosModalUpdate";
import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useFilters } from "../hooks/useFilters";





const GastosListPage = () => {
    const {
        gastos,
        gastoSelected,
        openModalCreateGasto,
        totalGastos,
        loading,
        getGastos,
        
    } = useContext(GastosContext)
    
    const{query}=useContext(AuthContext)

    const {prevPage, nextPage, listFilter} = useFilters()

    useEffect(()=>{
        getGastos()
    },[])
    console.log(gastos)
   
  return (
    <div className="container-sm">
        {loading?
            <AlertLoading />
            :
            <>
            <GastosListHeader gastos={gastos} totalGastos={totalGastos} query={query} />
            <div className="my-2">
                <button onClick={openModalCreateGasto} className="btn btn-success">Crear Gasto</button>
            </div>
            {
                gastos.message?
                    <AlertMessage message={'No se han creado gastos.'} />
                :
                    <>
                    {listFilter(gastos,'gastos').map((gasto, index)=>(
                        <Card key={gasto.id} className='mb-3 shadow rounder'>
                            <CardBody>
                                <div className="d-flex flex-wrap justify-content-between">
                                    <span># {index+1}</span>
                                    <h2 className="text-capitalize text-secondary">{gasto.tipo_gasto?.tipo_gasto}</h2>
                                    <span></span>
                                </div>
                                <div className="d-flex flex-wrap justify-content-around">
                                    <span className="badge bg-secondary">Fecha: {gasto.fecha}</span>
                                    <span className="badge bg-success">Valor: {gasto.valor}</span>
                                </div>  
                                <div className="d-flex flex-wrap justify-content-around mt-2">
                                    <p className="badge bg-light text-secondary">Comentario: {gasto.comentario}</p>
                                </div>
                                <div className="d-flex flex-wrap justify-content-around mt-1">
                                    <button onClick={()=>gastoSelected(gasto,'Editar')} className="btn btn-warning">Actualizar</button>
                                    <button onClick={()=>gastoSelected(gasto,'Eliminar')} className="btn btn-danger">ELiminar</button>
                                </div>

                            </CardBody>
                        </Card>
                       

                    ))
                        
                    }
                    {listFilter(gastos,'gastos').length === 0?
                        <AlertMessage message={'No se encontraron gastos en la búsqueda'} />:null   
                }
                     <div className='d-flex justify-content-around mb-4'>
                            <button onClick={prevPage} className='btn btn-outline-secondary btn-sm'>Atras</button>
                            <button onClick={nextPage} className='btn btn-outline-secondary btn-sm'>Siguiente</button>
                     </div>
                    </>
            }

           <GastosModalCreate />
           <GastosModalUpdate />
           <GastosModalDelete />
           </>
        }
        </div>
    
  )
}

export default GastosListPage