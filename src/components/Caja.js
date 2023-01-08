import React,{useContext, useEffect} from 'react';
import {Badge} from 'reactstrap';
import { TiendaContext } from '../context/TiendaContext';


const Caja = () => {
  const {
    tienda,
    getTiendaMembresia,
  } = useContext(TiendaContext)
  
  useEffect(()=>{
    getTiendaMembresia()
  },[])

  return (
    (tienda.tienda?.caja>0)? <Badge color='success'>Caja {tienda.tienda?.caja}</Badge>:<Badge color='danger'>Caja {tienda.tienda?.caja}</Badge>
    
  )
}

export default Caja