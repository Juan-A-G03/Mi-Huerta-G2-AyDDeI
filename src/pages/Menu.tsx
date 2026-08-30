import Header from '../components/Header'
import type { NavContext } from '../types'

const menuItems = [
  { label: 'Lista de cultivos aceptados pendientes', page: 'cultivos-aceptados' as const, emoji: '🌿' },
  { label: 'Lista de cosechas pendientes', page: 'cosechas-pendientes' as const, emoji: '🧺' },
  { label: 'Siembras a finalizar', page: 'siembras-finalizar' as const, emoji: '🌱' },
  { label: 'Reportes', page: 'reportes' as const, emoji: '📊' },
  { label: 'Familias', page: 'familias' as const, emoji: '🌻' },
  { label: 'Manual de usuario', page: 'manual-usuario' as const, emoji: '📘' },
  { label: 'Tutoriales', page: 'tutoriales' as const, emoji: '🎬' },
]

export default function Menu({ ctx }: { ctx: NavContext }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} />

      <main className="max-w-3xl mx-auto px-6 pt-10 pb-16">
        <h2 className="text-lg font-bold mb-8" style={{ color: 'var(--primary)' }}>
          Menú principal
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {menuItems.map(({ label, page, emoji }) => (
            <button
              key={page}
              onClick={() => ctx.navigateTo(page)}
              className="flex items-center gap-3 px-6 py-6 rounded-2xl border-2 text-left font-bold text-sm hover:shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0"
              style={{
                background: 'var(--secondary)',
                borderColor: 'var(--border)',
                color: 'var(--secondary-foreground)',
              }}
            >
              <span className="text-2xl">{emoji}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-end mt-10">
          <button
            onClick={() => ctx.navigateTo('faq')}
            className="flex items-center gap-2 text-sm hover:underline"
            style={{ color: 'var(--accent)' }}
          >
            Preguntas frecuentes
            <span className="w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-base"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>?</span>
          </button>
        </div>
      </main>
    </div>
  )
}
