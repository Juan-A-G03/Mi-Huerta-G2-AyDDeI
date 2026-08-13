import { useState } from 'react'
import Header from '../components/Header'
import type { NavContext } from '../types'
import { useData } from '../context/DataContext'

export default function SiembrasFinalizarList({ ctx }: { ctx: NavContext }) {
  const { siembras } = useData()
  const [buscar, setBuscar] = useState('')

  const filtradas = siembras.filter(
    (s) =>
      s.modulo.toLowerCase().includes(buscar.toLowerCase()) ||
      s.cultivo.toLowerCase().includes(buscar.toLowerCase()) ||
      s.familia.toLowerCase().includes(buscar.toLowerCase())
  )

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} showBack backLabel="Menú principal" backPage="menu" />

      <main className="max-w-2xl mx-auto px-4 pt-12 pb-16">
        <h2 className="text-xl font-black mb-4" style={{ color: 'var(--foreground)' }}>
          Siembras a Finalizar
        </h2>

        <input
          type="text"
          placeholder="Buscar módulo, cultivo o familia..."
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
          className="w-full border border-[var(--border)] rounded-xl px-4 py-2 text-sm mb-5 outline-none focus:border-[var(--primary)] shadow-xs"
        />

        <div className="flex flex-col gap-3">
          {filtradas.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-black text-base" style={{ color: 'var(--foreground)' }}>
                      {s.modulo}
                    </span>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                      style={{
                        background: s.estado === 'FINALIZADA' ? 'var(--primary)' : 'var(--warning)',
                      }}
                    >
                      {s.estado}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    Familia: {s.familia}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    Cultivo: {s.cultivo}
                  </p>
                  <p className="text-xs font-medium text-[var(--primary)] mt-1">
                    Siembra aceptada: {s.fechaSiembraAceptada}
                  </p>
                  {s.fechaSiembraReal && (
                    <p className="text-xs font-bold text-green-700">
                      Siembra realizada: {s.fechaSiembraReal} {s.horaSiembraReal && `a las ${s.horaSiembraReal}`}
                    </p>
                  )}
                </div>

                {s.estado === 'PENDIENTE' ? (
                  <button
                    onClick={() =>
                      ctx.navigateTo('siembra-form', {
                        id: s.id,
                        modulo: s.modulo,
                        familia: s.familia,
                        cultivo: s.cultivo,
                      })
                    }
                    className="shrink-0 px-4 py-2 rounded-lg text-white text-xs font-bold shadow-xs hover:opacity-90 transition-opacity"
                    style={{ background: 'var(--primary)' }}
                  >
                    FINALIZAR SIEMBRA
                  </button>
                ) : (
                  <span className="shrink-0 text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                    ✓ SIEMBRA COMPLETADA
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
