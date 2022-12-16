import React,{Children, createContext,useContext,useState} from 'react'
import { AuthContext } from './AuthContext';
import {URL} from '../config';
import {createUtcDateIso} from '../hooks/useDate'

const GastosProvider = ({children}) => {
    
    let {
        token,
        logoutUser,
        navigate,
        query,
    } = useContext(AuthContext);
    
    const [tipoGastos,setTipoGastos] = useState([])
    const [newTipoGasto, setNewTipoGasto] = useState({})
    const [openModalTipoGasto, setOpenModalTipoGasto] = useState(false)

    
    const [gastos, setGastos]= useState([])
    const [gasto, setGasto] = useState({
        "fecha":'',
        "tipo_gasto":'',
        "valor":'',
        "comentario":'',
    })
    const [newGasto, setNewGasto]=useState({
        "fecha":createUtcDateIso(),
        "tipo_gasto":'',
        "valor":'',
        "comentario":'',
    })

    const [loading, setLoading] = useState(true)
    const [serverError, setServerError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [error, setError] = useState(null)

    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)


     //calculamos la suma de los aportes
     const totalGastos = () => {
        if (gastos.message){
            return 0;
        }else {
            return gastos.filter(gasto => gasto.tipo_gasto?.tipo_gasto.toLowerCase().includes(query)).map(gasto => parseFloat(gasto.valor)).reduce((a,b) => a + b, 0);
        }
    }     
    
    

    const getGastos = async () => {
        try {
            let response = await fetch(`${URL}/gastos/`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
            })
            let data = await response.json();
            if(response.status===200){
                setGastos(data);
                setLoading(false)
            }else if(response.statusText == 'Unauthorized'){
                logoutUser()
            }
        } catch {
            setLoading(false)
            setServerError(true)
        }
    }

    const getTipoGastos = async () => {
        let response = await fetch(`${URL}/gastos/tipo/`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        })
        let data = await response.json();
        if(response.status===200){
            setTipoGastos(data);
        }else if(response.statusText == 'Unauthorized'){
            logoutUser()
        }
    }

    const gastoCreateItem = async (event)=>{
        try {
                const response = await fetch(`${URL}/gastos/create/`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${token}`,
                    },
                    body: JSON.stringify(newGasto)
                    
                })
                const data = await response.json()
                if (response.status === 200){
                    
                    setOpenModalCreate(!openModalCreate)
                    getGastos()
                }else if(response.statusText == 'Unauthorized'){
                    logoutUser()
                }
            } 
        catch (error) {
            console.error(error)
        }
    }

    const tipoGastoCreate = async ()=>{
        try {
                const response = await fetch(`${URL}/gastos/tipo/create/`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${token}`,
                    },
                    body: JSON.stringify(newTipoGasto)
                    
                })
                const data = await response.json()
                if (response.status === 200){
                    setOpenModalTipoGasto(!openModalTipoGasto)
                    getTipoGastos()
                }else if(response.statusText == 'Unauthorized'){
                    logoutUser()
                }
            } 
        catch (error) {
            console.error(error)
        }
    }

    
    const gastoUpdateItem = async (event) => {
        
        
        try {
            const response = await fetch(`${URL}/gastos/${gasto.id}/update/`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`,
                },
                body: JSON.stringify(gasto)
                
            })
            
            if (response.status === 200){
                
                setOpenModalUpdate(!openModalUpdate)
                getGastos()
    
            }else if(response.statusText == 'Unauthorized'){
                logoutUser()
            }
        } catch{
            setServerError(true)
        }
    }
    
    const gastoDeleteItem = async () => {
        let response = await fetch(`${URL}/gastos/${gasto.id}/delete/`,{
          method:'DELETE',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
          },
        })
        let data = await response.json();
        if (response.status === 200){
            setOpenModalDelete(!openModalDelete)
            navigate('/gastos/')
            getGastos()
    
        }else if(response.statusText == 'Unauthorized'){
          logoutUser()
        }
      }

   
    const openModalCreateGasto = ()=>{
        setOpenModalCreate(!openModalCreate);
        setNewGasto({
            "fecha":createUtcDateIso(),
            "tipo_gasto":'',
            "valor":'',
            "comentario":'',
        })
        
    }
    const openModalUpdateGasto = ()=>{
        setOpenModalUpdate(!openModalUpdate);

    }
    
    const openModalDeleteGasto = ()=>{
        setOpenModalDelete(!openModalDelete);
    }

    const openModalCreateTipoGasto = ()=>{
        setOpenModalTipoGasto(!openModalTipoGasto)
        setNewTipoGasto({
            'tipo_gasto':''
        })
    }

     
    const gastoSelected = (gasto,option) => {
         setGasto(gasto);
         if(option=='Editar'){
             setOpenModalUpdate(!openModalUpdate);
         } else{
             setOpenModalDelete(!openModalDelete)
         }
}
    const handleChange = (event)=>{
        const {name,value} = event.target
        setNewGasto({
            ...newGasto,
            [name]:value
        })
    }
    
    
    const handleChangeUpdate = (event)=>{
        const {name,value} = event.target
        setGasto({
            ...gasto,
            [name]:value
        })
     }

    const contextData = {
        gastos,
        gasto,
        newGasto,
        errorMessage,
        getGastos,
        gastoCreateItem,
        gastoUpdateItem,
        gastoDeleteItem,
        handleChangeUpdate,
        handleChange,
        gastoSelected,
        tipoGastoCreate,
      
        openModalUpdateGasto,
        openModalCreateGasto,
        openModalDeleteGasto,
        openModalTipoGasto,
        openModalCreateTipoGasto,
        
        openModalDetail,
        openModalCreate,
        openModalUpdate,
        tipoGastos,
        setNewTipoGasto,
        newTipoGasto,
        openModalDelete,
        totalGastos,
        loading,
        serverError,
        getTipoGastos,
        query,
    }

  return (
    <GastosContext.Provider value={contextData}>
        {children}
    </GastosContext.Provider>
  )
}

export const GastosContext = createContext();
export default GastosProvider;