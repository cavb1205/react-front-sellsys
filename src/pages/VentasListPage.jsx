import React, { useContext, useEffect } from 'react'

import AlertMessage from '../components/Utils/AlertMessage'
import AlertLoading from '../components/Utils/AlertLoading'
import VentasListHeader from '../components/Ventas/VentasListHeader'
import VentasModalCreate from '../components/Ventas/VentasModalCreate'
import { VentasContext } from '../context/VentasContext'
import { Link } from 'react-router-dom'
import { Badge, Card, CardBody } from 'reactstrap'
import { AuthContext } from '../context/AuthContext'
import { useFilters } from '../hooks/useFilters'

const VentasListPage = () => {
    const {
        ventasActivas,
        getVentasActivas,
        openModalCreateVenta,
        loading,
    } = useContext(VentasContext)

    const {query}=useContext(AuthContext)

    const {listFilter,prevPage, nextPage}=useFilters()
    
    useEffect(()=>{
        getVentasActivas();
    },[])
    
  return (
    <div className='container-sm '>
        {loading?
            <AlertLoading />
            :
            <>
            <VentasListHeader titulo={'Ventas Activas'} ventas={ventasActivas}/>
            <div className="my-2">
                <button onClick={openModalCreateVenta} className="btn btn-success">Crear Venta</button>
            </div>
            {ventasActivas.message?<AlertMessage message={'No hay ventas activas para mostrar'} />:
            <>
            {listFilter(ventasActivas,'ventas').map((venta)=>(
                
                <Card key={venta.id} className='mb-3 shadow rounder'>
                    
                    <CardBody>
                    
                        <div className="d-flex flex-wrap justify-content-around">
                        
                            <div className=' d-flex flex-row justify-content-around'>
                                <div className='p-1'>
                                    <h2 className='text-capitalize text-secondary'>  {venta.cliente?.nombres} {venta.cliente?.apellidos}</h2>
                                </div> 
                                <div className='p-2'>
                                    <Badge color={venta.estado_venta==='Vencido'?'danger':venta.estado_venta==='Atrasado'?'warning':'success'} pill>{venta.estado_venta}</Badge>
                                </div>
                            </div>
                            <div>
                                <button className='btn btn-outline-danger'>Saldo: {venta.saldo_actual}</button>                       
                            </div>
                            
                        </div>
                            
                        <div className='text-center'>
                            <small className='text-secondary'>Fecha Venta: {venta.fecha_venta}</small>
                        </div>
                    
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
                        <div className='d-flex flex-wrap justify-content-center'>
                            <Link to={`/ventas/${venta.id}/`}><button  className='btn btn-primary mb-2'>Ver Detalle</button></Link>
                        </div>
                    </CardBody>
                </Card>    

            ))
            }
            {listFilter(ventasActivas,'ventas').length === 0?
                <AlertMessage message={'No se encontraron ventas en la búsqueda'} />:null   
            }
            <div className='d-flex justify-content-around mb-4'>
                <button onClick={prevPage} className='btn btn-outline-secondary btn-sm'>Atras</button>
                <button onClick={nextPage} className='btn btn-outline-secondary btn-sm'>Siguiente</button>
            </div>
            </>
            }

            <VentasModalCreate />
        </>
        }
    </div>
  )
}

export default VentasListPage