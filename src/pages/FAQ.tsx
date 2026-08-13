import Header from '../components/Header'
import type { NavContext } from '../types'

const preguntas = [
  '¿Cómo iniciar sesión?',
  '¿Cómo ver módulos disponibles?',
  '¿Olvidaste tu contraseña?',
  '¿En qué época del año se siembran las distintas familias?',
  '¿Dónde ver siembras propuestas?',
  '¿Cómo sembrar cada familia?',
  '¿No tienes una cuenta?',
  '¿Cómo desactivar una cuenta?',
  '¿Cómo modificar usuario?',
]

export default function FAQ({ ctx }: { ctx: NavContext }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} showBack backLabel="Menú principal" backPage="menu" />

      <main className="max-w-2xl mx-auto px-4 pt-12 pb-16">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">?</span>
          <h2 className="text-xl font-black" style={{ color: 'var(--foreground)' }}>Ayuda</h2>
        </div>

        <div className="mb-4">
          <input type="text" placeholder="Buscar..."
            className="w-full border border-[var(--border)] rounded-xl px-4 py-2 text-sm outline-none focus:border-[var(--primary)]" />
        </div>

        <h3 className="font-bold text-sm mb-3" style={{ color: 'var(--muted-foreground)' }}>Preguntas frecuentes:</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {preguntas.map(p => (
            <button
              key={p}
              className="text-left p-3 rounded-xl border border-[var(--border)] bg-white hover:bg-[var(--secondary)] transition-colors text-sm font-semibold hover:-translate-y-0.5 transition-all"
              style={{ color: 'var(--accent)' }}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => ctx.navigateTo('chatbot')}
            className="px-5 py-2.5 rounded-xl font-bold text-sm text-white hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            💬 Chatbot IA
          </button>
          <button
            onClick={() => ctx.navigateTo('tutoriales')}
            className="px-5 py-2.5 rounded-xl font-bold text-sm border border-[var(--border)] hover:bg-[var(--secondary)]"
            style={{ color: 'var(--foreground)' }}
          >
            🎬 Tutoriales
          </button>
        </div>
      </main>
    </div>
  )
}
