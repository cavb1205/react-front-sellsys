import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'
import AlertLoading from '../components/Utils/AlertLoading'
import AlertMessage from '../components/Utils/AlertMessage.js'
import { RecaudosContext } from '../context/RecaudosContext'
import useDateFilter from '../hooks/useDateFilter'
import { useFilters } from '../hooks/useFilters'


const RecaudosListPage = () => {

    const {
        recaudos,
        getRecaudosFecha,
        totalRecaudosFecha,
        recaudoDeleteItem,
        loading,
    } = useContext(RecaudosContext)

    

    const {fecha, dateChange} = useDateFilter()
    const {nextPage,prevPage,listFilter} = useFilters()
    

    useEffect(()=>{
        getRecaudosFecha(fecha)
    },[fecha])
    
  return (
    <div className='container-sm'>

        <div className="text-center mb-1">
            <h1>Informe Recaudos</h1>
            {recaudos.message?
                <p className='badge rounded-pill text-bg-secondary'># Recaudos: 0</p>:
                <p className='badge rounded-pill text-bg-secondary'># Recaudos: {recaudos.length}</p>
            }
            <br />
            <p className='badge bg-success'>Total recaudado: {totalRecaudosFecha()}</p>
        </div>
        
        <div className='text-center mb-2'>
            <span className='badge bg-primary'>Fecha: <input onChange={dateChange} value={fecha} type="date" name='fecha'/></span>
        </div>
        {loading?
            <AlertLoading />
            :
            recaudos.message?
            <AlertMessage message={'No se encontraron datos con la fecha'} />
            :
            <>
                {listFilter(recaudos,'recaudos').map((recaudo,index)=>(
                    <Card key={recaudo.id} className='mb-3 shadow rounder'>
                    <Link className='text-decoration-none' to={`/recaudos/${recaudo.id}/`}>
                        <CardBody>
                            <div className="text-center">                            
                                <h2 className="text-capitalize text-secondary">{recaudo.venta?.cliente.nombres} {recaudo.venta?.cliente.apellidos}</h2>                            
                            </div>
                            <div className="d-flex flex-wrap justify-content-around mb-2">
                                <span className="badge bg-secondary">Fecha: {recaudo.fecha_recaudo} </span>
                                <span className="badge bg-success">Valor: {recaudo.valor_recaudo}</span>
                            </div>
                            {recaudo.visita_blanco?
                                <div className=" text-center mt-2">
                                    <p className="badge bg-light text-secondary">Falla: {recaudo.visita_blanco?.tipo_falla}</p> <br />
                                </div>
                                :null
                            }

                        </CardBody>
                    </Link>
                </Card>
                ))
                }
                {listFilter(recaudos,'recaudos').length === 0?
                    <AlertMessage message={'No se encontraron recaudos en la búsqueda'} />:null   
                }
                <div className='d-flex justify-content-around mb-4'>
                    <button onClick={prevPage} className='btn btn-outline-secondary btn-sm'>Atras</button>
                    <button onClick={nextPage} className='btn btn-outline-secondary btn-sm'>Siguiente</button>
                </div>
            </>
        }
        
    </div>
    
  )
}

export default RecaudosListPage 