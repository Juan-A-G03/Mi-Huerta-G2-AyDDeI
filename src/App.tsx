import { useState } from 'react'
import type { Page, NavContext } from './types'
import { DataProvider } from './context/DataContext'
import FloatingChatbot from './components/FloatingChatbot'

import Login from './pages/Login'
import Register from './pages/Register'
import Menu from './pages/Menu'
import Notificaciones from './pages/Notificaciones'
import Familias from './pages/Familias'
import FamiliaDetalle from './pages/FamiliaDetalle'
import FamiliaCrear from './pages/FamiliaCrear'
import CultivosAceptados from './pages/CultivosAceptados'
import ModulosDisponibles from './pages/ModulosDisponibles'
import SiembrasFinalizarList from './pages/SiembrasFinalizarList'
import SiembraForm from './pages/SiembraForm'
import CosechasPendientes from './pages/CosechasPendientes'
import CosechaExito from './pages/CosechaExito'
import HistorialCosechas from './pages/HistorialCosechas'
import Reportes from './pages/Reportes'
import ManualUsuario from './pages/ManualUsuario'
import Perfil from './pages/Perfil'
import ModificarUsuario from './pages/ModificarUsuario'
import CambiarPassword from './pages/CambiarPassword'
import CultivoDetalle from './pages/CultivoDetalle'
import Tutoriales from './pages/Ayuda'
import FAQ from './pages/FAQ'
import Chatbot from './pages/Chatbot'

export default function App() {
  // Inicio directo en Menú Principal (Landing Page) segun la consigna
  const [history, setHistory] = useState<Array<{ page: Page; params: Record<string, unknown> }>>([
    { page: 'menu', params: {} },
  ])
  const [notifCount, setNotifCount] = useState(3)

  const current = history[history.length - 1]

  const navigateTo = (page: Page, params: Record<string, unknown> = {}) => {
    setHistory((h) => [...h, { page, params }])
  }

  const goBack = () => {
    if (history.length > 1) setHistory((h) => h.slice(0, -1))
  }

  const ctx: NavContext = {
    navigateTo,
    goBack,
    params: current.params,
    notifCount,
    setNotifCount,
  }

  const pageMap: Record<Page, React.ReactNode> = {
    login: <Login ctx={ctx} />,
    register: <Register ctx={ctx} />,
    menu: <Menu ctx={ctx} />,
    notificaciones: <Notificaciones ctx={ctx} />,
    familias: <Familias ctx={ctx} />,
    'familia-detalle': <FamiliaDetalle ctx={ctx} />,
    'familia-crear': <FamiliaCrear ctx={ctx} />,
    'cultivos-aceptados': <CultivosAceptados ctx={ctx} />,
    'modulos-disponibles': <ModulosDisponibles ctx={ctx} />,
    'siembras-finalizar': <SiembrasFinalizarList ctx={ctx} />,
    'siembra-form': <SiembraForm ctx={ctx} />,
    'cosechas-pendientes': <CosechasPendientes ctx={ctx} />,
    'cosecha-harvest': <CosechasPendientes ctx={ctx} />,
    'cosecha-exito': <CosechaExito ctx={ctx} />,
    'historial-cosechas': <HistorialCosechas ctx={ctx} />,
    reportes: <Reportes ctx={ctx} />,
    'manual-usuario': <ManualUsuario ctx={ctx} />,
    perfil: <Perfil ctx={ctx} />,
    'modificar-usuario': <ModificarUsuario ctx={ctx} />,
    'cambiar-password': <CambiarPassword ctx={ctx} />,
    'cultivo-detalle': <CultivoDetalle ctx={ctx} />,
    ayuda: <FAQ ctx={ctx} />,
    tutoriales: <Tutoriales ctx={ctx} />,
    faq: <FAQ ctx={ctx} />,
    chatbot: <Chatbot ctx={ctx} />,
  }

  return (
    <DataProvider>
      <div className="min-h-screen relative" style={{ fontFamily: "'Nunito', sans-serif" }}>
        {pageMap[current.page]}
        <FloatingChatbot ctx={ctx} currentPage={current.page} />
      </div>
    </DataProvider>
  )
}
