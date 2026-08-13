import Header from '../components/Header'
import type { NavContext } from '../types'
import { useData } from '../context/DataContext'

export default function CultivoDetalle({ ctx }: { ctx: NavContext }) {
  const { cultivosData } = useData()
  const cultivoNombre = (ctx.params.cultivo as string) || 'Papa'
  const familiaNombre = (ctx.params.familia as string) || 'Tubérculos'

  const info = cultivosData[cultivoNombre] || {
    nombre: cultivoNombre,
    cientifico: 'Solanum Tuberosum',
    familia: familiaNombre,
    descripcion:
      'La papa es un tubérculo comestible de gran valor nutricional. Acumula agua y almidón en sus tallos subterráneos y requiere suelos bien aireados y ricos en materia orgánica.',
    humedad: '60% - 80%',
    luz: '6 - 8 hs',
    temp: '15°C - 22°C',
    ciclo: '90 - 120 días',
    ph: '5.0 - 6.5 (Ligeramente Ácido)',
    nutrientes: ['Nitrógeno', 'Fósforo', 'Potasio'],
    pasosCosecha: [
      'Inspeccionar el follaje: esperar a que las hojas comiencen a amarillear y secarse ligeramente.',
      'Aflojar la tierra con cuidado alrededor de la base usando una horca de mano para evitar dañar los tubérculos.',
      'Extraer suavemente la planta completa y recolectar todas las papas del sustrato.',
    ],
  }

  const paramsList = [
    { emoji: '💧', label: 'Humedad del Sustrato', value: info.humedad, sub: 'Manejar niveles de riego' },
    { emoji: '☀️', label: 'Luz Solar', value: info.luz, sub: 'Sol pleno' },
    { emoji: '🌡', label: 'Temperatura', value: info.temp, sub: 'Templado - Frío' },
    { emoji: '📅', label: 'Ciclo de Cosechas', value: info.ciclo, sub: 'Variedades Comerciales' },
    { emoji: '🧪', label: 'pH (Nivel de Acidez)', value: info.ph, sub: 'Suelo recomendado' },
    { emoji: '🌿', label: 'Nutrientes Esenciales', value: info.nutrientes.join(', '), sub: 'Aporte al suelo' },
  ]

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header
        ctx={ctx}
        showBack
        backLabel={`Familia ${familiaNombre} / ${info.nombre}`}
        backPage="familia-detalle"
      />

      <main className="max-w-3xl mx-auto px-4 pt-12 pb-16">
        <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-6 sm:p-8">
          {/* Tag & Title */}
          <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
            <span>🌱 CULTIVO DE LA FAMILIA {familiaNombre}</span>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-[var(--border)]">
            <div>
              <h2 className="text-3xl font-black text-[var(--primary)] flex items-center gap-3">
                {info.nombre}
                <span className="text-base font-normal italic text-[var(--muted-foreground)]">
                  ({info.cientifico})
                </span>
              </h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[var(--secondary)] border-2 border-[var(--primary)] flex items-center justify-center text-3xl shadow-xs">
              🥔
            </div>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-8 text-[var(--foreground)] bg-green-50/50 p-4 rounded-xl border border-green-100">
            {info.descripcion}
          </p>

          {/* Parameters Grid */}
          <h3 className="font-bold text-base mb-4 text-[var(--primary)] flex items-center gap-2">
            <span>📊</span> Parámetros de Cultivo
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {paramsList.map((p) => (
              <div
                key={p.label}
                className="rounded-xl border border-[var(--border)] p-3.5 bg-[var(--secondary)] transition-all hover:border-[var(--primary)]"
              >
                <div className="text-2xl mb-1">{p.emoji}</div>
                <div className="text-[11px] font-semibold text-[var(--muted-foreground)] mb-0.5">
                  {p.label}
                </div>
                <div className="font-bold text-sm text-[var(--primary)]">{p.value}</div>
                <div className="text-[10px] text-[var(--muted-foreground)] mt-0.5">{p.sub}</div>
              </div>
            ))}
          </div>

          {/* Harvesting Guide */}
          {info.pasosCosecha && (
            <div className="mt-8 pt-6 border-t border-[var(--border)]">
              <h3 className="font-bold text-base mb-3 text-[var(--primary)] flex items-center gap-2">
                <span>🧺</span> Pasos para Cosechar {info.nombre}
              </h3>
              <div className="space-y-3">
                {info.pasosCosecha.map((paso, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl border border-[var(--border)] bg-white shadow-xs">
                    <span className="w-6 h-6 rounded-full bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs leading-relaxed text-[var(--foreground)] font-medium pt-0.5">
                      {paso}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-[var(--border)]">
            <button
              onClick={() => ctx.navigateTo('familia-detalle', { familia: familiaNombre })}
              className="px-5 py-2.5 rounded-xl font-bold text-sm border-2 border-[var(--border)] hover:bg-[var(--secondary)] transition-colors"
            >
              Volver a Familia {familiaNombre}
            </button>
            <button
              onClick={() => ctx.navigateTo('siembra-form', { cultivo: info.nombre, familia: familiaNombre })}
              className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-[var(--primary)] shadow-sm hover:opacity-90 transition-opacity"
            >
              Planificar Siembra
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
