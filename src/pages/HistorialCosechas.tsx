import Header from '../components/Header'
import type { NavContext } from '../types'
import { useData } from '../context/DataContext'

export default function HistorialCosechas({ ctx }: { ctx: NavContext }) {
  const { historialCosechas } = useData()

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} showBack backLabel="Cosechas Pendientes" backPage="cosechas-pendientes" />

      <main className="max-w-3xl mx-auto px-4 pt-12 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📋</span>
            <h2 className="text-xl font-black" style={{ color: 'var(--foreground)' }}>
              Historial de Cosechas Realizadas
            </h2>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-[var(--secondary)] border border-[var(--border)] rounded-full text-[var(--primary)]">
            Total: {historialCosechas.reduce((acc, curr) => acc + curr.kilos, 0)} kg
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
          <div
            className="grid grid-cols-5 px-4 py-3 text-xs font-bold bg-[var(--secondary)]"
            style={{ color: 'var(--muted-foreground)' }}
          >
            <span>Fecha Cosecha</span>
            <span>Familia</span>
            <span>Cultivo</span>
            <span>Kilos</span>
            <span>Fecha Siembra</span>
          </div>
          {historialCosechas.map((h, i) => (
            <div
              key={h.id || i}
              className="grid grid-cols-5 items-center px-4 py-3 border-t border-[var(--border)] text-sm"
              style={{ background: i % 2 === 0 ? 'white' : 'var(--muted)' }}
            >
              <span style={{ color: 'var(--foreground)' }}>{h.fecha}</span>
              <span style={{ color: 'var(--foreground)' }}>{h.familia}</span>
              <span className="font-semibold text-[var(--foreground)]">{h.cultivo}</span>
              <span className="font-bold" style={{ color: 'var(--primary)' }}>
                {h.kilos} Kg
              </span>
              <span style={{ color: 'var(--muted-foreground)' }}>{h.fechaSiembra}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
