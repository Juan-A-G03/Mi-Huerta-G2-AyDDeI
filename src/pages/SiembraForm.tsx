import { useState } from 'react'
import Header from '../components/Header'
import type { NavContext } from '../types'
import { useData } from '../context/DataContext'

export default function SiembraForm({ ctx }: { ctx: NavContext }) {
  const { finalizarSiembra } = useData()
  const siembraId = (ctx.params.id as string) || 's1'
  const modulo = (ctx.params.modulo as string) || '#5'
  const familia = (ctx.params.familia as string) || 'Tubérculos'
  const cultivo = (ctx.params.cultivo as string) || 'Papa'

  const now = new Date()
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  const [fecha, setFecha] = useState(today)
  const [hora, setHora] = useState(currentTime)
  const [showCalendario, setShowCalendario] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // Calendar state
  const [calMonth, setCalMonth] = useState(new Date())

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay()

  const year = calMonth.getFullYear()
  const month = calMonth.getMonth()
  const days = daysInMonth(year, month)
  const firstDay = firstDayOfMonth(year, month)
  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  const selectDay = (d: number) => {
    const mm = String(month + 1).padStart(2, '0')
    const dd = String(d).padStart(2, '0')
    setFecha(`${year}-${mm}-${dd}`)
    setShowCalendario(false)
  }

  const handleGuardar = () => {
    finalizarSiembra(siembraId, fecha, hora)
    ctx.navigateTo('siembras-finalizar')
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} showBack backLabel="Siembras a Finalizar" backPage="siembras-finalizar" />

      <main className="max-w-md mx-auto px-4 pt-12 pb-16">
        <h2 className="text-xl font-black mb-1" style={{ color: 'var(--foreground)' }}>
          Siembras a Finalizar
        </h2>

        <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-6 mt-4">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-black" style={{ color: 'var(--foreground)' }}>
              MÓDULO {modulo}
            </h3>
            <p className="text-sm font-semibold mt-1" style={{ color: 'var(--muted-foreground)' }}>
              FAMILIA: {familia} &nbsp;|&nbsp; CULTIVO: {cultivo}
            </p>
          </div>

          <h4
            className="font-bold text-sm mb-4 border-b border-[var(--border)] pb-2"
            style={{ color: 'var(--foreground)' }}
          >
            DATOS DE LA SIEMBRA
          </h4>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>
                📅 Día de siembra:
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="flex-1 border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
                />
                <button
                  onClick={() => setShowCalendario(!showCalendario)}
                  className="px-3 py-2 rounded-lg text-white text-xs font-bold shadow-xs hover:opacity-90"
                  style={{ background: 'var(--accent)' }}
                >
                  Cal.
                </button>
              </div>
            </div>

            {showCalendario && (
              <div className="border border-[var(--border)] rounded-xl p-3" style={{ background: 'var(--secondary)' }}>
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => setCalMonth(new Date(year, month - 1, 1))}
                    className="px-2 py-1 text-xs font-bold hover:bg-white rounded"
                  >
                    ‹
                  </button>
                  <span className="text-sm font-bold">
                    {monthNames[month]} {year}
                  </span>
                  <button
                    onClick={() => setCalMonth(new Date(year, month + 1, 1))}
                    className="px-2 py-1 text-xs font-bold hover:bg-white rounded"
                  >
                    ›
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-0.5 text-center">
                  {dayNames.map((d) => (
                    <div key={d} className="text-[10px] font-bold py-1" style={{ color: 'var(--muted-foreground)' }}>
                      {d}
                    </div>
                  ))}
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`e${i}`} />
                  ))}
                  {Array.from({ length: days }).map((_, i) => {
                    const d = i + 1
                    const isSelected =
                      fecha === `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
                    return (
                      <button
                        key={d}
                        onClick={() => selectDay(d)}
                        className="text-xs py-1 rounded transition-colors hover:bg-white"
                        style={{
                          background: isSelected ? 'var(--primary)' : 'transparent',
                          color: isSelected ? 'white' : 'var(--foreground)',
                          fontWeight: isSelected ? 'bold' : 'normal',
                        }}
                      >
                        {d}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>
                🕐 Hora de siembra:
              </label>
              <input
                type="time"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => ctx.navigateTo('siembras-finalizar')}
              className="flex-1 py-2.5 rounded-lg font-bold text-sm border-2 hover:opacity-90 transition-opacity"
              style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}
            >
              CANCELAR SIEMBRA
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="flex-1 py-2.5 rounded-lg font-bold text-sm text-white hover:opacity-90 transition-opacity shadow-xs"
              style={{ background: 'var(--primary)' }}
            >
              GUARDAR SIEMBRA
            </button>
          </div>
        </div>
      </main>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h3 className="font-bold text-base mb-2 text-[var(--primary)]">✅ Siembra guardada exitosamente</h3>
            <p className="text-sm mb-1">
              <strong>Módulo:</strong> {modulo}
            </p>
            <p className="text-sm mb-1">
              <strong>Cultivo:</strong> {cultivo}
            </p>
            <p className="text-sm mb-1">
              <strong>Fecha:</strong> {fecha}
            </p>
            <p className="text-sm mb-4">
              <strong>Hora:</strong> {hora}
            </p>
            <button
              onClick={handleGuardar}
              className="w-full py-2.5 rounded-lg text-white font-bold text-sm shadow-xs hover:opacity-90 transition-opacity"
              style={{ background: 'var(--primary)' }}
            >
              Aceptar y Volver a Siembras
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
