import React, { useContext, useEffect } from 'react'
import { Modal, ModalHeader } from 'reactstrap'
import { AportesContext } from '../../context/AportesContext'
import { GastosContext } from '../../context/GastosContext'
import { RecaudosContext } from '../../context/RecaudosContext'
import { TiendaContext } from '../../context/TiendaContext'
import { UtilidadesContext } from '../../context/UtilidadesContext'
import { VentasContext } from '../../context/VentasContext'
import useDateFilter from '../../hooks/useDateFilter'
import useTotalResume from '../../hooks/useTotalResume'

const CierreCajaModal = () => {
    const {
        openModal,
        openModalCierreCaja,
        getCierreCaja,
        cajaAnterior,
        tienda,
        postCierreCaja,
    } = useContext(TiendaContext)


    const {aportes} = useContext(AportesContext)
    const {allRecaudos} = useContext(RecaudosContext)
    const {allVentas} = useContext(VentasContext)
    const {gastos} = useContext(GastosContext)
    const {utilidades} = useContext(UtilidadesContext)

    const {fecha,dateChange} = useDateFilter()
    const {itemsDia} = useTotalResume()

    useEffect(()=>{
        getCierreCaja(fecha)
    },[fecha])

    const totalCaja = () => {
        return (parseInt(cajaAnterior.valor)) + itemsDia(aportes,'aportes',fecha) + itemsDia(allRecaudos,'recaudos',fecha) - itemsDia(allVentas,'ventasNetas',fecha) - itemsDia(gastos,'gastos',fecha) - itemsDia(utilidades,'utilidades',fecha) 
    }
    
  return (
    <Modal isOpen={openModal} toggle={openModalCierreCaja}>
        <ModalHeader toggle={openModalCierreCaja}>
            Cierre Caja <input type='date' value={fecha} onChange={dateChange} className='btn btn-outline-primary btn-sm mx-3 mb-1'></input>
            <br /   >
            {!cajaAnterior.valor?
                <small className='badge rounded-pill text-bg-danger'>No se ha cerrado la caja del día anterior!!</small>:null
            }
        </ModalHeader>
        <div className='container-sm'>

            <table className='table'>
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='table-light'>
                        <td>Fecha Cierre</td>
                        <td className='text-secondary'>{fecha}</td>
                    </tr>
                    <tr className='table-light'>
                        <td>Caja Inicial</td>
                        {cajaAnterior.valor
                            ?
                            <td className='text-secondary'>{cajaAnterior.valor}</td>
                            :
                            <td className='text-secondary'>0</td>
                        }
                    </tr>
                    <tr className='table-light'>
                        <td>Ingresos Aportes</td>
                        <td className='text-success'>{itemsDia(aportes,'aportes',fecha)}</td>
                    </tr>
                    <tr className='table-light'>
                        <td>Ingresos Recaudos</td>
                        <td className='text-success'> {itemsDia(allRecaudos,'recaudos',fecha)}</td>
                    </tr>
                    <tr className='table-light'>
                        <td>Salida x Ventas</td>
                        <td className='text-danger'> {itemsDia(allVentas,'ventasNetas',fecha)}</td>
                    </tr>
                    <tr className='table-light'>
                        <td>Salida x Gastos</td>
                        <td className='text-danger'> {itemsDia(gastos,'gastos',fecha)}</td>
                    </tr>
                    <tr className='table-light'>
                        <td>Salida x Utilidades</td>
                        <td className='text-danger'> {itemsDia(utilidades,'utilidades',fecha)}</td>
                    </tr>
                    <tr className={totalCaja() < 0 ?`table-danger`:'table-success'}>
                        <td>Total Caja</td>
                        {totalCaja()?
                            <td>{totalCaja()}</td>
                            :
                            <td className='text-danger'>Sin Registro</td>                                                
                        }                        
                    </tr>
                </tbody>
            </table>
        </div>
        <div className='d-flex justify-content-evenly m-4'>
            <button onClick={()=>postCierreCaja(fecha)}  className='btn btn-danger'>Cerrar Caja</button>
            <button onClick={openModalCierreCaja} className='btn btn-secondary'>Cancelar</button>
        </div>
    </Modal>
  )
}

export default CierreCajaModal