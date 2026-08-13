import { useState } from 'react'
import type { NavContext } from '../types'
import { useData, getFormattedToday } from '../context/DataContext'

interface HeaderProps {
  ctx: NavContext
  showBack?: boolean
  backLabel?: string
  backPage?: Parameters<NavContext['navigateTo']>[0]
}

export default function Header({ ctx, showBack, backLabel, backPage }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { showPopover, dismissPopover } = useData()

  const fechaInicioSiembra = getFormattedToday(3) // 3 días posterior a la fecha actual
  const fechaFinSiembra = getFormattedToday(30) // 30 días posterior a la fecha actual

  const handleOpenNotifs = () => {
    dismissPopover()
    ctx.navigateTo('notificaciones')
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--border)] flex items-center justify-between px-4 py-2 shadow-sm">
      {/* Logo clicable que lleva al Menú Principal */}
      <button
        onClick={() => ctx.navigateTo('menu')}
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-0 p-0"
        aria-label="Ir al Menú Principal MI HUERTA"
      >
        <span className="text-xl">🌱</span>
        <span className="font-black text-lg tracking-tight" style={{ color: 'var(--primary)' }}>
          MI HUERTA
        </span>
      </button>

      <div className="flex items-center gap-3">
        {/* Bell con Contenedor Relativo para la Notificación Emergente Popover */}
        <div className="relative">
          <button
            onClick={handleOpenNotifs}
            className="relative p-1.5 rounded-full hover:bg-[var(--secondary)] transition-colors cursor-pointer"
            aria-label="Notificaciones"
          >
            <span className="text-xl">🔔</span>
            {ctx.notifCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                {ctx.notifCount}
              </span>
            )}
          </button>

          {/* Notificación Emergente / Popover / Viñeta emergente desde la campanita */}
          {showPopover && (
            <div className="absolute right-0 top-11 w-72 sm:w-80 bg-white border-2 border-amber-400 rounded-2xl shadow-2xl p-4 z-50 animate-bounce-short">
              {/* Flecha apuntando a la campanita */}
              <div className="absolute -top-2.5 right-3 w-4 h-4 bg-white border-t-2 border-l-2 border-amber-400 rotate-45"></div>

              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs">
                  <span>📢</span>
                  <span>¡Atención! Próxima Siembra</span>
                </div>
                <button
                  onClick={dismissPopover}
                  className="text-gray-400 hover:text-gray-700 text-xs font-bold px-1"
                  title="Cerrar notificación"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed mb-3">
                Se acerca la fecha para sembrar la familia <strong>Tubérculos</strong>. Periodo recomendado: desde el <strong>{fechaInicioSiembra}</strong> hasta el <strong>{fechaFinSiembra}</strong>.
              </p>

              <div className="flex justify-end gap-2">
                <button
                  onClick={dismissPopover}
                  className="px-2.5 py-1 text-xs font-semibold text-gray-500 hover:bg-gray-100 rounded-lg"
                >
                  Entendido
                </button>
                <button
                  onClick={handleOpenNotifs}
                  className="px-3 py-1 text-xs font-bold text-white rounded-lg shadow-xs hover:opacity-90 transition-opacity"
                  style={{ background: 'var(--primary)' }}
                >
                  Ver Notificaciones →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <button
          onClick={() => ctx.navigateTo('perfil')}
          className="w-8 h-8 rounded-full bg-[var(--secondary)] border-2 border-[var(--primary)] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
        >
          <span className="text-sm">👤</span>
        </button>

        {/* Hamburger Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded hover:bg-[var(--secondary)] transition-colors cursor-pointer"
          >
            <div className="flex flex-col gap-1">
              <span className="block w-5 h-0.5 bg-[var(--foreground)]" />
              <span className="block w-5 h-0.5 bg-[var(--foreground)]" />
              <span className="block w-5 h-0.5 bg-[var(--foreground)]" />
            </div>
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-10 bg-white border border-[var(--border)] rounded-xl shadow-lg py-2 w-48 z-50">
              <button
                onClick={() => {
                  ctx.navigateTo('perfil')
                  setMenuOpen(false)
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--secondary)] transition-colors"
              >
                Ir al perfil
              </button>
              <button
                onClick={() => {
                  ctx.navigateTo('login')
                  setMenuOpen(false)
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Back breadcrumb below header */}
      {showBack && (
        <div
          className="absolute left-4 -bottom-8 flex items-center gap-1 text-sm cursor-pointer hover:underline font-medium"
          style={{ color: 'var(--accent)' }}
          onClick={() => (backPage ? ctx.navigateTo(backPage) : ctx.goBack())}
        >
          <span>‹</span>
          <span>{backLabel || 'Volver'}</span>
        </div>
      )}
    </header>
  )
}
