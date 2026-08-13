import { useState } from 'react'
import Header from '../components/Header'
import type { NavContext } from '../types'
import { useData } from '../context/DataContext'

const desviosData = [
  { id: 26, tipo: 'Riego', motivo: 'Humedad Baja (40%)', modulo: 6, cultivo: 'Papa', fecha: '04/05/2026' },
  { id: 25, tipo: 'Invernadero', motivo: 'Helada (5°C)', modulo: 7, cultivo: 'Batata', fecha: '02/05/2026' },
  { id: 24, tipo: 'Invernadero', motivo: 'Helada (6°C)', modulo: 6, cultivo: 'Papa', fecha: '02/05/2026' },
]

export default function Notificaciones({ ctx }: { ctx: NavContext }) {
  const { notificaciones, aceptarNotificacion, rechazarNotificacion } = useData()
  const [tab, setTab] = useState<'notif' | 'desvios'>('notif')
  const [desvioDetail, setDesvioDetail] = useState<number | null>(null)

  const handleAccept = (id: string) => {
    aceptarNotificacion(id)
    ctx.setNotifCount(Math.max(0, ctx.notifCount - 1))
  }

  const handleReject = (id: string) => {
    rechazarNotificacion(id)
    ctx.setNotifCount(Math.max(0, ctx.notifCount - 1))
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} showBack backLabel="Menú principal" backPage="menu" />

      <main className="max-w-2xl mx-auto px-4 pt-12 pb-16">
        <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
          Centro de Notificaciones
        </h2>

        <div className="flex gap-1 mb-6 border-b border-[var(--border)]">
          {(['notif', 'desvios'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors cursor-pointer"
              style={{
                background: tab === t ? 'var(--primary)' : 'transparent',
                color: tab === t ? 'white' : 'var(--muted-foreground)',
              }}
            >
              {t === 'notif' ? 'Notificaciones' : 'Desvíos'}
            </button>
          ))}
        </div>

        {tab === 'notif' ? (
          <div className="flex flex-col gap-3">
            {notificaciones.map((n) => (
              <div
                key={n.id}
                className="bg-white rounded-xl border border-[var(--border)] p-4 flex flex-col gap-2 shadow-xs transition-all"
                style={{ opacity: n.accepted ? 0.75 : 1 }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>
                      {n.tipo === 'siembra' ? '🌱' : '🧺'} {n.titulo}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                      {n.mensaje}
                    </p>
                  </div>
                  {n.accepted && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 shrink-0 border border-green-200">
                      ✓ Aceptada
                    </span>
                  )}
                </div>

                {!n.accepted && (
                  <div className="flex gap-2 flex-wrap mt-1">
                    <button
                      onClick={() => handleReject(n.id)}
                      className="px-3 py-1.5 text-xs font-bold rounded-lg text-white bg-red-500 hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      Rechazar
                    </button>
                    <button
                      onClick={() => handleAccept(n.id)}
                      className="px-4 py-1.5 text-xs font-bold rounded-lg text-white hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                      style={{ background: 'var(--primary)' }}
                    >
                      Aceptar
                    </button>
                    {n.familia && (
                      <button
                        onClick={() => ctx.navigateTo('familia-detalle', { familia: n.familia })}
                        className="px-3 py-1.5 text-xs font-bold rounded-lg border hover:bg-[var(--secondary)] transition-colors cursor-pointer"
                        style={{ borderColor: 'var(--border)', color: 'var(--accent)' }}
                      >
                        + info
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}

            {notificaciones.length === 0 && (
              <div className="bg-white rounded-2xl border border-[var(--border)] p-8 text-center">
                <span className="text-3xl mb-2 block">🔔</span>
                <p className="text-sm font-bold" style={{ color: 'var(--muted-foreground)' }}>
                  No hay notificaciones pendientes en este momento
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[var(--border)] overflow-hidden shadow-xs">
            <div
              className="grid grid-cols-5 text-xs font-bold px-4 py-2 bg-[var(--secondary)]"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <span>Notif.</span>
              <span>Corrección</span>
              <span>Motivo</span>
              <span>Módulo/Cultivo</span>
              <span>Fecha</span>
            </div>
            {desviosData.map((d) => (
              <div
                key={d.id}
                className="grid grid-cols-5 items-center text-xs px-4 py-3 border-t border-[var(--border)]"
              >
                <span className="font-semibold">#{d.id}</span>
                <span>{d.tipo}</span>
                <span style={{ color: 'var(--warning)' }}>{d.motivo}</span>
                <span>
                  M#{d.modulo} / {d.cultivo}
                </span>
                <div className="flex items-center gap-1">
                  <span style={{ color: 'var(--muted-foreground)' }}>{d.fecha}</span>
                  <button
                    onClick={() => setDesvioDetail(d.id)}
                    className="text-[10px] px-2 py-0.5 rounded font-bold text-white shadow-xs cursor-pointer"
                    style={{ background: 'var(--accent)' }}
                  >
                    Ver
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Desvío detail modal */}
      {desvioDetail !== null &&
        (() => {
          const d = desviosData.find((x) => x.id === desvioDetail)!
          return (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full border border-[var(--border)]">
                <h3 className="font-bold text-base mb-2" style={{ color: 'var(--foreground)' }}>
                  ⚠️ Alerta de desvío #{d.id}
                </h3>
                <p className="text-sm mb-1">
                  <strong>Tipo:</strong> {d.tipo}
                </p>
                <p className="text-sm mb-1">
                  <strong>Motivo:</strong> {d.motivo}
                </p>
                <p className="text-sm mb-1">
                  <strong>Módulo:</strong> #{d.modulo}
                </p>
                <p className="text-sm mb-4">
                  <strong>Cultivo:</strong> {d.cultivo}
                </p>
                <button
                  onClick={() => setDesvioDetail(null)}
                  className="w-full py-2 rounded-lg text-white font-bold text-sm cursor-pointer shadow-xs"
                  style={{ background: 'var(--primary)' }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )
        })()}
    </div>
  )
}
