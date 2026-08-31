import { useState } from 'react'
import Header from '../components/Header'
import type { NavContext } from '../types'
import { useData } from '../context/DataContext'

export default function FamiliaDetalle({ ctx }: { ctx: NavContext }) {
  const { familias, darDeBajaFamilia, siembras, cosechas } = useData()
  const nombre = (ctx.params.familia as string) || 'Tubérculos'
  const info = familias.find((f) => f.nombre === nombre) ?? familias[0]
  const [showBajaModal, setShowBajaModal] = useState(false)

  const cultivosActivos = Array.from(
    new Set([
      ...siembras
        .filter((s) => s.familia === nombre && s.estado === 'PENDIENTE' && s.id.startsWith('s_'))
        .map((s) => s.cultivo),
      ...cosechas
        .filter((c) => c.familia === nombre && !c.completada && c.id.startsWith('c_'))
        .map((c) => c.cultivo),
    ])
  )
  const puedeDarDeBaja = cultivosActivos.length === 0

  const handleDarDeBaja = () => {
    if (!puedeDarDeBaja) return
    darDeBajaFamilia(nombre)
    setShowBajaModal(false)
    ctx.navigateTo('familias')
  }

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
              onClick={() => setShowBajaModal(true)}
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

      {/* Baja modal */}
      {showBajaModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h3 className="font-bold text-base mb-2" style={{ color: 'var(--foreground)' }}>
              Baja de Familia ({nombre})
            </h3>
            {puedeDarDeBaja ? (
              <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
                Al dar de baja la familia <strong>{nombre}</strong>, esta página y todos sus cultivos estarán ocultos.
                Ya no habrá notificaciones para fechas de siembra. ¿Está seguro de esta acción?
              </p>
            ) : (
              <div className="mb-4">
                <p className="text-sm font-semibold mb-2" style={{ color: 'var(--danger)' }}>
                  No se puede dar de baja esta familia porque hay cultivos activos en módulos.
                </p>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  Cultivos activos: {cultivosActivos.join(', ')}
                </p>
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => setShowBajaModal(false)}
                className="flex-1 py-2 rounded-lg font-bold text-sm border border-[var(--border)] hover:bg-[var(--secondary)]">
                Cancelar
              </button>
              <button
                onClick={handleDarDeBaja}
                disabled={!puedeDarDeBaja}
                className="flex-1 py-2 rounded-lg font-bold text-sm text-white bg-red-500 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
