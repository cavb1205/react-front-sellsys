import React,{useContext,useEffect} from 'react'

import HomePageHeader from '../components/HomePage/HomePageHeader'
import HomePageTiendaCaja from '../components/HomePage/HomePageTiendaCaja'
import HomePageTiendaCardItem from '../components/HomePage/HomePageTiendaCardItem'
import HomePageTiendaGraphip from '../components/HomePage/HomePageTiendaGraphip'

import AlertLoading from '../components/Utils/AlertLoading'

import { AportesContext } from '../context/AportesContext'
import { GastosContext } from '../context/GastosContext'
import { UtilidadesContext } from '../context/UtilidadesContext'

import { TiendaContext } from '../context/TiendaContext'
import { VentasContext } from '../context/VentasContext'

import { RecaudosContext } from '../context/RecaudosContext'
import { Link } from 'react-router-dom'
import CierreCajaModal from '../components/Informes/CierreCajaModal'



const HomePage = () => {
  
  const {
    tienda,
    loading,
    getTienda,
    openModalCierreCaja,
    
  }=useContext(TiendaContext)

  

  const {totalAportes, getAportes} = useContext(AportesContext)
  const {totalGastos, getGastos} = useContext(GastosContext)
  const {totalUtilidades, getUtilidades} = useContext(UtilidadesContext)
  const {totalVentasInteres,totalIngresosVentasFinalizadas,getVentasActivas,getVentasPagas,getAllVentas} = useContext(VentasContext)
  const {getAllRecaudos} = useContext(RecaudosContext)
  
    useEffect(()=>{
       getTienda()
       getAportes()
       getGastos()
       getUtilidades()
       getAllVentas()
       getVentasActivas()
       getVentasPagas()
       getAllRecaudos()
       
    },[])

   

  return (
      
      <div className='container-sm'>

        {loading?
          <AlertLoading />
          :
          <>
          <HomePageHeader tienda={tienda}/>

          <div className='m-2 text-center'>
            <button onClick={openModalCierreCaja} type="button" className="btn btn-outline-danger btn-sm">Cierre Caja</button>
          </div>

          <div>

            <div className='d-flex justify-content-center'>
              <HomePageTiendaGraphip />
            </div>
        
            <div className='d-flex justify-content-center my-3'>              
                <HomePageTiendaCaja tienda={tienda} />
            </div>
            <h2 className='text-center text-secondary'>Estado Actual Ruta</h2>
              <div className='d-flex flex-wrap justify-content-evenly'>
                <div className='m-2 flex-fill' >
                  <HomePageTiendaCardItem tipo={"Inversión"} tienda={tienda} total={totalAportes()}/>
                </div>
                <div className='m-2 flex-fill'>
                  <HomePageTiendaCardItem tipo={"Gastos"} tienda={tienda} total={totalGastos()}/>
                </div>
                <div className='m-2 flex-fill'>
                  <HomePageTiendaCardItem tipo={"Utilidades"} tienda={tienda} total={totalUtilidades()}/>
                </div>
                <div className='m-2 flex-fill'>
                  <HomePageTiendaCardItem tipo={"Pérdidas"} tienda={tienda} total={0}/>
                </div>
                <div className='m-2 flex-fill'>
                  <HomePageTiendaCardItem tipo={"Ingresos x Ventas"} tienda={tienda} total={totalIngresosVentasFinalizadas()}/>
                </div>
                
                <div className='m-2 flex-fill'>
                  <HomePageTiendaCardItem tipo={"Dinero x Cobrar"} tienda={tienda} total={totalVentasInteres()}/>
                </div>
              </div>
            
        </div>
        </>
        }

        <CierreCajaModal />
      </div>

  
  )
}

export default HomePage


