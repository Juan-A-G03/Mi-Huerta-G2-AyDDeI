import { useState } from 'react'
import Header from '../components/Header'
import type { NavContext } from '../types'
import { useData } from '../context/DataContext'

export default function Familias({ ctx }: { ctx: NavContext }) {
  const [submenu, setSubmenu] = useState<'list' | null>(null)

  if (submenu === 'list') {
    return <FamiliasList ctx={ctx} onBack={() => setSubmenu(null)} />
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} showBack backLabel="Menú principal" backPage="menu" />

      <main className="max-w-xs mx-auto px-4 pt-14 pb-16">
        <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
          <div className="px-4 py-3 font-bold text-sm border-b border-[var(--border)]"
            style={{ color: 'var(--foreground)' }}>Familias y Cultivos</div>
          <button
            onClick={() => setSubmenu('list')}
            className="w-full flex items-center justify-between px-4 py-3 text-sm border-t border-[var(--border)] hover:bg-[var(--secondary)] transition-colors"
            style={{ color: 'var(--foreground)' }}
          >
            Familias
            <span style={{ color: 'var(--muted-foreground)' }}>›</span>
          </button>
          <button
            onClick={() => ctx.navigateTo('cultivos')}
            className="w-full flex items-center justify-between px-4 py-3 text-sm border-t border-[var(--border)] hover:bg-[var(--secondary)] transition-colors"
            style={{ color: 'var(--foreground)' }}
          >
            Cultivos
            <span style={{ color: 'var(--muted-foreground)' }}>›</span>
          </button>
        </div>
      </main>
    </div>
  )
}

function FamiliasList({ ctx, onBack }: { ctx: NavContext; onBack: () => void }) {
  const { familias } = useData()
  const familiasActivas = familias.filter((f) => f.activa)

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} />

      <main className="max-w-3xl mx-auto px-4 pt-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="flex items-center gap-1 text-sm font-semibold"
            style={{ color: 'var(--accent)' }}>
            ‹ Familias y Cultivos
          </button>
          <button
            onClick={() => ctx.navigateTo('familia-crear')}
            className="flex items-center gap-1 px-4 py-2 rounded-lg text-white text-sm font-bold hover:opacity-90"
            style={{ background: 'var(--primary)' }}
          >
            + Crear nueva familia
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {familiasActivas.map(f => (
            <div
              key={f.nombre}
              className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm"
            >
              {/* Image placeholder */}
              <div className="w-full h-24 bg-[var(--secondary)] flex items-center justify-center">
                <span className="text-4xl">🌿</span>
              </div>
              <div className="p-3">
                <p className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>{f.nombre}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{f.ejemplos}</p>
                <button
                  onClick={() => ctx.navigateTo('familia-detalle', { familia: f.nombre })}
                  className="mt-2 flex items-center gap-1 text-xs hover:underline"
                  style={{ color: 'var(--accent)' }}
                >
                  👁 Ver detalles e info de la familia
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
