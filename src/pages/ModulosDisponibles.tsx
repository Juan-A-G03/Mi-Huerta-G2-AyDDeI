import { useState } from 'react'
import Header from '../components/Header'
import type { NavContext } from '../types'

const modulosDisponibles = ['Módulo #1', 'Módulo #5', 'Módulo #6']
const cultivosDisponibles = ['Batata', 'Papa', 'Yuca', 'Zanahoria', 'Rábano']

interface Asignacion {
  id: number
  modulo: string
  cultivo: string
}

export default function ModulosDisponibles({ ctx }: { ctx: NavContext }) {
  const [selectedModulo, setSelectedModulo] = useState<string | null>(null)
  const [selectedCultivo, setSelectedCultivo] = useState<string | null>(null)
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([
    { id: 1, modulo: 'Módulo #5', cultivo: 'Papa' },
    { id: 2, modulo: 'Módulo #6', cultivo: 'Yuca' },
  ])
  const [showConfirm, setShowConfirm] = useState(false)

  const agregarAsignacion = () => {
    if (selectedModulo && selectedCultivo) {
      setAsignaciones(prev => [...prev, { id: Date.now(), modulo: selectedModulo, cultivo: selectedCultivo }])
      setSelectedModulo(null)
      setSelectedCultivo(null)
    }
  }

  const eliminar = (id: number) => setAsignaciones(prev => prev.filter(a => a.id !== id))

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} showBack backLabel="Cultivos aceptados" backPage="cultivos-aceptados" />

      <main className="max-w-3xl mx-auto px-4 pt-12 pb-16">
        <h2 className="text-xl font-black mb-6" style={{ color: 'var(--foreground)' }}>
          Lista de Módulos disponibles
        </h2>

        {/* Módulos selector */}
        <div className="mb-4">
          <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--muted-foreground)' }}>Módulos</h3>
          <div className="flex gap-3 flex-wrap">
            {modulosDisponibles.map(m => (
              <button
                key={m}
                onClick={() => setSelectedModulo(m === selectedModulo ? null : m)}
                className="px-4 py-2 rounded-xl border-2 font-bold text-sm transition-all"
                style={{
                  borderColor: selectedModulo === m ? 'var(--primary)' : 'var(--border)',
                  background: selectedModulo === m ? 'var(--secondary)' : 'white',
                  color: selectedModulo === m ? 'var(--primary)' : 'var(--foreground)',
                }}
              >
                {m}
              </button>
            ))}
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
            <button onClick={agregarAsignacion}
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
          {asignaciones.map(a => (
            <div key={a.id} className="grid grid-cols-4 items-center px-4 py-2.5 border-t border-[var(--border)] text-sm">
              <button className="text-base">✏️</button>
              <button onClick={() => eliminar(a.id)} className="text-base">❌</button>
              <span style={{ color: 'var(--foreground)' }}>{a.modulo}</span>
              <span style={{ color: 'var(--foreground)' }}>{a.cultivo}</span>
            </div>
          ))}
          {asignaciones.length === 0 && (
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
            className="px-5 py-2 rounded-lg font-bold text-sm border-2 hover:opacity-90"
            style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
            Guardar
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
              Se guardarán {asignaciones.length} asignaciones de módulos y cultivos.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)}
                className="flex-1 py-2 rounded-lg font-bold text-sm border border-[var(--border)] hover:bg-[var(--secondary)]">
                Cancelar
              </button>
              <button onClick={() => { setShowConfirm(false); ctx.navigateTo('siembras-finalizar') }}
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
