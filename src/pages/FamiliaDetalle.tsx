import { useState } from 'react'
import Header from '../components/Header'
import type { NavContext } from '../types'

const familiasInfo: Record<string, {
  descripcion: string
  humedad: string
  luz: string
  temp: string
  ciclo: string
  cultivos: string[]
}> = {
  'Tubérculos': {
    descripcion: 'Los tubérculos son órganos vegetativos subterráneos que acumulan nutrientes y energía. Son cultivos de gran importancia alimentaria en todo el mundo, especialmente en regiones templadas y frías. Requieren suelos bien drenados y ricos en materia orgánica para un desarrollo óptimo.',
    humedad: '60% - 80%',
    luz: '6 - 8 hs',
    temp: '15°C - 22°C',
    ciclo: '90 - 120 días',
    cultivos: ['Batata', 'Papa', 'Zanahoria', 'Rábano'],
  },
  'Solanáceas': {
    descripcion: 'Las solanáceas son una familia de plantas que incluye importantes cultivos alimentarios. Se caracterizan por sus flores pentámeras y frutos carnosos. Prefieren climas cálidos y suelos bien drenados con buen contenido de nutrientes.',
    humedad: '65% - 85%',
    luz: '8 - 10 hs',
    temp: '18°C - 28°C',
    ciclo: '60 - 90 días',
    cultivos: ['Tomate', 'Morrón', 'Berenjena', 'Chile'],
  },
  'Cucurbitáceas': {
    descripcion: 'Las cucurbitáceas son plantas trepadoras o rastreras que producen frutos grandes y carnosos. Son cultivos de verano que requieren espacio y calor para desarrollarse. Se caracterizan por su rápido crecimiento.',
    humedad: '70% - 90%',
    luz: '8 - 10 hs',
    temp: '20°C - 30°C',
    ciclo: '60 - 120 días',
    cultivos: ['Zapallo', 'Pepino', 'Sandía', 'Melón'],
  },
  'Crucíferas': {
    descripcion: 'Las crucíferas son plantas de clima frío y moderado, ricas en vitaminas y minerales. Son muy versátiles en la cocina y en la huerta.',
    humedad: '60% - 80%',
    luz: '6 - 8 hs',
    temp: '10°C - 20°C',
    ciclo: '60 - 100 días',
    cultivos: ['Brócoli', 'Repollo', 'Coliflor', 'Rúcula'],
  },
  'Leguminosas': {
    descripcion: 'Las leguminosas fijan nitrógeno del aire al suelo, enriqueciéndolo de forma natural. Son excelentes cultivos de rotación y fuente importante de proteínas vegetales.',
    humedad: '55% - 75%',
    luz: '6 - 8 hs',
    temp: '15°C - 25°C',
    ciclo: '50 - 90 días',
    cultivos: ['Haba', 'Frijol', 'Arveja', 'Lenteja'],
  },
  'Liliáceas': {
    descripcion: 'Las liliáceas incluyen plantas aromáticas y condimentarias de gran uso culinario. Son cultivos resistentes que se adaptan bien a diferentes tipos de suelo.',
    humedad: '50% - 70%',
    luz: '6 - 8 hs',
    temp: '12°C - 22°C',
    ciclo: '120 - 180 días',
    cultivos: ['Cebolla', 'Ajo', 'Puerro', 'Ciboulette'],
  },
}

