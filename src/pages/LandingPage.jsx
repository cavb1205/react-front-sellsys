import React from "react";
import LoginPage from "./LoginPage";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="container-sm">
      
      {/* <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Navbar</a>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
          <div className="collapse navbar-collapse d-flex" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">
                  Inicio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">
                  Precios
                </a>
              </li>
              <li className="nav-item">
                <Link to={'/login/'} className="nav-link" aria-current="page" href="#">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
      
      
        <div className="text-center text-secondary mb-4">
          <h1 className="font-weight-bold">Cartera Financiera</h1>
        </div>
        <div className="d-flex justify-content-center">
            <LoginPage />
        </div>
        <div className="card shadow p-3 mb-3 bg-body rounded text-center">
          <h6 className="text-secondary text-center"><strong>Cuenta de Demostración</strong></h6>
          <div className="d-flex flex-wrap justify-content-evenly">
            <div className="d-flex flex-column border m-1 card shadow p-2">
              <p className="text-secondary"><strong>Perfil Administrador</strong></p>
              <span className="text-secondary"><strong>Usuario:</strong> admin.demo</span>
              <span className="text-secondary"><strong>Contraseña:</strong> admin.demo</span>
            </div>
            <div className="d-flex flex-column border m-1 card shadow p-2">
              <p className="text-secondary"><strong>Perfil Trabajador</strong></p>
              <span className="text-secondary"><strong>Usuario:</strong> trabajador.demo</span>
              <span className="text-secondary"><strong>Contraseña:</strong> trabajador.demo</span>
            </div>
          </div>
        </div>

      <div className="text-white" style={{background:'#343a40'}}>
        <div className="p-0">
          <section>
            <div className="d-flex flex-row flex-wrap">
              {/* <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3 ">
                <h6 className="text-uppercase mb-4 font-weight-bold text-center">
                  Cartera Financiera
                </h6>
                <p>
                  Administra de forma segura tu negocio con nuestra aplicación
                  multi plataforma. Con un aspecto completamente nuevo y
                  potentes funciones.
                </p>
              </div> */}

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3 ">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Enlaces
                </h6>
                <p>
                  <Link to={"/login/"} className="text-white">
                    Login
                  </Link>
                </p>
                <p>
                  <Link to={"/register/"} className="text-white">
                    Registro
                  </Link>
                </p>
                <p>
                  <a href="#" className="text-white">Precios</a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6>Contactenos</h6>
                <a href="https://api.whatsapp.com/send?phone=56963511337" target='_blank' className="btn btn-success m-2" rel="noreferrer">WhatsApp</a>
                <br></br>
              </div>
            </div>
          </section>

          <section className="p-2 pt-0">
            <div className="row d-flex align-items-center">
              <div className="col text-center">
                <div className="p-2">© 2023 Copyright</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
