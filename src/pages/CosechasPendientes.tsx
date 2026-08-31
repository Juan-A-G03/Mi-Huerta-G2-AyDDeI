import { useState } from 'react'
import Header from '../components/Header'
import type { NavContext } from '../types'
import { useData, compareDdMm, getFormattedToday } from '../context/DataContext'

export default function CosechasPendientes({ ctx }: { ctx: NavContext }) {
  const { cosechas, completarCosecha } = useData()
  const [cosecharFamilia, setCosecharFamilia] = useState<{ id: string; familia: string; cultivoList: string[] } | null>(
    null
  )
  const [kilos, setKilos] = useState<Record<string, string>>({})

  const hoy = getFormattedToday()
  const pendientesActivas = cosechas.filter(
    (c) => !c.completada && compareDdMm(hoy, c.fechaDesde) >= 0 && compareDdMm(hoy, c.fechaHasta) <= 0
  )

  const handleHarvestClick = (c: (typeof cosechas)[0]) => {
    let cultivoList = [c.cultivo]
    if (c.familia === 'Tubérculos') cultivoList = ['Papa', 'Batata', 'Zanahoria']
    if (c.familia === 'Solanáceas') cultivoList = ['Tomate', 'Morrón']
    setCosecharFamilia({ id: c.id, familia: c.familia, cultivoList })
  }

  const handleFinalizarCosecha = () => {
    if (cosecharFamilia) {
      const numKilos: Record<string, number> = {}
      Object.entries(kilos).forEach(([k, v]) => {
        numKilos[k] = parseFloat(v) || 0
      })
      completarCosecha(cosecharFamilia.id, numKilos)
      ctx.navigateTo('cosecha-exito', { familia: cosecharFamilia.familia, kilos })
    }
  }

  if (cosecharFamilia) {
    return (
      <CosechaHarvest
        ctx={ctx}
        familiaNombre={cosecharFamilia.familia}
        cultivoList={cosecharFamilia.cultivoList}
        kilos={kilos}
        setKilos={setKilos}
        onExito={handleFinalizarCosecha}
        onBack={() => setCosecharFamilia(null)}
      />
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} showBack backLabel="Menú principal" backPage="menu" />

      <main className="max-w-2xl mx-auto px-4 pt-12 pb-16">
        <h2 className="text-xl font-black mb-6" style={{ color: 'var(--foreground)' }}>
          Lista de Cosechas Pendientes
        </h2>

        {pendientesActivas.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[var(--border)] p-6 text-center shadow-xs">
            <span className="text-3xl mb-2 block">🎉</span>
            <p className="font-bold text-base text-[var(--primary)]">¡No tienes cosechas pendientes por hoy!</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">Todas tus cosechas están al día.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {pendientesActivas.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-4 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--secondary)' }}
                  >
                    <span className="text-2xl">🧺</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>
                      Familia: {c.familia}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">Cultivo: {c.cultivo}</p>
                    <p className="text-xs font-semibold mt-0.5" style={{ color: 'var(--warning)' }}>
                      Disponible hasta {c.fechaHasta}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleHarvestClick(c)}
                  className="px-4 py-2 rounded-lg text-white text-sm font-bold shadow-xs hover:opacity-90 transition-opacity shrink-0"
                  style={{ background: 'var(--primary)' }}
                >
                  Cosechar
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => ctx.navigateTo('historial-cosechas')}
            className="text-sm font-bold hover:underline"
            style={{ color: 'var(--accent)' }}
          >
            Ver Historial de Cosechas →
          </button>
        </div>
      </main>
    </div>
  )
}

function CosechaHarvest({
  ctx,
  familiaNombre,
  cultivoList,
  kilos,
  setKilos,
  onExito,
  onBack,
}: {
  ctx: NavContext
  familiaNombre: string
  cultivoList: string[]
  kilos: Record<string, string>
  setKilos: (k: Record<string, string>) => void
  onExito: () => void
  onBack: () => void
}) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} />

      <main className="max-w-2xl mx-auto px-4 pt-6 pb-16">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm font-semibold mb-4 cursor-pointer"
          style={{ color: 'var(--accent)' }}
        >
          ‹ Lista de Cosechas Pendientes
        </button>

        <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Registrar Cosecha: Familia {familiaNombre}
          </h2>

          <div className="flex flex-col gap-3 mb-6">
            {cultivoList.map((c) => (
              <div key={c} className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)]">
                <span className="text-xl">🌿</span>
                <span className="flex-1 font-semibold text-sm" style={{ color: 'var(--foreground)' }}>
                  {c}
                </span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min={0}
                    step="any"
                    placeholder="0"
                    value={kilos[c] || ''}
                    onChange={(e) => {
                      const nextValue = e.target.value
                      if (nextValue === '' || Number(nextValue) >= 0) {
                        setKilos({ ...kilos, [c]: nextValue })
                      }
                    }}
                    className="w-20 border border-[var(--border)] rounded-lg px-2 py-1 text-sm outline-none focus:border-[var(--primary)] text-right"
                  />
                  <span className="text-sm font-semibold" style={{ color: 'var(--muted-foreground)' }}>
                    kg
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onExito}
            className="w-full py-3 rounded-xl text-white font-bold text-sm shadow-xs hover:opacity-90 transition-opacity"
            style={{ background: 'var(--primary)' }}
          >
            Registrar Cosecha
          </button>
        </div>
      </main>
    </div>
  )
}
