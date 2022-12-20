import React, { useContext, useEffect } from 'react'
import { TiendaContext } from '../../context/TiendaContext'

const HomePageTiendaInfo = () => {
  const {
    tienda,
    getTienda,
  } = useContext(TiendaContext)

  useEffect(()=>{
    getTienda()
  },[])

  return (
    <div className='container-sm'>
      <div className="card shadow">
        <div class="card-header">
          Información de la Ruta
        </div>
        <div className="card-body">
          <div className='card-title'>
            <h2>{tienda.nombre}</h2>
          </div>
          <p className="card-text">Ciudad: {tienda.ciudad}</p>
          <p className="card-text">Teléfono: {tienda.telefono}</p>
          <p>Administrador: {tienda.administrador}</p>
          <p className="card-text">Estado: {tienda.estado?<span>Activa</span>:<span>Inactiva</span>}</p>
          
          
        </div>
        <div className="card-footer text-muted">
          Fecha Registro {tienda.fecha_registro}
        </div>
      </div> 
    </div>
  )
}

export default HomePageTiendaInfo