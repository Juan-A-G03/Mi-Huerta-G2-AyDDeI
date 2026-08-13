import Header from '../components/Header'
import type { NavContext } from '../types'

export default function CosechaExito({ ctx }: { ctx: NavContext }) {
  const familia = (ctx.params.familia as string) || 'Tubérculos'
  const kilos = (ctx.params.kilos as Record<string, string>) || { Papa: '10', Batata: '7', Yuca: '5' }

  const hoy = new Date()
  const fecha = `${hoy.getDate().toString().padStart(2,'0')}/${(hoy.getMonth()+1).toString().padStart(2,'0')}/${hoy.getFullYear()}`

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} />

      <main className="max-w-md mx-auto px-4 pt-12 pb-16">
        {/* Success header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3"
            style={{ background: 'var(--secondary)' }}>
            <span className="text-5xl">🏆</span>
          </div>
          <h2 className="text-2xl font-black mb-1" style={{ color: 'var(--primary)' }}>¡Objetivo Logrado!</h2>
          <p className="text-sm font-semibold" style={{ color: 'var(--muted-foreground)' }}>
            Todo listo, ¡Gran Trabajo!
          </p>
        </div>

        {/* Resumen */}
        <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-5 mb-4">
          <h3 className="font-bold text-sm mb-3" style={{ color: 'var(--foreground)' }}>Resumen</h3>
          <p className="text-xs mb-0.5" style={{ color: 'var(--muted-foreground)' }}>Fecha: {fecha}</p>
          <p className="text-xs mb-3" style={{ color: 'var(--muted-foreground)' }}>Familia: {familia}</p>

          <h4 className="font-bold text-xs mb-2" style={{ color: 'var(--foreground)' }}>Cultivos Cosechados</h4>
          <div className="flex flex-col gap-2">
            {Object.entries(kilos).filter(([, v]) => v).map(([cultivo, kg]) => (
              <div key={cultivo} className="flex items-center justify-between px-3 py-2 rounded-lg"
                style={{ background: 'var(--secondary)' }}>
                <span className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>{cultivo}</span>
                <span className="font-bold text-sm" style={{ color: 'var(--primary)' }}>{kg} kg</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => ctx.navigateTo('menu')}
            className="w-full py-2.5 rounded-xl font-bold text-sm text-white hover:opacity-90"
            style={{ background: 'var(--primary)' }}
          >
            VOLVER AL MENÚ PRINCIPAL
          </button>
          <button
            onClick={() => ctx.navigateTo('cosechas-pendientes')}
            className="w-full py-2.5 rounded-xl font-bold text-sm border border-[var(--border)] hover:bg-[var(--secondary)] transition-colors"
            style={{ color: 'var(--foreground)' }}
          >
            LISTA DE COSECHAS PENDIENTES
          </button>
          <button
            onClick={() => ctx.navigateTo('historial-cosechas')}
            className="w-full py-2.5 rounded-xl font-bold text-sm hover:opacity-90"
            style={{ background: 'var(--accent)', color: 'white' }}
          >
            VER HISTORIAL
          </button>
        </div>
      </main>
    </div>
  )
}
