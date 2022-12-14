import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { URL } from '../config'
import {createUtcDateIso} from '../hooks/useDate'

const UtilidadesProvider = ({children}) => {

    const {
        token,
        logoutUser,
        navigate,
        query,
    } = useContext(AuthContext)

    const [aportantes, setAportantes] = useState([])
    

    const [utilidades, setUtilidades] = useState([])
    const [utilidad, setUtilidad] = useState({})
    
    
    const [loading, setLoading] = useState(true)
    const [serverError, setServerError] = useState(false)
    
    
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)

    
    const [newUtilidad, setNewUtilidad] = useState({
        'fecha':createUtcDateIso(),
        'comentario':'',
        'valor':'',
        'trabajador': '',
    })
    
    


    const getAportantes = async () => {
        try {
            const response = await fetch(`${URL}/trabajadores/`,{
                method: 'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`,
                },
            })
            const data = await response.json();
            if(response.status===200){
                setAportantes(data);
            }else if (response.statusText == 'Unauthorized'){
                logoutUser();
            }
        } catch {
            setServerError(true);
        }
    }

    const getUtilidades = async () => {
        try{
            let response = await fetch(`${URL}/utilidades/`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
            })
            let data = await response.json();
            if(response.status===200){
                setUtilidades(data);
                setLoading(false);
            }else if(response.statusText == 'Unauthorized'){
                logoutUser()
            }
        }catch{
            setServerError(true);
            setLoading(false);
        }
    }

    const utilidadCreateItem = async (event)=>{
        try {
                const response = await fetch(`${URL}/utilidades/create/`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${token}`,
                    },
                    body: JSON.stringify(newUtilidad)
                    
                })
                const data = await response.json()
                if (response.status === 200){
                    setOpenModalCreate(!openModalCreate)
                    getUtilidades()
                }else if(response.statusText == 'Unauthorized'){
                    logoutUser()
                }
            } 
         catch {
            setServerError(true)
        }
    }


    const utilidadUpdateItem = async () => {
        try {
            let response = await fetch(`${URL}/utilidades/${utilidad.id}/update/`,{
                method:'PUT',
                headers:{
                  'Content-Type':'application/json',
                  'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify(utilidad)
              })
              let data = await response.json();
              if (response.status === 200){
                  setOpenModalUpdate(!openModalUpdate)
                  getUtilidades()
              }else if(response.statusText == 'Unauthorized'){
                logoutUser()
              }
        } catch {
            setServerError(true)
            setLoading(false)
        }
    }


    const utilidadDeleteItem = async () => {
        try {
            let response = await fetch(`${URL}/utilidades/${utilidad.id}/delete/`,{
              method:'DELETE',
              headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
              },
            })
            let data = await response.json();
            if (response.status === 200){
                setOpenModalDelete(!openModalDelete)
                getUtilidades()
            }else if(response.statusText == 'Unauthorized'){
              logoutUser()
            }
        }catch {
            setServerError(true)
            setLoading(false)
        }
      }

    //calculamos la suma de las utilidades
    const totalUtilidades = () => {
        if (utilidades.message){
            return 0;
        }else {
            return utilidades.filter(utilidad => utilidad.trabajador?.trabajador.toLowerCase().includes(query)).map(utilidad => parseFloat(utilidad.valor)).reduce((a,b) => a + b, 0);
        }
    }
    
    const handleChange = (event)=>{
        const {name,value} = event.target
        setNewUtilidad({
            ...newUtilidad,
            [name]:value
        })
    }

    const handleChangeUpdate = (event) => {
        const {name,value} = event.target
        setUtilidad({
            ...utilidad,
            [name]:value
        })
    }

    const Selected = (utilidad,option) => {
        setUtilidad(utilidad);
        if(option=='Editar'){
            setOpenModalUpdate(!openModalUpdate);
        } else{
            setOpenModalDelete(!openModalDelete)
        }
}

    const openModalCreateUtilidad = () => {
        setOpenModalCreate(!openModalCreate);
        setNewUtilidad({
            'fecha':createUtcDateIso(),
            'comentario':'',
            'valor':'',
            'trabajador': '',
        })
    }

    const openModalUpdateUtilidad = () => {
        setOpenModalUpdate(!openModalUpdate);
    }

    const openModalDeleteUtilidad = () => {
        setOpenModalDelete(!openModalDelete);
    }
   
   

    const contextData = {
        utilidades,
        utilidad,
        newUtilidad,
        aportantes,
        totalUtilidades,
        utilidadCreateItem,
        utilidadUpdateItem,
        utilidadDeleteItem,
        handleChange,
        handleChangeUpdate,
        Selected,

        openModalCreate,
        openModalDelete,
        openModalUpdate,

        openModalCreateUtilidad,
        openModalUpdateUtilidad,
        openModalDeleteUtilidad,
        
        

        getAportantes,
        getUtilidades,

        loading,
        serverError,
    }
  return (
    <UtilidadesContext.Provider value={contextData}>
        {children}
    </UtilidadesContext.Provider>
  )
}

export const UtilidadesContext = createContext();
export default UtilidadesProvider;