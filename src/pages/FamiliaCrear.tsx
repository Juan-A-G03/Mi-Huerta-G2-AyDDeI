import { useState } from 'react'
import Header from '../components/Header'
import type { NavContext } from '../types'
import { useData, type Familia } from '../context/DataContext'

export default function FamiliaCrear({ ctx }: { ctx: NavContext }) {
  const { familias, cultivosData, agregarFamilia, modificarFamilia, asignarCultivoAFamilia } = useData()
  const esEdicion = ctx.params.editar === true
  const nombre = (ctx.params.familia as string) || ''
  const familiaActual = esEdicion ? familias.find((f) => f.nombre === nombre) : undefined

  const [form, setForm] = useState({
    nombre: esEdicion ? nombre : '',
    descripcion: familiaActual?.descripcion ?? '',
    humedadMin: esEdicion ? '60' : '',
    humedadMax: esEdicion ? '80' : '',
    luzMin: esEdicion ? '6' : '',
    luzMax: esEdicion ? '8' : '',
    tempMin: esEdicion ? '15' : '',
    tempMax: esEdicion ? '22' : '',
    fechaInicio: esEdicion ? '2026-04-01' : '',
    fechaFin: esEdicion ? '2026-05-31' : '',
  })
  const [cultivos, setCultivos] = useState<string[]>(familiaActual?.cultivos ?? [])
  const [cultivoAagregar, setCultivoAagregar] = useState('')

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const cultivosSinAsignar = Object.values(cultivosData)
    .filter((c) => !c.familia && !cultivos.includes(c.nombre))
    .map((c) => c.nombre)

  const agregarCultivo = () => {
    if (cultivoAagregar) {
      setCultivos((prev) => [...prev, cultivoAagregar])
      setCultivoAagregar('')
    }
  }

  const quitarCultivo = (c: string) => {
    setCultivos((prev) => prev.filter((x) => x !== c))
  }

  const handleGuardar = (e: React.FormEvent) => {
    e.preventDefault()
    const data: Familia = {
      nombre: form.nombre,
      ejemplos: '',
      activa: true,
      descripcion: form.descripcion,
      humedad: `${form.humedadMin}% - ${form.humedadMax}%`,
      luz: `${form.luzMin} - ${form.luzMax} hs`,
      temp: `${form.tempMin}°C - ${form.tempMax}°C`,
      ciclo: `${form.fechaInicio} - ${form.fechaFin}`,
      cultivos,
    }
    if (esEdicion) {
      modificarFamilia(nombre, data)
    } else {
      agregarFamilia(data)
    }
    cultivos.forEach((c) => asignarCultivoAFamilia(c, data.nombre))
    ctx.navigateTo('familias')
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} showBack backLabel="Lista de familias" backPage="familias" />

      <main className="max-w-2xl mx-auto px-4 pt-12 pb-16">
        <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-6">
          <h2 className="text-xl font-black mb-6" style={{ color: 'var(--foreground)' }}>
            {esEdicion ? `Modificar Familia: ${nombre}` : 'Nueva Familia'}
          </h2>

          <form onSubmit={handleGuardar} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>Nombre</label>
              <input type="text" value={form.nombre} onChange={set('nombre')} required
                className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>Descripción</label>
              <textarea value={form.descripcion} onChange={set('descripcion')} rows={3}
                className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)] resize-none" />
            </div>

            <div>
              <h3 className="font-bold text-sm mb-3" style={{ color: 'var(--foreground)' }}>Parámetros</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: '💧 Humedad del Sustrato', minKey: 'humedadMin', maxKey: 'humedadMax', unit: '%' },
                  { label: '☀️ Luz Solar', minKey: 'luzMin', maxKey: 'luzMax', unit: 'hs' },
                  { label: '🌡 Temperatura', minKey: 'tempMin', maxKey: 'tempMax', unit: '°C' },
                ].map(({ label, minKey, maxKey, unit }) => (
                  <div key={label} className="col-span-1 sm:col-span-1 border border-[var(--border)] rounded-xl p-2"
                    style={{ background: 'var(--secondary)' }}>
                    <p className="text-[10px] font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>{label}</p>
                    <div className="flex gap-1 items-center">
                      <input type="number" placeholder="Min" value={form[minKey as keyof typeof form]}
                        onChange={set(minKey as keyof typeof form)}
                        className="w-full border border-[var(--border)] rounded px-1 py-1 text-xs outline-none focus:border-[var(--primary)]" />
                      <span className="text-xs">{unit}</span>
                    </div>
                    <div className="flex gap-1 items-center mt-1">
                      <input type="number" placeholder="Max" value={form[maxKey as keyof typeof form]}
                        onChange={set(maxKey as keyof typeof form)}
                        className="w-full border border-[var(--border)] rounded px-1 py-1 text-xs outline-none focus:border-[var(--primary)]" />
                      <span className="text-xs">{unit}</span>
                    </div>
                  </div>
                ))}
                <div className="col-span-1 border border-[var(--border)] rounded-xl p-2" style={{ background: 'var(--secondary)' }}>
                  <p className="text-[10px] font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>📅 Ciclo de Cosechas</p>
                  <input type="date" value={form.fechaInicio} onChange={set('fechaInicio')}
                    className="w-full border border-[var(--border)] rounded px-1 py-1 text-xs outline-none focus:border-[var(--primary)] mb-1" />
                  <input type="date" value={form.fechaFin} onChange={set('fechaFin')}
                    className="w-full border border-[var(--border)] rounded px-1 py-1 text-xs outline-none focus:border-[var(--primary)]" />
                </div>
              </div>
            </div>

            {/* Cultivos */}
            <div>
              <h3 className="font-bold text-sm mb-2" style={{ color: 'var(--foreground)' }}>Cultivos de la Familia</h3>
              <div className="flex gap-2 flex-wrap mb-2">
                {cultivos.map((c) => (
                  <span key={c} className="inline-flex items-center gap-1 px-3 py-1 rounded-xl border border-[var(--border)] text-sm font-semibold"
                    style={{ background: 'var(--secondary)', color: 'var(--foreground)' }}>
                    {c}
                    <button type="button" onClick={() => quitarCultivo(c)}
                      className="text-xs font-bold cursor-pointer" style={{ color: 'var(--danger)' }}>✕</button>
                  </span>
                ))}
                {cultivos.length === 0 && (
                  <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    Sin cultivos asignados
                  </span>
                )}
              </div>

              {cultivosSinAsignar.length > 0 && (
                <div className="flex gap-2 items-center">
                  <select value={cultivoAagregar} onChange={(e) => setCultivoAagregar(e.target.value)}
                    className="flex-1 border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)] bg-white">
                    <option value="">Seleccionar cultivo sin asignar...</option>
                    {cultivosSinAsignar.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <button type="button" onClick={agregarCultivo} disabled={!cultivoAagregar}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg border border-[var(--border)] text-sm font-semibold hover:bg-[var(--secondary)] disabled:opacity-50"
                    style={{ color: 'var(--accent)' }}>
                    + Añadir cultivo
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-3 justify-end mt-2">
              <button type="button" onClick={() => ctx.navigateTo('familias')}
                className="px-5 py-2 rounded-lg font-bold text-sm border border-[var(--border)] hover:bg-[var(--secondary)]">
                Cancelar
              </button>
              <button type="submit"
                className="px-5 py-2 rounded-lg font-bold text-sm text-white hover:opacity-90"
                style={{ background: 'var(--primary)' }}>
                Guardar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
