import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AlertError from "../components/Utils/AlertError";
import { AuthContext } from "../context/AuthContext";

const NEW_APP_URL = "https://app.carterafinanciera.com";

const LoginPage = () => {
  const { loginUser, error } = useContext(AuthContext);
  const [bannerVisible, setBannerVisible] = useState(true);

  return (

    <div className="container-sm">

      {/* ── Banner nueva versión ─────────────────────────────────────────── */}
      {bannerVisible && (
        <div
          style={{
            background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
            borderRadius: 16,
            padding: "20px 20px 16px",
            marginBottom: 16,
            color: "#fff",
            position: "relative",
          }}
        >
          {/* Botón cerrar */}
          <button
            onClick={() => setBannerVisible(false)}
            style={{
              position: "absolute",
              top: 10,
              right: 14,
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              width: 28,
              height: 28,
              cursor: "pointer",
              fontSize: 16,
              lineHeight: "28px",
              textAlign: "center",
              padding: 0,
            }}
            aria-label="Cerrar"
          >
            ×
          </button>

          {/* Badge */}
          <div style={{ marginBottom: 10 }}>
            <span
              style={{
                background: "rgba(255,255,255,0.25)",
                borderRadius: 20,
                padding: "3px 10px",
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              ✨ Nueva versión disponible
            </span>
          </div>

          {/* Título */}
          <p style={{ fontWeight: 900, fontSize: 16, margin: "0 0 6px", lineHeight: 1.3 }}>
            Actualizamos la plataforma con mejoras importantes
          </p>

          {/* Descripción */}
          <p style={{ fontSize: 13, margin: "0 0 14px", opacity: 0.9, lineHeight: 1.5 }}>
            El nuevo sistema tiene el mismo usuario y contraseña. Accede desde:
          </p>

          {/* URL destacada */}
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: 10,
              padding: "8px 14px",
              fontSize: 14,
              fontWeight: 900,
              letterSpacing: "0.02em",
              marginBottom: 14,
              fontFamily: "monospace",
            }}
          >
            🔗 app.carterafinanciera.com
          </div>

          {/* Beneficios */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {[
              "WhatsApp integrado",
              "Renovación de créditos",
              "Score de clientes",
              "Alertas en tiempo real",
              "Instalable en tu celular",
            ].map((f) => (
              <span
                key={f}
                style={{
                  background: "rgba(255,255,255,0.18)",
                  borderRadius: 20,
                  padding: "3px 10px",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                ✓ {f}
              </span>
            ))}
          </div>

          {/* Botones */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href={NEW_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#fff",
                color: "#4f46e5",
                border: "none",
                borderRadius: 10,
                padding: "10px 20px",
                fontWeight: 900,
                fontSize: 13,
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-block",
                letterSpacing: "0.03em",
              }}
            >
              Ir al nuevo sitio →
            </a>
            <a
              href={`${NEW_APP_URL}/guia-rapida`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.4)",
                borderRadius: 10,
                padding: "10px 20px",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Ver guía rápida
            </a>
          </div>
        </div>
      )}
      {/* ────────────────────────────────────────────────────────────────── */}

      <div className="card shadow-lg p-3 mb-3 bg-body rounded">
        <form onSubmit={loginUser} className='m-2'>
          <h3 className="text-center text-secondary">Ingreso al Sistema</h3>
          {error && <AlertError error={"Usuario o contraseña incorrectos."} />}
          <div className="form-floating mb-3">
            <input
              type="text"
              name="username"
              className="form-control"
              id="floatingInput"
              placeholder="Usuario"
            />
            <label className="text-secondary">Usuario</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              name="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label className="text-secondary">Contraseña</label>
          </div>
          <div className="text-center mt-3">
            <button type="submmit" className="btn btn-success btn-lg">
              Ingresar
            </button>
          </div>
        </form>
       
        <div className="text-center m-4">
          <p className="text-secondary">No tienes una cuenta?</p>
          <Link to={"/register/"}>
            <button type="button" className="btn btn-outline-primary">
              Crear Cuenta
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
