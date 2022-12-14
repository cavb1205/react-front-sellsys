import React, { useContext, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Badge, Card, CardBody } from 'reactstrap'

import AlertMessage from '../components/Utils/AlertMessage'
import VentasListHeader from '../components/Ventas/VentasListHeader'
import { AuthContext } from '../context/AuthContext'



import { VentasContext } from '../context/VentasContext'

const VentasPagasListPage = () => {
    const {
        getVentasPagas,
        ventasPagas,
        totalVentasPagas,
    } = useContext(VentasContext)

    const {query} = useContext(AuthContext)

    useEffect(()=>{
        getVentasPagas()
    },[])
  return (
    <div className='container-sm '>

        <VentasListHeader titulo={'Ventas Pagas'} ventas={ventasPagas}/>
        {ventasPagas.message?<AlertMessage message={'No hay ventas para mostrar'} />:
        <>
        {ventasPagas.filter(venta => venta.cliente.nombres.toLowerCase().includes(query) || venta.cliente.apellidos.toLowerCase().includes(query)).map((venta)=>(
            
            <Card key={venta.id} className='mb-3 shadow rounder'>
                
                <CardBody>
                
                    <div className="d-flex flex-wrap justify-content-around">
                     
                        <div className=' d-flex flex-row justify-content-around'>
                            <div className='p-1'>
                                <h2 className='text-capitalize text-secondary'>  {venta.cliente?.nombres} {venta.cliente?.apellidos}</h2>
                            </div> 
                            <div className='p-2'>
                                <Badge color={venta.estado_venta=='Vencido'?'danger':venta.estado_venta=='Atrasado'?'warning':'secondary'} pill>{venta.estado_venta}</Badge>
                            </div>
                        </div>
                        <div>
                            <button className='btn btn-light'>Saldo: {venta.saldo_actual}</button>                       
                        </div>
                        
                    </div>
                        
                    <div className='text-center'>
                        <small className='text-secondary'>Fecha Venta: {venta.fecha_venta}</small>
                    </div>
                
                    <div className='d-flex flex-wrap justify-content-around my-2'>
                        <h6>Días Pendientes <span className="badge bg-secondary">{venta.pagos_pendientes}</span></h6>
                        <h6>Días Atrasados <span className="badge bg-danger">{venta.dias_atrasados<=0?0:venta.dias_atrasados}</span></h6>
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
        {ventasPagas.filter(venta => venta.cliente.nombres.toLowerCase().includes(query)|| venta.cliente.apellidos.toLowerCase().includes(query)).length === 0?
                            <AlertMessage message={'No se encontraron ventas en la búsqueda'} />:null   
                        }
        </>
        }

       
    </div>
  )
}

export default VentasPagasListPage