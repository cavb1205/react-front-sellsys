import { Routes, Route } from "react-router-dom";

import AuthProvider from "./context/AuthContext";
import ClientesProvider from "./context/ClientesContext";
import AportesProvider from "./context/AportesContext";




import  Header  from './components/Header';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { AportesListPage } from "./pages/AportesListPage";
import GastosListPage from "./pages/GastosListPage";
import ClientesListPage from "./pages/ClientesListPage";
import TrabajadoresListPage from "./pages/TrabajadoresListPage";
import TrabajadorDetail from "./components/Trabajadores/TrabajadorDetail";
import ClienteDetailItem from "./components/Clientes/ClienteDetailItem";
import TiendaProvider from "./context/TiendaContext";
import GastosProvider from "./context/GastosContext";
import NotFound from "./pages/NotFound";
import TrabajadoresProvider from "./context/TrabajadoresContext";
import UtilidadesListPage from "./pages/UtilidadesListPage";
import UtilidadesProvider from "./context/UtilidadesContext";
import VentasListPage from "./pages/VentasListPage";
import VentasProvider from "./context/VentasContext";

import RecaudosProvider from "./context/RecaudosContext";

import VentasDetailPage from "./components/Ventas/VentasDetailPage";
import LiquidarVentasCardListPage from "./pages/LiquidarVentasCardListPage";
import RecaudosListPage from "./pages/RecaudosListPage";
import RecaudosDetail from "./components/Recaudos/RecaudosDetail";
import RegisterPage from "./pages/RegisterPage";
import CierresCajaPage from "./pages/CierresCajaPage";
import ClientesDisponiblesListPage from "./pages/ClientesDisponiblesListPage";
import HomePageTiendaInfo from "./components/HomePage/HomePageTiendaInfo";





function App() {
  return (
    <div className="App">
      <AuthProvider>
      <VentasProvider>
      <TrabajadoresProvider>
          <ClientesProvider>
        <AportesProvider>
          <GastosProvider>
          <UtilidadesProvider>
          
          <RecaudosProvider>
        <TiendaProvider>
        <div className="mb-5">
          <Header />
        </div>
        <br /><br />
        
        <Routes>
            <Route path="/register/" element={<RegisterPage />} />
            <Route path="/cierres/" element={<CierresCajaPage />} />
            <Route path="/login/" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/tiendas/detail/" element={<HomePageTiendaInfo />} />            
            <Route path="/aportes/" element={<AportesListPage />}/>
            <Route path="/gastos/" element={<GastosListPage />}/>
            <Route path="/utilidades/" element={<UtilidadesListPage />}/>
            <Route path="/ventas/" element={<VentasListPage />} />
            <Route path="/ventas/:ventaId/" element={<VentasDetailPage />} />
            <Route path="/recaudos/" element={<RecaudosListPage />} />
            <Route path="/recaudos/:recaudoId/" element={<RecaudosDetail />} />
            <Route path="/liquidar/" element={<LiquidarVentasCardListPage />} />
            <Route path="/clientes/" element={<ClientesListPage />}/>
            <Route path="/clientes/disponibles/" element={<ClientesDisponiblesListPage />}/>
            <Route path="/clientes/:clienteId/" element={<ClienteDetailItem />}/>
            <Route path="/trabajadores/" element={<TrabajadoresListPage />}/>
            <Route path="/trabajadores/:trabajadorId/" element={<TrabajadorDetail />}/>
            <Route path="/not/" element={<NotFound />}/>
        </Routes>
        
        </TiendaProvider>
          </RecaudosProvider>
          
          </UtilidadesProvider>
          </GastosProvider>
        </AportesProvider>
          </ClientesProvider >
          </TrabajadoresProvider>
          </VentasProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
