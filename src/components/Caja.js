import React,{useContext, useEffect} from 'react';

import { TiendaContext } from '../context/TiendaContext';


const Caja = () => {
  const {
    tienda,
    getTienda,
  } = useContext(TiendaContext)
  
  useEffect(()=>{
    getTienda()
    
  },[])

  
  return (
    (tienda.tienda?.caja>0)?
      <span className='badge text-bg-success'>Caja {tienda.tienda?.caja}</span>
    :
      <span className='badge text-bg-danger'>Caja {tienda.tienda?.caja}</span>
  )
}

export default Caja