import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { VentasContext } from '../../context/VentasContext'
import AlertMessage from '../Utils/AlertMessage'
import { RecaudosContext } from '../../context/RecaudosContext'
import { Card, CardBody } from 'reactstrap'
import VentasModalDelete from './VentasModalDelete'
import VentasModalUpdate from './VentasModalUpdate'

const VentasDetailPage = (props) => {
    const {
        getVenta,
        ventaDetail,
        openModalDeleteVenta,
        openModalUpdateVenta,
    } = useContext(VentasContext)

    const {
        recaudos,
        openModalDetailRecaudoItem,
        setOpenModalDetailRecaudoItem,
        totalRecaudosVenta,
        getRecaudos,
    } = useContext(RecaudosContext)

    const {ventaId} = useParams()

    useEffect(()=>{
        getVenta(ventaId)
        getRecaudos(ventaId)
    },[])

    useEffect(()=>{
        getVenta(ventaId)
    },[recaudos])

    const [recaudo, setRecaudo] = useState({})

    const SelectedRecaudoItem = (recaudo) => {
        setRecaudo(recaudo);
        setOpenModalDetailRecaudoItem(!openModalDetailRecaudoItem)
    }
   
  return (
    <div className='container-sm'>

        <div className='card shadow p-3 mb-5 bg-body rounded'>
        <div className="card">
            <div className='card-header'>
                <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" id='detailVenta-tab' data-bs-toggle="tab" data-bs-target="#detailVenta" aria-current="true">Venta</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id='abonosVenta-tab' data-bs-toggle="tab" data-bs-target="#abonosVenta" >Abonos</a>
                    </li>
                </ul>
            </div>

            {/* VENTA DETAIL */}
            <div className="card-body tab-content" id='myTabContent'>
                <div className='tab-pane fade show active' id="detailVenta" role="tabpanel">
                    
                    <h1 className="card-title">{ventaDetail.cliente?.nombres} {ventaDetail.cliente?.apellidos}</h1>
                    
                    <h5>Saldo Actual: <span className='badge rounded-pill bg-danger'>{ventaDetail.saldo_actual} </span></h5>
                    <p><strong>Fecha Venta:</strong> {ventaDetail.fecha_venta}</p>
                    <p><strong>Valor de la Venta:</strong> {ventaDetail.valor_venta}</p>
                    <p><strong>Interés:</strong> {ventaDetail.interes}% <span className='m-3'><strong>Cuotas:</strong> {ventaDetail.cuotas}</span></p>
                    <p><strong>Valor Cuota:</strong> {ventaDetail.valor_cuota}</p>
                    <p><strong>Total a Pagar:</strong> {ventaDetail.total_a_pagar} </p>
                    {ventaDetail.comentario?<p><strong>Comentario:</strong> {ventaDetail.comentario}</p>:null}
                    <p><strong>Días Pagos:</strong> {ventaDetail.pagos_realizados} <span className='m-3'><strong>Días Faltantes:</strong> {ventaDetail.pagos_pendientes}</span></p>
                    <p><strong>Fecha Vencimiento:</strong> {ventaDetail.fecha_vencimiento}</p>
                    <p>
                        <strong>
                            Estado de la Venta:
                        </strong>
                        {
                            ventaDetail.estado_venta=='Vencido'?
                                <span className='badge rounded-pill bg-danger'>{ventaDetail.estado_venta}</span>
                            :ventaDetail.estado_venta=='Atrasado'?
                                <span className='badge rounded-pill bg-warning'>{ventaDetail.estado_venta}</span>
                            :ventaDetail.estado_venta=='Vigente'?<span className='badge rounded-pill bg-success'>{ventaDetail.estado_venta}</span>
                            :<span className='badge rounded-pill bg-secondary'>{ventaDetail.estado_venta}</span>
                        }
                    </p>
                    {
                        (ventaDetail.dias_atrasados < 0) ?
                            <p><strong>Pagos Adelantados:</strong> <span className='badge rounded-pill bg-success'>{Math.abs(ventaDetail.dias_atrasados)}</span> </p>    
                        :
                            <p><strong>Pagos Atrasados:</strong> <span className='badge rounded-pill bg-danger'>{ventaDetail.dias_atrasados}</span> </p>
                    }
                    <p><strong>Promedio de Pago:</strong> {ventaDetail.promedio_pago} </p>
                    <p><strong>Total Abonado: <span className='badge rounded-pill bg-success'>{ventaDetail.total_abonado}</span> </strong></p>
                
                    <div className='card-footer d-flex flex-wrap justify-content-around'>
                        <button onClick={openModalUpdateVenta} className='btn btn-warning mb-2'>Actualizar</button>{' '}
                        <button onClick={openModalDeleteVenta}  className='btn btn-danger mb-2'>Eliminar</button>{' '}
                        <Link to={`/liquidar/`}  className='btn btn-secondary mb-2'>Lista Ventas</Link>
                    </div>
                
                </div>
                
                {/* ABONOS */}
                <div className='tab-pane fade show' id="abonosVenta" role="tabpanel">
                    <h3 className='text-center'>Total Abonado: <span className='badge rounded-pill bg-success'>{recaudos.message?0:totalRecaudosVenta()}</span></h3>
                    <div className='text-center mb-1'>
                        <span className='badge rounded-pill text-bg-light text-center'># Pagos {recaudos.length}</span>
                    </div>
                    {recaudos.message?<AlertMessage message={'No existen abonos en la venta'}/>
                    :
                    <>
                    {recaudos.map((recaudo)=>(
                        <Link key={recaudo.id} className='text-decoration-none' to={`/recaudos/${recaudo.id}/`}>
                            <Card className='mb-2 shadow rounder'>
                                <CardBody>
                                    <div className="d-flex flex-wrap justify-content-around">
                                        <small className='text-secondary'>{recaudo.fecha_recaudo}</small>
                                        <h2 className="text-capitalize text-success">{recaudo.valor_recaudo}</h2>
                                        <button className='btn btn-outline-primary btn-sm'>Ver</button>
                                    </div>
                                    {recaudo.visita_blanco?
                                        <div className=" text-center">
                                            <small className="badge bg-light text-secondary">{recaudo.visita_blanco?.tipo_falla} </small> <br />
                                        </div>
                                        :null
                                    }
                                    
                                </CardBody>
                            </Card>
                        </Link>
                    ))
                    }
                    </>
}
                </div>

            </div>
            
            
            </div>
        </div>

        
    <VentasModalUpdate />
    <VentasModalDelete />
    </div>
      )
    
}

export default VentasDetailPage