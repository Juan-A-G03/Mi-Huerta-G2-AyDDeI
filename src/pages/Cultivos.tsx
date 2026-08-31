import { useState } from 'react'
import Header from '../components/Header'
import type { NavContext } from '../types'
import { useData } from '../context/DataContext'

export default function Cultivos({ ctx }: { ctx: NavContext }) {
  const { cultivosData, familias, eliminarCultivo, asignarCultivoAFamilia } = useData()
  const [filtro, setFiltro] = useState<'todos' | 'asignada' | 'sin-asignar'>('todos')
  const [asignarA, setAsignarA] = useState<string | null>(null)
  const [eliminarA, setEliminarA] = useState<string | null>(null)
  const [familiaElegida, setFamiliaElegida] = useState('')

  const cultivos = Object.values(cultivosData)
  const familiasActivas = familias.filter((f) => f.activa)

  const filtrados = cultivos.filter((c) => {
    const asignado = !!c.familia
    if (filtro === 'asignada') return asignado
    if (filtro === 'sin-asignar') return !asignado
    return true
  })

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} showBack backLabel="Familias y Cultivos" backPage="familias" />

      <main className="max-w-3xl mx-auto px-4 pt-12 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black" style={{ color: 'var(--foreground)' }}>Cultivos</h2>
          <button
            onClick={() => ctx.navigateTo('cultivo-crear')}
            className="flex items-center gap-1 px-4 py-2 rounded-lg text-white text-sm font-bold hover:opacity-90"
            style={{ background: 'var(--primary)' }}
          >
            + Crear nuevo cultivo
          </button>
        </div>

        <div className="flex gap-1 mb-6 border-b border-[var(--border)]">
          {([
            { key: 'todos', label: 'Todos' },
            { key: 'asignada', label: 'Familia asignada' },
            { key: 'sin-asignar', label: 'Sin asignar' },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setFiltro(t.key)}
              className="px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors cursor-pointer"
              style={{
                background: filtro === t.key ? 'var(--primary)' : 'transparent',
                color: filtro === t.key ? 'white' : 'var(--muted-foreground)',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtrados.map((c) => (
            <div key={c.nombre} className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm">
              <div className="w-full h-20 bg-[var(--secondary)] flex items-center justify-center">
                <span className="text-4xl">🥬</span>
              </div>
              <div className="p-3">
                <p className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>{c.nombre}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                  {c.familia ? `Familia ${c.familia}` : 'Sin familia asignada'}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => ctx.navigateTo('cultivo-detalle', { cultivo: c.nombre, familia: c.familia || 'Sin asignar' })}
                    className="text-xs hover:underline cursor-pointer" style={{ color: 'var(--accent)' }}
                  >
                    👁 Ver
                  </button>
                  <button
                    onClick={() => ctx.navigateTo('cultivo-crear', { cultivo: c.nombre, editar: true })}
                    className="text-xs hover:underline cursor-pointer" style={{ color: 'var(--accent)' }}
                  >
                    ✏️ Modificar
                  </button>
                  <button
                    onClick={() => setEliminarA(c.nombre)}
                    className="text-xs hover:underline cursor-pointer" style={{ color: 'var(--danger)' }}
                  >
                    🗑 Eliminar
                  </button>
                </div>
                {!c.familia && (
                  <button
                    onClick={() => { setAsignarA(c.nombre); setFamiliaElegida('') }}
                    className="mt-2 w-full px-3 py-1.5 rounded-lg text-white text-xs font-bold hover:opacity-90 cursor-pointer"
                    style={{ background: 'var(--accent)' }}
                  >
                    Asignar a una familia
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtrados.length === 0 && (
          <div className="bg-white rounded-2xl border border-[var(--border)] p-8 text-center">
            <p className="text-sm font-bold" style={{ color: 'var(--muted-foreground)' }}>
              No hay cultivos en esta categoría
            </p>
          </div>
        )}
      </main>

      {/* Modal asignar a familia */}
      {asignarA && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h3 className="font-bold text-base mb-2" style={{ color: 'var(--foreground)' }}>
              Asignar {asignarA} a una familia
            </h3>
            <select
              value={familiaElegida}
              onChange={(e) => setFamiliaElegida(e.target.value)}
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm mb-4 outline-none focus:border-[var(--primary)]"
            >
              <option value="">Seleccionar familia...</option>
              {familiasActivas.map((f) => (
                <option key={f.nombre} value={f.nombre}>{f.nombre}</option>
              ))}
            </select>
            <div className="flex gap-3">
              <button onClick={() => setAsignarA(null)}
                className="flex-1 py-2 rounded-lg font-bold text-sm border border-[var(--border)] hover:bg-[var(--secondary)]">
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (familiaElegida) {
                    asignarCultivoAFamilia(asignarA, familiaElegida)
                  }
                  setAsignarA(null)
                }}
                disabled={!familiaElegida}
                className="flex-1 py-2 rounded-lg font-bold text-sm text-white disabled:opacity-50"
                style={{ background: 'var(--primary)' }}
              >
                Asignar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal eliminar */}
      {eliminarA && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h3 className="font-bold text-base mb-2" style={{ color: 'var(--foreground)' }}>
              Eliminar cultivo ({eliminarA})
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
              Se eliminará el cultivo <strong>{eliminarA}</strong> del catálogo y de cualquier familia. ¿Está seguro?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setEliminarA(null)}
                className="flex-1 py-2 rounded-lg font-bold text-sm border border-[var(--border)] hover:bg-[var(--secondary)]">
                Cancelar
              </button>
              <button
                onClick={() => { eliminarCultivo(eliminarA); setEliminarA(null) }}
                className="flex-1 py-2 rounded-lg font-bold text-sm text-white bg-red-500 hover:opacity-90"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
