import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import { TiendaContext } from "../context/TiendaContext";

import Caja from "./Caja";
import CierreCajaModal from "./Informes/CierreCajaModal";

const HeaderTrabajador = ({ user, isOpen, toggle, perfil, logoutUser }) => {
    const {openModalCierreCaja} = useContext(TiendaContext)
  return (
    <Navbar className="fixed-top navbar-expand-lg bg-light">
      <NavbarBrand href="#">
        <span className="navbar-brand p-2">
          <Caja />
        </span>
        <span>
            <button onClick={openModalCierreCaja} className="btn btn-outline-danger btn-sm">Cierre Caja</button>
        </span>
        <CierreCajaModal />
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
            <Link className="nav-link" to="/utilidades/" onClick={toggle}>
              Utilidades
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
