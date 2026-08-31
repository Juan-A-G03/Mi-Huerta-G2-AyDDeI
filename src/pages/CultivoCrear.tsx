import { useState } from 'react'
import Header from '../components/Header'
import type { NavContext } from '../types'
import { useData, type CultivoInfo } from '../context/DataContext'

export default function CultivoCrear({ ctx }: { ctx: NavContext }) {
  const { cultivosData, familias, crearCultivo, modificarCultivo } = useData()
  const esEdicion = ctx.params.editar === true
  const nombreAnterior = (ctx.params.cultivo as string) || ''
  const cultivoActual = esEdicion ? cultivosData[nombreAnterior] : undefined

  const familiasActivas = familias.filter((f) => f.activa)

  const [form, setForm] = useState({
    nombre: cultivoActual?.nombre ?? '',
    cientifico: cultivoActual?.cientifico ?? '',
    familia: cultivoActual?.familia ?? '',
    descripcion: cultivoActual?.descripcion ?? '',
    humedad: cultivoActual?.humedad ?? '',
    luz: cultivoActual?.luz ?? '',
    temp: cultivoActual?.temp ?? '',
    ciclo: cultivoActual?.ciclo ?? '',
    ph: cultivoActual?.ph ?? '',
    nutrientes: cultivoActual?.nutrientes.join(', ') ?? '',
    cicloMinDias: cultivoActual?.cicloMinDias ?? 60,
    cicloMaxDias: cultivoActual?.cicloMaxDias ?? 90,
  })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleGuardar = (e: React.FormEvent) => {
    e.preventDefault()
    const info: CultivoInfo = {
      nombre: form.nombre.trim(),
      cientifico: form.cientifico.trim(),
      familia: form.familia,
      descripcion: form.descripcion.trim(),
      humedad: form.humedad.trim(),
      luz: form.luz.trim(),
      temp: form.temp.trim(),
      ciclo: form.ciclo.trim(),
      ph: form.ph.trim(),
      nutrientes: form.nutrientes.split(',').map((n) => n.trim()).filter(Boolean),
      cicloMinDias: Number(form.cicloMinDias) || 60,
      cicloMaxDias: Number(form.cicloMaxDias) || 90,
    }
    if (esEdicion) {
      modificarCultivo(nombreAnterior, info)
    } else {
      crearCultivo(info)
    }
    ctx.navigateTo('cultivos')
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} showBack backLabel="Cultivos" backPage="cultivos" />

      <main className="max-w-2xl mx-auto px-4 pt-12 pb-16">
        <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-6">
          <h2 className="text-xl font-black mb-6" style={{ color: 'var(--foreground)' }}>
            {esEdicion ? `Modificar Cultivo: ${nombreAnterior}` : 'Nuevo Cultivo'}
          </h2>

          <form onSubmit={handleGuardar} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>Nombre</label>
              <input type="text" value={form.nombre} onChange={set('nombre')} required
                className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>Nombre científico</label>
              <input type="text" value={form.cientifico} onChange={set('cientifico')}
                className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>Familia</label>
              <select value={form.familia} onChange={set('familia')}
                className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)] bg-white">
                <option value="">Sin asignar</option>
                {familiasActivas.map((f) => (
                  <option key={f.nombre} value={f.nombre}>{f.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>Descripción</label>
              <textarea value={form.descripcion} onChange={set('descripcion')} rows={3}
                className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)] resize-none" />
            </div>

            <h3 className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>Parámetros</h3>
            <div className="grid grid-cols-2 gap-3">
              {([
                { key: 'humedad', label: 'Humedad' },
                { key: 'luz', label: 'Luz solar' },
                { key: 'temp', label: 'Temperatura' },
                { key: 'ciclo', label: 'Ciclo' },
                { key: 'ph', label: 'pH' },
              ] as const).map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>{label}</label>
                  <input type="text" value={form[key]} onChange={set(key)} placeholder={label}
                    className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>Ciclo mín (días)</label>
                <input type="number" value={form.cicloMinDias} onChange={set('cicloMinDias')}
                  className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>Ciclo máx (días)</label>
                <input type="number" value={form.cicloMaxDias} onChange={set('cicloMaxDias')}
                  className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>Nutrientes (separados por coma)</label>
              <input type="text" value={form.nutrientes} onChange={set('nutrientes')} placeholder="Nitrógeno, Fósforo, Potasio"
                className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
            </div>

            <div className="flex gap-3 justify-end mt-2">
              <button type="button" onClick={() => ctx.navigateTo('cultivos')}
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
