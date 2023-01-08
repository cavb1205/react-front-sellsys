import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Card, CardBody } from 'reactstrap'
import LiquidarVentasListHeader from '../components/Recaudos/LiquidarVentasListHeader'
import RecaudosModalCreate from '../components/Recaudos/RecaudosModalCreate'
import RecaudosModalNoPago from '../components/Recaudos/RecaudosModalNoPago'
import AlertMessage from '../components/Utils/AlertMessage'
import AlertLoading from '../components/Utils/AlertLoading'
import { RecaudosContext } from '../context/RecaudosContext'
import { VentasContext } from '../context/VentasContext'
import {TiendaContext} from '../context/TiendaContext'
import { useFilters } from '../hooks/useFilters'

const LiquidarVentasCardListPage = () => {
    const {getTienda} = useContext(TiendaContext)
    const {
        getVentasLiquidar,
        handleSearch,
        ventas,
        loading,
    } = useContext(VentasContext)

    const {
        SelectedRecaudo,
        selectedNoPago,
        recaudos,
        newRecaudo,
        liquidarDate,
        getRecaudosFecha,
    } = useContext(RecaudosContext)

    const {listFilter,prevPage, nextPage} = useFilters()

    useEffect(()=>{
        getTienda()
        getVentasLiquidar(liquidarDate.fecha_liquidar)
    },[recaudos,newRecaudo,liquidarDate])

    useEffect(()=>{
        getRecaudosFecha(liquidarDate.fecha_liquidar)
    },[liquidarDate,newRecaudo])

   
  return (
    <div className='container-sm '>
        {loading?
            <AlertLoading />
            :
            <>
            <LiquidarVentasListHeader ventas={ventas} handleSearch={handleSearch} />
            {ventas.message?<AlertMessage message={'No hay ventas para liquidar el día de hoy'} />:
            <>
            {listFilter(ventas,'liquidar').map((venta)=>(
                
                <Card key={venta.id} className='mb-3 shadow rounder'>
                    
                    <CardBody>
                    <Link className='text-decoration-none' to={`/ventas/${venta.id}/`}>
                        <div className="d-flex flex-wrap justify-content-around">
                        
                            <div className=' d-flex flex-row justify-content-around'>
                                <div className='p-1'>
                                    <h2 className='text-capitalize text-secondary'>  {venta.cliente?.nombres} {venta.cliente?.apellidos}</h2>
                                </div> 
                                <div className='p-2'>
                                    <Badge color={venta.estado_venta=='Vencido'?'danger':venta.estado_venta=='Atrasado'?'warning':'success'} pill>{venta.estado_venta}</Badge>
                                </div>
                            </div>
                            <div>
                                <button className='btn btn-light'>Saldo: {venta.saldo_actual}</button>                       
                            </div>
                            
                        </div>
                            
                        <div className='text-center'>
                            <small className='text-secondary'>Fecha Venta: {venta.fecha_venta}</small>
                        </div>
                    </Link>
                        <div className='d-flex flex-wrap justify-content-around my-2'>
                            <h6>Días Pendientes <span className="badge bg-secondary">{venta.pagos_pendientes}</span></h6>
                            {
                                (venta.dias_atrasados < 0)?
                                    <h6>Días Adelantados <span className="badge bg-success">{Math.abs(venta.dias_atrasados)}</span></h6>    
                                :
                                <h6>Días Atrasados <span className="badge bg-danger">{venta.dias_atrasados}</span></h6>
                            }   
                            <h6>Días Abonados <span className="badge bg-success">{venta.pagos_realizados}</span></h6>
                        </div>

                        <div className='text-center mb-3'>
                            <h5>Cuota <span className="badge bg-secondary">{venta.valor_cuota}</span></h5>
                        </div>
                        <div className='d-flex flex-wrap justify-content-around'>
                            <button onClick={()=>selectedNoPago(venta)} className='btn btn-danger mb-2'>No Pagó</button>
                            <button onClick={()=>SelectedRecaudo(venta)} className='btn btn-success mb-2'>Abonar</button>
                        </div>
                    </CardBody>
                </Card>    

            ))
            }
            {listFilter(ventas,'liquidar').length === 0?
                <AlertMessage message={'No se encontraron ventas en la búsqueda'} />:null   
            }
            <div className='d-flex justify-content-around mb-4'>
                    <button onClick={prevPage} className='btn btn-outline-secondary btn-sm'>Atras</button>
                    <button onClick={nextPage} className='btn btn-outline-secondary btn-sm'>Siguiente</button>
            </div>
            </>
            }

            <RecaudosModalCreate />
            <RecaudosModalNoPago />
            </>
        }
    </div>
  )
}

export default LiquidarVentasCardListPage