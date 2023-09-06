import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  UncontrolledDropdown,
} from "reactstrap";
import { AuthContext } from "../context/AuthContext";
import { TiendaContext } from "../context/TiendaContext";

import Caja from "./Caja";
import HeaderTrabajador from "./HeaderTrabajador";

const Header = () => {
  const { user, perfil, logoutUser } = useContext(AuthContext);
  const { tienda } = useContext(TiendaContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {user && user.is_staff ? (
        <Navbar className="fixed-top navbar-expand-lg bg-light">
          <NavbarBrand>
            <span className="navbar-brand">
              <Caja />
            </span>

            <small className="text-secondary text-capitalize ">
              {tienda.tienda?.nombre}
            </small>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
              
              <NavItem>
                <Link className="nav-link" to="/select/" onClick={toggle}>
                  Rutas
                </Link>
              </NavItem>

              <NavItem>
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/"
                  onClick={toggle}
                >
                  Home
                </Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Informes
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link
                      className="dropdown-item"
                      to="/recaudos/"
                      onClick={toggle}
                    >
                      Recaudos
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  
                  <DropdownItem>
                    <Link
                      className="dropdown-item"
                      to="/informes/utilidad/"
                      onClick={toggle}
                    >
                      Informe Utilidad
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Link
                      className="dropdown-item"
                      to="/cierres/"
                      onClick={toggle}
                    >
                      Cierres Caja
                    </Link>
                  </DropdownItem>
                  {user.username === "root" ? (
                    <DropdownItem>
                      <Link
                        className="dropdown-item"
                        to="/tiendas/"
                        onClick={toggle}
                      >
                        Lista Tiendas
                      </Link>
                    </DropdownItem>
                  ) : null}
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Aportes-Gastos
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link
                      className="dropdown-item"
                      to="/aportes/"
                      onClick={toggle}
                    >
                      Aportes
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Link
                      className="dropdown-item"
                      to="/gastos/"
                      onClick={toggle}
                    >
                      Gastos
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Link
                      className="dropdown-item"
                      to="/utilidades/"
                      onClick={toggle}
                    >
                      Utilidades
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Ventas
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link
                      className="dropdown-item"
                      to="/ventas/"
                      onClick={toggle}
                    >
                      Ventas Activas
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Link
                      className="dropdown-item"
                      to="/ventas/perdidas/"
                      onClick={toggle}
                    >
                      Ventas Pérdida
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <Link className="nav-link" to="/liquidar/" onClick={toggle}>
                  Liquidar
                </Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Usuarios
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link
                      className="dropdown-item"
                      to="/clientes/"
                      onClick={toggle}
                    >
                      Clientes
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Link
                      className="dropdown-item"
                      to="/trabajadores/"
                      onClick={toggle}
                    >
                      Trabajadores
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Configuración
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link
                      className="dropdown-item"
                      to={`/trabajadores/${perfil.id}/`}
                      onClick={toggle}
                    >
                      Usuario: {user.first_name}{" "}
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link
                      className="dropdown-item"
                      to="/tiendas/detail/"
                      onClick={toggle}
                    >
                      Info Ruta{" "}
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Link
                      className="dropdown-item"
                      to="/trabajadores/"
                      onClick={logoutUser}
                    >
                      Salir
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      ) : user && user.is_active ? (
        <HeaderTrabajador
          user={user}
          perfil={perfil}
          isOpen={isOpen}
          toggle={toggle}
          logoutUser={logoutUser}
        />
      ) : null}
    </div>
  );
};

export default Header;
