import React,{useContext,useEffect} from 'react';

import { TrabajadoresContext } from '../context/TrabajadoresContext';
import TrabajadoresListHeader from '../components/Trabajadores/TrabajadoresListHeader';
import AlertMessage from '../components/Utils/AlertMessage';
import TrabajadorModalCreate from '../components/Trabajadores/TrabajadorModalCreate';

import { AuthContext } from '../context/AuthContext';
import { useFilters } from '../hooks/useFilters';
import AlertLoading from '../components/Utils/AlertLoading';

import TrabajadorListItem from '../components/Trabajadores/TrabajadorListItem';


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
                            <TrabajadorListItem key={trabajador.id} trabajador={trabajador}/>
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