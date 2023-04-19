import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";


import Caja from "./Caja";

const HeaderTrabajador = ({ user, isOpen, toggle, perfil, logoutUser }) => {
    
  return (
    <Navbar className="fixed-top navbar-expand-lg bg-light">
      <NavbarBrand href="#">
        <span className="navbar-brand p-2">
          <Caja />
        </span>
        <span>
            <Link to={'/caja/'} className="btn btn-outline-danger btn-sm">Cierre Caja</Link>
        </span>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link className="nav-link" to="/recaudos/" onClick={toggle}>
              Recaudos
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/gastos/" onClick={toggle}>
              Gastos
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/ventas/" onClick={toggle}>
              Ventas Activas
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/liquidar/" onClick={toggle}>
              Liquidar
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/clientes/" onClick={toggle}>
              Clientes
            </Link>
          </NavItem>
          <NavItem>
            <Link
              className="nav-link"
              to={`/trabajadores/${perfil.id}/`}
              onClick={toggle}
            >
              Usuario: {user.first_name}{" "}
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/trabajadores/" onClick={logoutUser}>
              Salir
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default HeaderTrabajador;
