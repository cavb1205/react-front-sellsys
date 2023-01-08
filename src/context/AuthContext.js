import React, { createContext, useState, useEffect } from "react";
import {Route, useNavigate} from 'react-router-dom';

import { URL } from '../config'

export const AuthContext = createContext();


const AuthProvider = ({children}) => {

    
    const [token, setToken] = useState(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')): null)
    const [refresh,setRefresh] = useState(localStorage.getItem('refresh') ? JSON.parse(localStorage.getItem('refresh')): null)
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): null)
    const [perfil, setPerfil] = useState(localStorage.getItem('perfil') ? JSON.parse(localStorage.getItem('perfil')): null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [membresia, setMembresia] = useState(null)

    
    const navigate = useNavigate()

    const loginUser = async (e) => {
        e.preventDefault();
        const response = await fetch(`${URL}/login/`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})

        })
        const data = await response.json()
        
        if(response.status === 200){
            setToken(data.token)
            setRefresh(data.refresh)
            setUser(data.user)
            setPerfil(data.perfil)
            setMembresia(data.membresia)
            localStorage.setItem('token', JSON.stringify(data.token))
            localStorage.setItem('refresh', JSON.stringify(data.refresh))
            localStorage.setItem('user', JSON.stringify(data.user))
            localStorage.setItem('perfil', JSON.stringify(data.perfil))
            if (membresia == 'Vencida'){
                navigate("/")
                alert(membresia)
            }
            if (membresia == 'Pendiente Pago'){
                navigate("/")
                alert(membresia)
            }
            
            if (data.user.is_superuser){
                navigate("/tiendas/")
            }else if(data.user.is_active){
                navigate("/liquidar/");
            }
            else {
                alert('Usuario no esta activo!')
                logoutUser()
            }
        }else{
            setError(!error)
        }
    }


    const logoutUser = () => {
        setError(false)
        setToken(null)
        setRefresh(null)
        setUser(null)
        localStorage.removeItem('token')
        localStorage.removeItem('refresh')
        localStorage.removeItem('user')
        navigate("/login/")
    }

    const updateToken = async () => {
        
        let response = await fetch(`${URL}/token/refresh/`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':refresh})
        })
        const data = await response.json()
        if (response.status === 200){
            setToken(data.access)
            localStorage.setItem('token', JSON.stringify(data.access))
        } else {
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    const [query, setQuery]=useState('')
    
    const handleSearch = (event)=>{
        setQuery((event.target.value).toLowerCase())
    }

    
    const contextData = {
       loginUser:loginUser,
       logoutUser:logoutUser,
       token:token,
       refresh:refresh,
       user:user,
       navigate:navigate,
       error,
       query,
       handleSearch,
       perfil,
    }


    useEffect(()=>{
        if(loading){
            updateToken()
        }
        let minutes = 4
        let calc_time = 1000 * 60 * minutes
        let interval =setInterval(()=>{
            if(token){
                updateToken()
            } else{
                navigate('/login/')
            }
        },calc_time)
        return () => clearInterval(interval)
    },[token,loading])


    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthProvider;