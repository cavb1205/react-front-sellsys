import React from 'react';
import { Routes, Route } from 'react-router-dom'

import AuthProvider from './context/AuthContext'
import ClientesProvider from './context/ClientesContext'
import AportesProvider from './context/AportesContext'

import Header from './components/Header'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { AportesListPage } from './pages/AportesListPage'
import GastosListPage from './pages/GastosListPage'
import ClientesListPage from './pages/ClientesListPage'
import TrabajadoresListPage from './pages/TrabajadoresListPage'
import TrabajadorDetail from './components/Trabajadores/TrabajadorDetail'
import ClienteDetailItem from './components/Clientes/ClienteDetailItem'
import TiendaProvider from './context/TiendaContext'
import GastosProvider from './context/GastosContext'
import TrabajadoresProvider from './context/TrabajadoresContext'
import UtilidadesListPage from './pages/UtilidadesListPage'
import UtilidadesProvider from './context/UtilidadesContext'
import VentasListPage from './pages/VentasListPage'
import VentasProvider from './context/VentasContext'

import RecaudosProvider from './context/RecaudosContext'

import VentasDetailPage from './components/Ventas/VentasDetailPage'
import LiquidarVentasCardListPage from './pages/LiquidarVentasCardListPage'
import RecaudosListPage from './pages/RecaudosListPage'
import RecaudosDetail from './components/Recaudos/RecaudosDetail'
import RegisterPage from './pages/RegisterPage'
import CierresCajaPage from './pages/CierresCajaPage'
import ClientesDisponiblesListPage from './pages/ClientesDisponiblesListPage'
import HomePageTiendaInfo from './components/HomePage/HomePageTiendaInfo'
import TiendasListPage from './pages/TiendasListPage'
import VentasPerdidasListPage from './pages/VentasPerdidasListPage'
import SelectStoresAdminPage from './pages/SelectStoresAdminPage';
import TiendasCreateAdmin from './pages/TiendasCreateAdmin';
import AportesCreate from './components/Aportes/AportesCreate';
import AportesUpdate from './components/Aportes/AportesUpdate';
import AportesDelete from './components/Aportes/AportesDelete';
import GastosCreate from './components/Gastos/GastosCreate'
import GastosDelete from './components/Gastos/GastosDelete';
import GastosUpdate from './components/Gastos/GastosUpdate';
import TipoGastoCreate from './components/Gastos/TipoGastoCreate';
import UtilidadesCreate from './components/Utilidades/UtilidadesCreate';
import UtilidadesDelete from './components/Utilidades/UtilidadesDelete';
import UtilidadesUpdate from './components/Utilidades/UtilidadesUpdate';
import TrabajadoresPassword from './components/Trabajadores/TrabajadoresPassword';
import TrabajadorCreate from './components/Trabajadores/TrabajadorCreate';
import TrabajadorDelete from './components/Trabajadores/TrabajadorDelete';
import TrabajadorUpdate from './components/Trabajadores/TrabajadorUpdate';
import ClienteCreate from './components/Clientes/ClienteCreate';
import ClienteDelete from './components/Clientes/ClienteDelete';
import ClienteUpdate from './components/Clientes/ClienteUpdate';
import VentasCreate from './components/Ventas/VentasCreate';
import VentasDelete from './components/Ventas/VentasDelete';
import VentasUpdate from './components/Ventas/VentasUpdate';
import VentasPerdida from './components/Ventas/VentasPerdida';
import RecaudosNoPago from './components/Recaudos/RecaudosNoPago';
import RecaudosCreate from './components/Recaudos/RecaudosCreate';
import RecaudosDelete from './components/Recaudos/RecaudosDelete';
import RecaudosUpdate from './components/Recaudos/RecaudosUpdate';
import CierreCaja from './components/Informes/CierreCaja';
import CierreDeleteConfirm from './components/Informes/CierreDeleteConfirm';
import AlertMembershipExpiration from './components/Utils/AlertMembershipExpiration';

function App () {
  
  
  return (
    <div className='App'>
      <AuthProvider>
        <VentasProvider>
          <TrabajadoresProvider>
            <ClientesProvider>
              <AportesProvider>
                <GastosProvider>
                  <UtilidadesProvider>
                    <RecaudosProvider>
                      <TiendaProvider>
                        <div className='mb-5'>                  
                          <Header />
                        </div>
                        <br /><br />
                        <Routes>
                          <Route path='/expired/' element={<AlertMembershipExpiration />} />
                          <Route path='/register/' element={<RegisterPage />} />
                          <Route path='/caja/' element={<CierreCaja />} />
                          <Route path='/cierres/' element={<CierresCajaPage />} />
                          <Route path='/cierre/delete/confirm/' element={<CierreDeleteConfirm />} />
                          <Route path='/login/' element={<LoginPage />} />
                          <Route path='/' element={<HomePage />} />
                          <Route path='/select/' element={<SelectStoresAdminPage />} />
                          <Route path='/tiendas/' element={<TiendasListPage />} />
                          <Route path='/tiendas/create/' element={<TiendasCreateAdmin />}></Route>
                          <Route path='/tiendas/detail/' element={<HomePageTiendaInfo />} />
                          <Route path='/aportes/' element={<AportesListPage />} />
                          <Route path='/aportes/create/' element={<AportesCreate />} />
                          <Route path='/aportes/update/' element={<AportesUpdate />} />
                          <Route path='/aportes/delete/' element={<AportesDelete />} />
                          <Route path='/gastos/' element={<GastosListPage />} />
                          <Route path='/gastos/create/' element={<GastosCreate />} />
                          <Route path='/gastos/update/' element={<GastosUpdate />} />
                          <Route path='/gastos/delete/' element={<GastosDelete />} />
                          <Route path='/gastos/tipo/create/' element={<TipoGastoCreate />} />
                          <Route path='/utilidades/' element={<UtilidadesListPage />} />
                          <Route path='/utilidades/create/' element={<UtilidadesCreate />} />
                          <Route path='/utilidades/update/' element={<UtilidadesUpdate />} />
                          <Route path='/utilidades/delete/' element={<UtilidadesDelete />} />
                          <Route path='/ventas/' element={<VentasListPage />} />
                          <Route path='/ventas/perdidas/' element={<VentasPerdidasListPage />} />
                          <Route path='/ventas/:ventaId/' element={<VentasDetailPage />} />
                          <Route path='/ventas/create/' element={<VentasCreate />} />
                          <Route path='/ventas/update/' element={<VentasUpdate />} />
                          <Route path='/ventas/delete/' element={<VentasDelete />} />
                          <Route path='/ventas/perdida/' element={<VentasPerdida />} />
                          <Route path='/recaudos/' element={<RecaudosListPage />} />
                          <Route path='/recaudos/:recaudoId/' element={<RecaudosDetail />} />
                          <Route path='/recaudos/update/' element={<RecaudosUpdate />} />
                          <Route path='/recaudos/delete/' element={<RecaudosDelete />} />
                          <Route path='/liquidar/' element={<LiquidarVentasCardListPage />} />
                          <Route path='/liquidar/pay/' element={<RecaudosCreate />} />
                          <Route path='/liquidar/nopay/' element={<RecaudosNoPago />} />
                          <Route path='/clientes/' element={<ClientesListPage />} />
                          <Route path='/clientes/create/' element={<ClienteCreate />} />
                          <Route path='/clientes/disponibles/' element={<ClientesDisponiblesListPage />} />
                          <Route path='/clientes/:clienteId/' element={<ClienteDetailItem />} />
                          <Route path='/clientes/update/' element={<ClienteUpdate />} />
                          <Route path='/clientes/delete/' element={<ClienteDelete />} />
                          <Route path='/trabajadores/' element={<TrabajadoresListPage />} />
                          <Route path='/trabajadores/create/' element={<TrabajadorCreate />} />
                          <Route path='/trabajadores/:trabajadorId/' element={<TrabajadorDetail />} />
                          <Route path='/trabajadores/update/' element={<TrabajadorUpdate />} />
                          <Route path='/trabajadores/delete/' element={<TrabajadorDelete />} />
                          <Route path='/trabajadores/password/' element={<TrabajadoresPassword />} />
                        </Routes>

                      </TiendaProvider>
                    </RecaudosProvider>

                  </UtilidadesProvider>
                </GastosProvider>
              </AportesProvider>
            </ClientesProvider>
          </TrabajadoresProvider>
        </VentasProvider>
      </AuthProvider>
    </div>
  )
}

export default App
