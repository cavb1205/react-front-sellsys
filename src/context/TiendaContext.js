import React,{createContext,useContext,useState,useEffect} from 'react'
import { AportesContext } from './AportesContext'
import { AuthContext } from './AuthContext'
import { GastosContext } from './GastosContext'
import { RecaudosContext } from './RecaudosContext'
import { UtilidadesContext } from './UtilidadesContext'
import { VentasContext } from './VentasContext'

import { URL } from '../config'

const TiendaProvider = ({children}) => {
    let {token,logoutUser} = useContext(AuthContext) 

    const {aportes} = useContext(AportesContext)
    const {gastos} = useContext(GastosContext)
    const {utilidades} = useContext(UtilidadesContext)
    const {ventas,ventasPagas,} = useContext(VentasContext)
    const {recaudos} = useContext(RecaudosContext)
    
    const [tienda, setTienda] = useState([])
    const [tiendas, setTiendas] = useState([])
    const [loading, setLoading] = useState(true)
    const [openModal, setOpenModal] = useState(false)

    const [cajaAnterior, setCajaAnterior] = useState({})
    const [cierresCaja, setCierresCaja] = useState([])
    const [openModalDelete, setOpenModalDelete] = useState(false)

    const [error, setError] = useState(null)
    
    const [cierre, setCierre]=useState({})


    
  const openModalCierreCaja = () => {
    setOpenModal(!openModal)
  }

  const openModalDeleteCierre = (cierre) => {
    setCierre(cierre)
    setOpenModalDelete(!openModalDelete)
  }

  const getAllTiendas = async () => {
    let response = await fetch(`${URL}/tiendas/list/`,{
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
      }
    })
    let data = await response.json();
    if(response.status===200){
        setTiendas(data);
        setLoading(false)
    }else if(response.statusText == 'Unauthorized'){
        logoutUser()
    }
  }
  
 
  const getTienda = async () => {
    let response = await fetch(`${URL}/tiendas/detail/`,{
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
      }
    })
    let data = await response.json();
    if(response.status===200){
        setTienda(data);
        setLoading(false)
    }else if(response.statusText == 'Unauthorized'){
        logoutUser()
    }
  }

  const getTiendaMembresia = async () => {
    let response = await fetch(`${URL}/tiendas/detail/`,{
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
      }
    })
    let data = await response.json();
    if(response.status===200){
        setTienda(data);
        setLoading(false)
    }else if(response.statusText == 'Unauthorized'){
        logoutUser()
    }
  }

  const getCierresCaja = async () => {
    try{

      let response = await fetch(`${URL}/tiendas/cierres/`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
      })
      let data = await response.json();
      if(response.status===200){          
          setCierresCaja(data);
          setLoading(false)
      }else if(response.statusText == 'Unauthorized'){
          logoutUser()
      }
      else {
        setError(data)
      }
    } catch{
      alert('Error al cargar la información, por favor intente de nuevo.')
      setLoading(false)
    }
  }

  const getCierreCaja = async (fecha) => {
    let response = await fetch(`${URL}/tiendas/cierre/${fecha}/`,{
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
      }
    })
    let data = await response.json();
    if(response.status===200){
        setCajaAnterior(data);
        setLoading(false)
    }else if(response.statusText == 'Unauthorized'){
        logoutUser()
    }
  }

  const deleteCierresCaja = async (cierreId) => {
    try{
      let response = await fetch(`${URL}/tiendas/cierre/delete/${cierreId}/`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
      })
      let data = await response.json();
      if(response.status===200){          
          setOpenModalDelete(!openModalDelete)
          getCierresCaja()
          setLoading(false)
      }else if(response.statusText == 'Unauthorized'){
          logoutUser()
      }
      else {
        setError(data)
      }
    } catch{
      alert('Error al cargar la información, por favor intente de nuevo.')
      setLoading(false)
    }
  }

  const postCierreCaja = async (fecha) => {
    console.log('ingresa a post cierre caja')
    let response = await fetch(`${URL}/tiendas/cierre/post/${fecha}/`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
    let data = await response.json();
    if (response.status === 200){
      setOpenModal(!openModal)
      alert('Cierre de Caja Exitoso')
    }else if(response.statusText == 'Unauthorized'){
      logoutUser()
  }
  }

    const contextData = {
        tienda,
        loading,
        getTienda,
        openModalCierreCaja,
        openModal,
        getCierreCaja,
        cajaAnterior,
        postCierreCaja,
        getCierresCaja,
        cierresCaja,
        openModalDeleteCierre,
        openModalDelete,
        cierre,
        deleteCierresCaja,
        getAllTiendas,
        tiendas,
        getTiendaMembresia,
    }
  return (
    <TiendaContext.Provider value={contextData}>
        {children}
    </TiendaContext.Provider>
  )
}


export const TiendaContext = createContext();
export default TiendaProvider;
