import Header from '../components/Header'
import type { NavContext } from '../types'
import { useData } from '../context/DataContext'

export default function CultivosAceptados({ ctx }: { ctx: NavContext }) {
  const { familiasAceptadas, familiasAsignadas } = useData()

  // Familias aceptadas que aun no tienen modulo asignado
  const familiasPendientes = familiasAceptadas.filter(
    (f) => !familiasAsignadas.includes(f.familia)
  )

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} showBack backLabel="Menú principal" backPage="menu" />

      <main className="max-w-2xl mx-auto px-4 pt-12 pb-16">
        <h2 className="text-xl font-black mb-6" style={{ color: 'var(--foreground)' }}>
          Lista de cultivos aceptados pendientes
        </h2>

        {familiasPendientes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[var(--border)] p-8 text-center shadow-xs">
            <span className="text-4xl mb-3 block">🌿</span>
            <h3 className="font-bold text-base text-[var(--foreground)] mb-1">
              No hay familias ni cultivos aceptados pendientes
            </h3>
            <p className="text-xs text-[var(--muted-foreground)] mb-4 max-w-md mx-auto">
              Para agregar cultivos a esta lista, debes ingresar al <strong>Centro de Notificaciones</strong> y presionar <strong>"Aceptar"</strong> en la propuesta de siembra correspondiente.
            </p>
            <button
              onClick={() => ctx.navigateTo('notificaciones')}
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs hover:opacity-90 transition-opacity"
              style={{ background: 'var(--primary)' }}
            >
              Ir al Centro de Notificaciones →
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {familiasPendientes.map((a) => (
              <button
                key={a.id}
                onClick={() => ctx.navigateTo('modulos-disponibles', { familia: a.familia })}
                className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-4 flex items-start gap-3 transition-all hover:border-[var(--primary)] text-left cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-[var(--border)]"
                  style={{ background: 'var(--secondary)' }}
                >
                  <span className="text-2xl">🌿</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>
                    Familia {a.familia}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    {a.ejemplos || 'papas, batata, zanahoria...'}
                  </p>
                  <span
                    className="text-xs font-semibold mt-1 inline-block"
                    style={{ color: 'var(--accent)' }}
                  >
                    Asignar módulo →
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200 mb-1">
                    ✓ ACEPTADO
                  </span>
                  <p className="text-[10px]" style={{ color: 'var(--muted-foreground)' }}>
                    aceptado el {a.fechaAceptado}
                  </p>
                  <p className="text-[10px]" style={{ color: 'var(--muted-foreground)' }}>
                    a las {a.horaAceptado}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
