import React, {  createContext, useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import { URL } from '../config'
import {createUtcDateIso} from '../hooks/useDate'

const RecaudosProvider = ({children}) => {
    const {
        token,
        logoutUser,
        navigate,
        
        
    } = useContext(AuthContext)

    
    const [venta, setVenta] = useState({})
    
    const [ventaDetail, setVentaDetail] = useState({})
    
    const [allRecaudos, setAllRecaudos] = useState([])
    const [recaudos, setRecaudos] = useState([])
    const [recaudo, setRecaudo] = useState({})

    const [newRecaudo, setNewRecaudo] = useState({
        'fecha_recaudo':'',
        'valor_recaudo':'',
        'venta':'',
        'tienda':'',
    })
  
    const [openModalNoPago, setOpenModalNoPago] = useState(false)
    
    const [loading, setLoading] = useState(true)
    
    
    
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalRecaudosList, setOpenModalRecaudosList] = useState(false)
    const [openModalDetailRecaudoItem, setOpenModalDetailRecaudoItem] = useState(false)
    
    
    const [liquidarDate, setLiquidarDate] = useState({'fecha_liquidar':createUtcDateIso()})
    
   

    const [noPago, setNoPago] = useState({
        'fecha_recaudo':liquidarDate.fecha_liquidar,
        'valor_recaudo':0,
        'venta':venta.id,
        'tienda':'',
       
})
    

    const recaudosCreateItem = async ()=>{
        try {
                
                const response = await fetch(`${URL}/recaudos/create/`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${token}`,
                    },
                    body: JSON.stringify(newRecaudo)
                    
                })
                const data = await response.json()
                if (response.status === 200){
                    setOpenModalCreate(!openModalCreate)
                    setNewRecaudo({})
                }else if(response.statusText == 'Unauthorized'){
                    logoutUser()
                }
            } 
         catch (error){
            console.error(error)
        }
    }


    const recaudosCreateNoPago = async (event)=>{
        try {
                
                const response = await fetch(`${URL}/recaudos/create/nopay/`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${token}`,
                    },
                    body: JSON.stringify(noPago)
                    
                })
                const data = await response.json()
                if (response.status === 200){
                    setOpenModalNoPago(!openModalNoPago)
                    setNewRecaudo({})
                }else if(response.statusText == 'Unauthorized'){
                    logoutUser()
                }
            } 
         catch (error){
            console.error(error)
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
                setLoading(false)
            } else if(response.statusText=='Unauthorized'){
                logoutUser()
            }
    
        } catch (error){
            console.error(error)
            setLoading(false)
        }
            
    }

    const getRecaudos = async (ventaId) => {
        try{
            let response = await fetch(`${URL}/recaudos/list/${ventaId}/`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
            })
            let data = await response.json();
            if(response.status===200){
                setRecaudos(data);
                setLoading(false);
            }else if(response.statusText == 'Unauthorized'){
                logoutUser()
            }
        }catch (error){
            console.error(error)
            setLoading(false);
        }
    }

    const getRecaudo = async (recaudoId) => {
        try{
            let response = await fetch(`${URL}/recaudos/${recaudoId}/`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
            })
            let data = await response.json();
            if(response.status===200){
                setRecaudo(data);
                setLoading(false);
                navigate(`/recaudos/${recaudoId}/`)
            }else if(response.statusText == 'Unauthorized'){
                logoutUser()
            }
        }catch (error){
            console.error(error)
            setLoading(false);
        }
    }


    const getRecaudosFecha = async (date) => {
        try{
            let response = await fetch(`${URL}/recaudos/list/${date}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
            })
            let data = await response.json();
            if(response.status===200){
                setRecaudos(data);
                setLoading(false)
            }else if(response.statusText == 'Unauthorized'){
                logoutUser()
            }
        }catch (error){
            console.error(error)
            setLoading(false);
        }
    }

    const getAllRecaudos = async () => {
        try{
            let response = await fetch(`${URL}/recaudos/`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
            })
            let data = await response.json();
            if(response.status===200){
                setAllRecaudos(data);
                setLoading(false)
            }else if(response.statusText == 'Unauthorized'){
                logoutUser()
            }
        }catch (error){
            console.error(error)
            setLoading(false);
        }
    }


    const recaudoUpdateItem = async (recaudoId) => {
        try {
            let response = await fetch(`${URL}/recaudos/${recaudoId}/update/`,{
                method:'PUT',
                headers:{
                  'Content-Type':'application/json',
                  'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify(recaudo)
              })
              let data = await response.json();
              if (response.status === 200){
                  setOpenModalUpdate(!openModalUpdate)
                  navigate(`/recaudos/${recaudoId}/`)
              }else if(response.statusText == 'Unauthorized'){
                logoutUser()
              }
        } catch (error){
            console.error(error)
        }
    }


    const recaudoDeleteItem = async (recaudoId, ventaId) => {
        try {
            console.log(ventaId)
            let response = await fetch(`${URL}/recaudos/${recaudoId}/delete/`,{
              method:'DELETE',
              headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
              },
            })
            let data = await response.json();
            if (response.status === 200){
                setOpenModalDelete(false)
                setOpenModalDetailRecaudoItem(false)
                getVenta(ventaId)
                getRecaudos(ventaId)
                if (ventaId){
                    navigate(`/ventas/${ventaId}/`)
                }else{
                    navigate('/recaudos/')
                }
            }else if(response.statusText == 'Unauthorized'){
              logoutUser()
            }
        }catch (error){
            console.error(error)
            
        }
      }

 

    const openModalDetailVenta = () => {
        setOpenModalDetail(!openModalDetail);
    }

    const openModalCreateRecaudo = () => {
        setOpenModalCreate(!openModalCreate)
    }

    const openModalDetailRecaudo = () => {
        setOpenModalDetailRecaudoItem(!openModalDetailRecaudoItem)
    }

    const openModalUpdateRecaudo = () => {
        setOpenModalUpdate(!openModalUpdate)
    }

    const openModalDeleteRecaudo = () => {
        setOpenModalDelete(!openModalDelete)
    }

    const handleChange = (event)=>{
        const {name,value} = event.target
        setNewRecaudo({
            ...newRecaudo,  
            [name]:value
        })
    }

    const [tipoFalla, setTipoFalla]=useState({
        'comentario':'',
        'tipo_falla':'Casa o Local Cerrado',
    })
    const handleChangeNoPago = (event) => {
        const {name,value} = event.target
        setTipoFalla({
            ...tipoFalla,
            [name]:value
        })
        setNoPago({
                ...noPago,
                'visita_blanco':{
                    ...tipoFalla,
                    [name]:value
                }
        })
    }
    

    const handleChangeUpdate = (event)=>{
        const {name,value} = event.target
        setRecaudo({
            ...recaudo,  
            [name]:value
        })
    }

    
    const handleChangeDate = (event) => {
        const {name,value} = event.target
        setLiquidarDate({...liquidarDate,
            [name]:value
        })
    }

    
    const Selected = (venta,option) => {
        setVenta(venta);
        if(option=='Detalle'){
            setOpenModalDetail(!openModalDetail);
        }else if(option=='Editar'){
            setOpenModalUpdate(!openModalUpdate);
        } else{
            setOpenModalDelete(!openModalDelete)
        }
    }
    
    //boton abonar de liquidar ventas
    const SelectedRecaudo = (venta) => {
        setVenta(venta)
        
        if(venta.saldo_actual < venta.valor_cuota){
            setNewRecaudo({
                'fecha_recaudo':liquidarDate.fecha_liquidar,
                'valor_recaudo':venta.saldo_actual,
                'venta':venta.id,
                'tienda':'',
            })    
        }else{
            setNewRecaudo({
                 'fecha_recaudo':liquidarDate.fecha_liquidar,
                 'valor_recaudo':venta.valor_cuota,
                 'venta':venta.id,
                 'tienda':'',
             })
        }
        setOpenModalCreate(!openModalCreate)
    }

    //boton no pago de liquidar ventas
    const selectedNoPago = (venta) => {
        setVenta(venta)
        setOpenModalNoPago(!openModalNoPago)
        setTipoFalla({
            'comentario':'',
            'tipo_falla':'Casa o Local Cerrado',
        })
        setNoPago(
            {
                'fecha_recaudo':liquidarDate.fecha_liquidar,
                'valor_recaudo':0,
                'venta':venta.id,
                'tienda':'',
                'visita_blanco':{
                    'comentario':'',
                    'tipo_falla':'Casa o Local Cerrado',
                },
        }
        )
    }
    
    const SelectedRecaudoItem = (recaudo) => {
        setRecaudo(recaudo);
        openModalDetailRecaudo();
    }

    const totalRecaudosVenta = () => {
        if (recaudos.message){
            return 0;
        } else {
            return recaudos.map(recaudo => parseFloat(recaudo.valor_recaudo)).reduce((a,b) => a + b, 0)
        }
    }

    const totalRecaudosFecha = () => {
        if (recaudos.message){
            return 0
        } else {
            // liquidarDate
            return recaudos.map(recaudo => parseFloat(recaudo.valor_recaudo)).reduce((a,b) => a + b, 0)
        }
    }
   
    

    const contextData = {
        openModalCreate,
        openModalCreateRecaudo,
        openModalDetail,
        openModalDetailVenta,
        
        openModalRecaudosList,
        openModalDetailRecaudo,
        openModalDetailRecaudoItem,
        openModalUpdateRecaudo,
        openModalUpdate,
        openModalDeleteRecaudo,
        openModalDelete,
        setOpenModalDetailRecaudoItem,
        
        venta,
        ventaDetail,
        handleChangeDate,
        liquidarDate,
        allRecaudos,
        recaudos,
        recaudo,
        newRecaudo,
        SelectedRecaudo,
        SelectedRecaudoItem,
        Selected,
        handleChange,
        handleChangeUpdate,
        getRecaudos,
        recaudosCreateItem,
        recaudoUpdateItem,
        recaudoDeleteItem,
        totalRecaudosVenta,
        selectedNoPago,
        noPago,
        
        openModalNoPago,
        setOpenModalNoPago,
        handleChangeNoPago,
        recaudosCreateNoPago,
        
        getRecaudosFecha,
        loading,
        getRecaudo,
        totalRecaudosFecha,
        getAllRecaudos
    }
  return (
    <RecaudosContext.Provider value={contextData} >
        {children}
    </RecaudosContext.Provider>
  )
}

export const RecaudosContext = createContext();
export default RecaudosProvider;