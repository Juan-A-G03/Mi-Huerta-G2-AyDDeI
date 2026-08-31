import { useState } from 'react'
import Header from '../components/Header'
import type { NavContext } from '../types'
import { useData } from '../context/DataContext'

export default function ModulosDisponibles({ ctx }: { ctx: NavContext }) {
  const { modulos, asignaciones, familias, agregarAsignacion, eliminarAsignacion, confirmarAsignaciones } = useData()
  const familia = (ctx.params.familia as string) || 'Tubérculos'
  const [selectedModulo, setSelectedModulo] = useState<string | null>(null)
  const [selectedCultivo, setSelectedCultivo] = useState<string | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)

  const infoFamilia = familias.find((f) => f.nombre === familia)
  const cultivosDisponibles = infoFamilia?.cultivos ?? ['Batata', 'Papa', 'Yuca', 'Zanahoria', 'Rábano']
  const asignacionesFamilia = asignaciones.filter((a) => a.familia === familia)
  const modulosDisponibles = modulos.filter(
    (m) => m.disponible && !asignacionesFamilia.some((a) => a.moduloId === m.id)
  )

  const agregarAsignacionHandler = () => {
    if (selectedModulo && selectedCultivo) {
      const m = modulos.find((x) => x.nombre === selectedModulo)
      agregarAsignacion(m?.id ?? selectedModulo, selectedModulo, selectedCultivo, familia)
      setSelectedModulo(null)
      setSelectedCultivo(null)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} showBack backLabel="Cultivos aceptados" backPage="cultivos-aceptados" />

      <main className="max-w-3xl mx-auto px-4 pt-12 pb-16">
        <h2 className="text-xl font-black mb-2" style={{ color: 'var(--foreground)' }}>
          Lista de Módulos disponibles
        </h2>
        <p className="text-sm font-semibold mb-6" style={{ color: 'var(--accent)' }}>
          Familia: {familia}
        </p>

        {/* Módulos selector */}
        <div className="mb-4">
          <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--muted-foreground)' }}>Módulos</h3>
          <div className="flex gap-3 flex-wrap">
            {modulosDisponibles.map(m => (
              <button
                key={m.id}
                onClick={() => setSelectedModulo(m.nombre === selectedModulo ? null : m.nombre)}
                className="px-4 py-2 rounded-xl border-2 font-bold text-sm transition-all"
                style={{
                  borderColor: selectedModulo === m.nombre ? 'var(--primary)' : 'var(--border)',
                  background: selectedModulo === m.nombre ? 'var(--secondary)' : 'white',
                  color: selectedModulo === m.nombre ? 'var(--primary)' : 'var(--foreground)',
                }}
              >
                {m.nombre}
              </button>
            ))}
            {modulosDisponibles.length === 0 && (
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                No hay módulos libres disponibles
              </p>
            )}
          </div>
        </div>

        {/* Cultivos selector */}
        <div className="mb-6">
          <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--muted-foreground)' }}>Cultivos</h3>
          <div className="flex gap-3 flex-wrap">
            {cultivosDisponibles.map(c => (
              <button
                key={c}
                className="border border-[var(--border)] rounded-xl p-3 text-center flex flex-col items-center gap-1 hover:bg-[var(--secondary)] transition-colors"
                style={{
                  minWidth: 80,
                  borderColor: selectedCultivo === c ? 'var(--primary)' : 'var(--border)',
                  background: selectedCultivo === c ? 'var(--secondary)' : 'white',
                }}
                onClick={() => setSelectedCultivo(c === selectedCultivo ? null : c)}
              >
                <span className="text-xl">🌿</span>
                <span className="text-xs font-semibold" style={{ color: 'var(--foreground)' }}>Cultivo {c}</span>
                <span className="text-[10px]" style={{ color: 'var(--accent)' }}>Ver información</span>
              </button>
            ))}
          </div>
          {selectedModulo && selectedCultivo && (
            <button onClick={agregarAsignacionHandler}
              className="mt-3 px-4 py-1.5 rounded-lg text-white text-sm font-bold hover:opacity-90"
              style={{ background: 'var(--accent)' }}>
              + Agregar asignación
            </button>
          )}
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm mb-6">
          <h3 className="text-sm font-bold px-4 py-3 border-b border-[var(--border)]"
            style={{ color: 'var(--foreground)' }}>Listado de Cultivos Seleccionados</h3>
          <div className="grid grid-cols-4 px-4 py-2 text-xs font-bold bg-[var(--secondary)]"
            style={{ color: 'var(--muted-foreground)' }}>
            <span>editar</span><span>eliminar</span><span>MÓDULO</span><span>CULTIVO</span>
          </div>
          {asignacionesFamilia.map(a => (
            <div key={a.id} className="grid grid-cols-4 items-center px-4 py-2.5 border-t border-[var(--border)] text-sm">
              <button className="text-base">✏️</button>
              <button onClick={() => eliminarAsignacion(a.id)} className="text-base">❌</button>
              <span style={{ color: 'var(--foreground)' }}>{a.modulo}</span>
              <span style={{ color: 'var(--foreground)' }}>{a.cultivo}</span>
            </div>
          ))}
          {asignacionesFamilia.length === 0 && (
            <p className="text-center py-4 text-xs" style={{ color: 'var(--muted-foreground)' }}>
              No hay asignaciones aún
            </p>
          )}
        </div>

        <div className="flex gap-3 justify-end">
          <button onClick={() => ctx.navigateTo('cultivos-aceptados')}
            className="px-5 py-2 rounded-lg font-bold text-sm border border-[var(--border)] hover:bg-[var(--secondary)]">
            Cancelar
          </button>
          <button onClick={() => setShowConfirm(true)}
            className="px-5 py-2 rounded-lg font-bold text-sm text-white hover:opacity-90"
            style={{ background: 'var(--primary)' }}>
            Confirmar
          </button>
        </div>
      </main>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h3 className="font-bold text-base mb-2" style={{ color: 'var(--foreground)' }}>✅ Confirmar asignaciones</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
              Se guardarán {asignacionesFamilia.length} asignaciones de módulos y cultivos para la familia {familia}.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)}
                className="flex-1 py-2 rounded-lg font-bold text-sm border border-[var(--border)] hover:bg-[var(--secondary)]">
                Cancelar
              </button>
              <button onClick={() => { setShowConfirm(false); confirmarAsignaciones(familia); ctx.navigateTo('cultivos-aceptados') }}
                className="flex-1 py-2 rounded-lg font-bold text-sm text-white"
                style={{ background: 'var(--primary)' }}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
