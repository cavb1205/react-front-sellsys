import React,{useContext,useEffect} from 'react';
import { Card, CardBody} from 'reactstrap';




import { Link } from 'react-router-dom';
import { TrabajadoresContext } from '../context/TrabajadoresContext';
import TrabajadoresListHeader from '../components/Trabajadores/TrabajadoresListHeader';

import AlertMessage from '../components/Utils/AlertMessage';

import TrabajadorModalCreate from '../components/Trabajadores/TrabajadorModalCreate';


import { AuthContext } from '../context/AuthContext';
import { useFilters } from '../hooks/useFilters';
import AlertLoading from '../components/Utils/AlertLoading';
import AlertError from '../components/Utils/AlertError';


const TrabajadoresListPage = () => {
    

    const {
        trabajadores,
        
        openModalCreateTrabajador,

        trabajadoresFiltrados,
        loading,
        getTrabajadores,
        error,    
    } = useContext(TrabajadoresContext);
    
    const {query} = useContext(AuthContext)
    const {listFilter,prevPage, nextPage, currentPage, ITEMS} = useFilters()
    
    useEffect(()=>{
        getTrabajadores()
    },[])
    
  return (
    <div className="container-sm">
            {loading? 
                <AlertLoading />
                :
                <>
            <TrabajadoresListHeader trabajadores={trabajadores} query={query} />
            <div className="my-2">
                <button onClick={openModalCreateTrabajador} className="btn btn-success">Crear Trabajador</button>
            </div>
            {
                trabajadores.message?
                    <AlertMessage message={trabajadores.message} />
                :
                    <>
                        {listFilter(trabajadores,'trabajadores').map((trabajador, index)=>(
                            <Card key={trabajador.id} className='mb-3 shadow rounder'>
                                <CardBody>
                                    <div className="d-flex flex-wrap justify-content-center ">
                                        <h2 className="text-capitalize text-secondary mx-4 ">{trabajador.trabajador}</h2>
                                    </div>
                                    <div className="d-flex flex-wrap justify-content-center">
                                        <span className="badge text-bg-light">{trabajador.identificacion} </span>
                                    </div>  
                                    <div className="d-flex flex-wrap justify-content-around mt-2">
                                        <span className="badge bg-light text-secondary">Direccion: {trabajador.direccion} </span>
                                    </div>
                                    <div className="d-flex flex-wrap justify-content-around">
                                        <span className="badge bg-light text-secondary">Teléfono: {trabajador.telefono} </span>
                                    </div>
                                    <div className="d-flex flex-wrap justify-content-around mt-2">
                                       <Link to={`/trabajadores/${trabajador.id}/`}><button  className="btn btn-primary">Ver Más</button></Link>
                                    </div>
                                </CardBody>
                            </Card>
                        

                        ))
                            
                        }
                        {listFilter(trabajadores,'trabajadores').length === 0?
                            <AlertMessage message={'No se encontraron trabajadores en la búsqueda'} />:null   
                        }
                        <div className='d-flex justify-content-around mb-4'>
                            <button onClick={prevPage} className='btn btn-outline-secondary btn-sm'>Atras</button>
                            <button onClick={nextPage} className='btn btn-outline-secondary btn-sm'>Siguiente</button>
                        </div>
                    </>
            }

         <TrabajadorModalCreate />

         </>
}
        </div>
  )
}

export default TrabajadoresListPage