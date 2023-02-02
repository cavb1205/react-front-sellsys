import React,{useContext, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';

import { TrabajadoresContext } from '../../context/TrabajadoresContext';
import AlertLoading from '../Utils/AlertLoading';
import AlertError from '../Utils/AlertError'
import TrabajadorModalDelete from './TrabajadorModalDelete';
import TrabajadorModalUpdate from './TrabajadorModalUpdate';
import { AuthContext } from '../../context/AuthContext';
import TrabajadoresModalPassword from './TrabajadoresModalPassword';



const TrabajadorDetail = () => {
    const {user} = useContext(AuthContext)
    const {
        trabajador,
        getTrabajador,
        loading,
        error,
        openModalDeleteTrabajador,
        openModalUpdateTrabajador,
        openModalPasswordTrabajador,
    } = useContext(TrabajadoresContext)
    
    const {trabajadorId} = useParams()

    useEffect(()=>{
        getTrabajador(trabajadorId)
    },[])
    
    
  return (
    <div className='container-sm'>
        {loading? <AlertLoading />:error?<AlertError error={'Error al cargar la información. intente de nuevo.'} />:

        <div className='card shadow'>
            <div className='card-header'>
                <h2 className='text-secondary text-capitalize'>{trabajador.first_name} {trabajador.last_name}</h2>
            </div>
            <div className='card-body'>
                <h5 className='text-secondary'>Username: {trabajador.username}</h5>
                <p><strong>Identificación:</strong> {trabajador.identificacion}</p>
                <p><strong>Teléfono:</strong> {trabajador.telefono}</p>
                <p><strong>Dirección:</strong> {trabajador.direccion}</p>
                <p><strong>Email:</strong> {trabajador.email}</p>
                {(trabajador.is_active)?<p><strong>Estado:</strong> <span className='badge rounded-pill text-bg-success'>Activo</span></p>:<p><strong>Estado:</strong> <span className='badge rounded-pill text-bg-danger'>Inactivo</span></p>}
                <small className='badge rounded-pill text-bg-light'>Fecha Creación: {trabajador.date_joined?.split('T')[0]}</small>
            </div>
            {user.username === trabajador.username?
            <div>
                <button onClick={openModalPasswordTrabajador} className='btn btn-outline-primary m-3'>Cambiar Contraseña</button>
            </div>
            :
            null
            }
            <div className='card-footer text-center'>
                <Link to="/trabajadores/"><button className='btn btn-secondary m-1' color='secondary'>Lista Trabajadores</button></Link>
                <button onClick={openModalUpdateTrabajador} className='btn btn-warning m-1'>Actualizar</button>
                <button onClick={openModalDeleteTrabajador} className='btn btn-danger m-1'>Eliminar</button>
            </div>
        </div>
        }
        <TrabajadorModalUpdate />
        <TrabajadorModalDelete />
        <TrabajadoresModalPassword />
    </div>
  )
}

export default TrabajadorDetail