export default function FamiliaDetalle({ ctx }: { ctx: NavContext }) {
  const nombre = (ctx.params.familia as string) || 'Tubérculos'
  const info = familiasInfo[nombre] || familiasInfo['Tubérculos']
  const [showBajaModal, setShowBajaModal] = useState(false)
  const [showValidacionModal, setShowValidacionModal] = useState(false)

  const params = [
    { emoji: '💧', label: 'Humedad del Sustrato', value: info.humedad, sub: 'Manejar niveles de riego' },
    { emoji: '☀️', label: 'Luz Solar', value: info.luz, sub: 'Sol pleno' },
    { emoji: '🌡', label: 'Temperatura', value: info.temp, sub: 'Templado - Frío' },
    { emoji: '📅', label: 'Ciclo de Cosechas', value: info.ciclo, sub: 'Variedades Comerciales' },
  ]

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} showBack backLabel="Lista de familias" backPage="familias" />

      <main className="max-w-3xl mx-auto px-4 pt-12 pb-16">
        <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-6">
          <h2 className="text-2xl font-black mb-3" style={{ color: 'var(--primary)' }}>{nombre}</h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
            {info.descripcion}
          </p>

          {/* Params */}
          <h3 className="font-bold text-sm mb-3" style={{ color: 'var(--accent)' }}>Parámetros</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {params.map(p => (
              <div key={p.label} className="rounded-xl border border-[var(--border)] p-3 text-center"
                style={{ background: 'var(--secondary)' }}>
                <div className="text-xl mb-1">{p.emoji}</div>
                <div className="text-[10px] font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>{p.label}</div>
                <div className="font-bold text-sm" style={{ color: 'var(--primary)' }}>{p.value}</div>
                <div className="text-[10px]" style={{ color: 'var(--muted-foreground)' }}>{p.sub}</div>
              </div>
            ))}
          </div>

          {/* Cultivos */}
          <h3 className="font-bold text-sm mb-3" style={{ color: 'var(--accent)' }}>Cultivos de la Familia</h3>
          <div className="flex gap-3 flex-wrap mb-6">
            {info.cultivos.map(c => (
              <button
                key={c}
                onClick={() => ctx.navigateTo('cultivo-detalle', { cultivo: c, familia: nombre })}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border)] text-sm font-bold shadow-xs hover:border-[var(--primary)] hover:bg-[var(--secondary)] transition-all cursor-pointer group"
                style={{ background: 'var(--secondary)', color: 'var(--foreground)' }}
              >
                <span>{c}</span>
                <span className="text-xs group-hover:scale-110 transition-transform" style={{ color: 'var(--primary)' }}>👁 Ver info</span>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setShowValidacionModal(true)}
              className="px-5 py-2 rounded-lg font-bold text-sm border-2 hover:bg-red-50 transition-colors"
              style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}
            >
              Dar de baja
            </button>
            <button
              onClick={() => ctx.navigateTo('familia-crear', { familia: nombre, editar: true })}
              className="px-5 py-2 rounded-lg font-bold text-sm text-white hover:opacity-90"
              style={{ background: 'var(--primary)' }}
            >
              Modificar
            </button>
          </div>
        </div>
      </main>

      {/* Validación modal */}
      {showValidacionModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full border-2 border-orange-300">
            <h3 className="font-bold text-base mb-2" style={{ color: 'var(--warning)' }}>⚠️ Alerta!</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--foreground)' }}>
              En este momento no se puede modificar ni dar de Baja porque el cultivo <strong>PAPA</strong> está siendo utilizado en el módulo #1.
            </p>
            <button onClick={() => { setShowValidacionModal(false) }}
              className="w-full py-2 rounded-lg font-bold text-sm text-white"
              style={{ background: 'var(--primary)' }}>
              OK
            </button>
          </div>
        </div>
      )}

      {/* Baja modal */}
      {showBajaModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h3 className="font-bold text-base mb-2" style={{ color: 'var(--foreground)' }}>
              Baja de Familia ({nombre})
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
              Al dar de baja la familia <strong>{nombre}</strong>, esta página y todos sus cultivos estarán ocultos.
              Ya no habrá notificaciones para fechas de siembra. ¿Está seguro de esta acción?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowBajaModal(false)}
                className="flex-1 py-2 rounded-lg font-bold text-sm border border-[var(--border)] hover:bg-[var(--secondary)]">
                Cancelar
              </button>
              <button onClick={() => { setShowBajaModal(false); ctx.navigateTo('familias') }}
                className="flex-1 py-2 rounded-lg font-bold text-sm text-white bg-red-500 hover:opacity-90">
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
