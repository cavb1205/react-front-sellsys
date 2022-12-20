import React, { useContext,useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavItem, UncontrolledDropdown } from 'reactstrap';
import { AuthContext } from '../context/AuthContext';

import Caja from './Caja';

const Header = () => {
  const {
    user,
    perfil,
    logoutUser
  } = useContext(AuthContext)
  
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  
  
  return (
    <div>
      {
        user?
        
      <Navbar className='fixed-top navbar-expand-lg bg-light'>
        <NavbarBrand href="/"><span className="navbar-brand p-2"><Caja /></span></NavbarBrand>
        <NavbarToggler onClick={toggle}  />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <Link className="nav-link" aria-current="page" to="/" onClick={toggle} >Home</Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Informes
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem><Link className="dropdown-item" to="/recaudos/" onClick={toggle}>Recaudos</Link></DropdownItem>
                <DropdownItem divider />
                <DropdownItem><Link className="dropdown-item" to="/cierres/" onClick={toggle}>Cierres Caja</Link></DropdownItem>                
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Aportes-Gastos
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem><Link className="dropdown-item" to="/aportes/" onClick={toggle}>Aportes</Link></DropdownItem>
                <DropdownItem divider />
                <DropdownItem><Link className="dropdown-item" to="/gastos/" onClick={toggle}>Gastos</Link></DropdownItem>
                <DropdownItem divider />
                <DropdownItem><Link className="dropdown-item" to="/utilidades/" onClick={toggle}>Utilidades</Link></DropdownItem>                
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <Link className="nav-link" to="/ventas/" onClick={toggle}>Ventas</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/liquidar/" onClick={toggle}>Liquidar</Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Usuarios
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem><Link className="dropdown-item" to="/clientes/" onClick={toggle}>Clientes</Link></DropdownItem>
                <DropdownItem divider />
                <DropdownItem><Link className="dropdown-item" to="/trabajadores/" onClick={toggle}>Trabajadores</Link></DropdownItem>                                            
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Configuración
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem><Link className="dropdown-item" to={`/trabajadores/${perfil.id}/`} onClick={toggle}>Usuario: {user.first_name} </Link></DropdownItem>
                <DropdownItem><Link className="dropdown-item" to={`/tiendas/detail/`} onClick={toggle}>Info Ruta </Link></DropdownItem>
                <DropdownItem divider />
                <DropdownItem><Link className="dropdown-item" to="/trabajadores/" onClick={logoutUser}>Salir</Link></DropdownItem>                                            
              </DropdownMenu>
            </UncontrolledDropdown>                                   
          
          </Nav>
          
        </Collapse>
      </Navbar>
      :
      null
      }
    </div>              
    
  )


  }

export default Header;




