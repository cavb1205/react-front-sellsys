import React, { useContext,useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import Caja from './Caja';

const Header = () => {
  const {
    user,
    perfil,
    logoutUser
  } = useContext(AuthContext)
  
  
  
  return (
    
      <nav className="navbar fixed-top navbar-expand-lg bg-light p-2">
        {
        user? 
        <>
        <span className="navbar-brand p-2"><Caja /></span>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"  aria-expanded="false">
                Informes
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/recaudos/">Recaudos</Link></li>
                <li><Link className="dropdown-item" to="/cierres/">Cierres Caja</Link></li>
              </ul>              
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Ingresos-Egresos
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/aportes/">Aportes</Link></li>
                <li><Link className="dropdown-item" to="/gastos/">Gastos</Link></li>
                <li><Link className="dropdown-item" to="/utilidades/">Utilidades</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ventas/">Ventas</Link>
            </li>            
            <li className="nav-item">
              <Link className="nav-link" to="/liquidar/">Liquidar</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Usuarios
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/clientes/">Clientes</Link></li>
                <li><Link className="dropdown-item" to="/trabajadores/">Trabajadores</Link></li>
              </ul>
            </li>           

            
          </ul>
          {user &&
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                
                <li className="nav-item">
                  <Link className="nav-link" to={`/trabajadores/${perfil.id}/`}>Usuario: {user.first_name}</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-outline-light" to="/login/" onClick={logoutUser}>Salir</button>
                </li>
            </ul>        
          } 
        </div>
        
        </>:null
        }
        </nav>
    
    
  )


  }

export default Header;




