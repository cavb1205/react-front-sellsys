import React, { createContext, useContext, useEffect, useState } from 'react'

import { URL } from '../config'
import { AuthContext } from './AuthContext'
import {createUtcDateIso} from '../hooks/useDate'


const VentasProvider = ({children}) => {
    const {
        token,
        logoutUser,
        navigate,
    } = useContext(AuthContext)
    
   
    const [allVentas,setAllVentas] = useState([])
    const [ventas,setVentas] = useState([])
    const [venta, setVenta] = useState({})
    const [ventaDetail, setVentaDetail] = useState({})
    const [ventasPagas, setVentasPagas] = useState([])


    const [loading, setLoading] = useState(true)
    const [serverError, setServerError] = useState(false)
    const [error, setError] = useState(null)
    const [response, setResponse] = useState({})
    
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalResponse, setOpenModalResponse] = useState(false)

    
    const [openModalDetailRecaudoItem, setOpenModalDetailRecaudoItem] = useState(false)
    



    const [newVenta, setNewVenta] = useState({
        'fecha_venta':createUtcDateIso(),
        'valor_venta':'',
        'interes':'',
        'cuotas':'',
        'comentario':'',
        'cliente':'',
        'fecha_vencimiento':'',
        'saldo_actual':''
    })
    
    const getAllVentas = async () => {
        try{
            let response = await fetch(`${URL}/ventas/`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
            })
            let data = await response.json();
            if(response.status===200){
                setAllVentas(data);
                setLoading(false);
            }else if(response.statusText == 'Unauthorized'){
                logoutUser()
            }
        }catch{
            setServerError(true);
            setLoading(false);
        }
    }

    const getVentasActivas = async () => {
        try{
            let response = await fetch(`${URL}/ventas/activas/`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
            })
            let data = await response.json();
            if(response.status===200){
                setVentas(data);
                setLoading(false);
            }else if(response.statusText == 'Unauthorized'){
                logoutUser()
            }
        }catch{
            setServerError(true);
            setLoading(false);
        }
    }

    const getVentasLiquidar = async (date) => {
        try{
            let response = await fetch(`${URL}/ventas/activas/liquidar/${date}/`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
            })
            let data = await response.json();
            if(response.status===200){
                setVentas(data);
                setLoading(false);
            }else if(response.statusText == 'Unauthorized'){
                logoutUser()
            }
        }catch{
            setServerError(true);
            setLoading(false);
        }
    }

    

    const getVentasPagas = async () => {
        try{
            let response = await fetch(`${URL}/ventas/pagas/`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
            })
            let data = await response.json();
            if(response.status===200){
                setVentasPagas(data);
            }else if(response.statusText == 'Unauthorized'){
                logoutUser()
            }
        }catch{
            setServerError(true);
        }
    }
    console.log(newVenta)

    const ventasCreateItem = async (event)=>{
        try {
                const response = await fetch(`${URL}/ventas/create/`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${token}`,
                    },
                    body: JSON.stringify(newVenta)
                    
                })
                const data = await response.json()
                if (response.status === 200){
                    setOpenModalCreate(!openModalCreate)
                    alert('Venta creada...')
                    navigate('/ventas/')
                    getVentasActivas()
                }else if(response.statusText == 'Unauthorized'){
                    logoutUser()
                }else{
                    setError(data)
                }
            } 
         catch {
            alert('Error al cargar los datos, intente de nuevo!')
            setLoading(false)
        }
    }


    const getVenta = async (ventaId) => {
        try {
            setLoading(true)
            const response = await fetch(`${URL}/ventas/${ventaId}/`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
            })
            const data = await response.json();
            if(response.status === 200){
                setVentaDetail(data)
                console.log('guarda la venta')
                setLoading(false)
            } else if(response.statusText=='Unauthorized'){
                logoutUser()
            }
    
        } catch {
            setServerError(true)
            setLoading(false)
        }
            
    }

    const ventaUpdateItem = async () => {
        try {
            console.log('detalle')
            console.log(ventaDetail)
            let response = await fetch(`${URL}/ventas/${ventaDetail.id}/update/`,{
                method:'PUT',
                headers:{
                  'Content-Type':'application/json',
                  'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify(ventaDetail)
              })
              let data = await response.json();
              if (response.status === 200){
                  setOpenModalUpdate(!openModalUpdate)
                  navigate('/ventas/')
                  getVentasActivas()
              }else if(response.statusText == 'Unauthorized'){
                logoutUser()
              }
        } catch {
            setServerError(true)
            setLoading(false)
        }
    }


    const ventaDeleteItem = async () => {
        try {
            let response = await fetch(`${URL}/ventas/${ventaDetail.id}/delete/`,{
              method:'DELETE',
              headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
              },
            })
            let data = await response.json();
            
            if (response.status === 200){
                setResponse(data)
                setOpenModalDelete(!openModalDelete)
                navigate('/ventas/')
                getVentasActivas()
            }
            else if (response.status === 406){
                
                setResponse(data)
                
                setOpenModalDelete(!openModalDelete)
                alert(data.message)
                
            }
            else if(response.statusText == 'Unauthorized'){
              logoutUser()
            }
        }catch {
            setServerError(true)
            setLoading(false)
        }
      }



    const Selected = (venta,option) => {
        setVenta(venta);
        
        if(option=='Editar'){
            setOpenModalUpdate(!openModalUpdate);
        } else{
            setOpenModalDelete(!openModalDelete)
        }
    }

  
    const handleChange = (event)=>{
        const {name,value} = event.target
        setNewVenta({
            ...newVenta,
            [name]:value
        })
    }

    const handleChangeUpdate = (event) => {
        const {name,value} = event.target
        setVentaDetail({
            ...ventaDetail,
            [name]:value
        })
    }

    const [query, setQuery]=useState('')
    
    const handleSearch = (event)=>{
        setQuery((event.target.value).toLowerCase())
    }

    //calculamos la suma de las utilidades
    const totalVentas = () => {
        if (ventas.message){
            return 0;
        }else {
            return ventas.map(venta => parseFloat(venta.valor_venta)).reduce((a,b) => a + b, 0);
        }
    }

    const totalVentasPagas = ()=>{
        if (ventasPagas.message){
            return 0;
        }else {
            return ventasPagas.map(venta => parseFloat(venta.valor_venta)).reduce((a,b) => a + b, 0);
        }
    }

    const totalVentasInteres = () => {
        
        if (ventas.message){
            return 0;
        }else{
            return ventas.map(venta => parseFloat(venta.saldo_actual)).reduce((a,b) => a + b, 0); 
        }
    }

    const totalIngresosVentasFinalizadas = () => {
        if (ventasPagas.message){
            return 0;
        }else{
            return ventasPagas.map(venta => parseFloat(venta.total_a_pagar - venta.valor_venta)).reduce((a,b)=>a + b,0)
        }
    }

    const totalRecaudar = () => {
        if (ventas.message){
            return 0;
        } else {
            return ventas.map(venta => parseFloat(venta.valor_cuota)).reduce((a,b) => a + b, 0)
        }
    }


    const openModalCreateVenta = () => {
        setOpenModalCreate(!openModalCreate);
        setNewVenta(
        {
            'fecha_venta':createUtcDateIso(),
            'valor_venta':'',
            'interes':20,
            'cuotas':20,
            'comentario':'',
            'cliente':'',
        })
    }

 

    const openModalUpdateVenta = () => {
        setOpenModalUpdate(!openModalUpdate);
    }

    const openModalDeleteVenta = () => {
        setOpenModalDelete(!openModalDelete);
    }

    const openModalDetailRecaudo = () => {
        setOpenModalDetailRecaudoItem(!openModalDetailRecaudoItem)
    }

  

    const contextData = {
        
        newVenta,
        allVentas,
        ventas,
        venta,
        ventaDetail,
        
        getVentasLiquidar,
        getAllVentas,
        ventasPagas,
        
        ventasCreateItem,
        ventaDeleteItem,
        ventaUpdateItem,
        getVenta,
        
        getVentasPagas,
        totalVentas,
        totalVentasInteres,
        totalVentasPagas,
        totalIngresosVentasFinalizadas,
        totalRecaudar,
        
        handleChange,
        handleChangeUpdate,
        Selected,
        
        handleSearch,

        openModalCreate,
        
        openModalUpdate,
        openModalDelete,
        openModalCreateVenta,
        
        getVentasActivas,
        openModalDeleteVenta,
        
        openModalUpdateVenta,
        
        
        openModalResponse,
        setOpenModalResponse,
        
        openModalDetailRecaudoItem,
        setOpenModalDetailRecaudoItem,
        openModalDetailRecaudo,

        loading,
        serverError,
        error,
        response,
        query,
    }

  return (
    <VentasContext.Provider value={contextData}>
        {children}
    </VentasContext.Provider>
  )
}

export const VentasContext = createContext();
export default VentasProvider;