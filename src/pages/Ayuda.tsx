import { useState } from 'react'
import Header from '../components/Header'
import type { NavContext } from '../types'

export default function Tutoriales({ ctx }: { ctx: NavContext }) {
  const videos = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    titulo: i === 0 ? 'Como sembrar tomates' : i === 1 ? 'Como cuidar tomates' : `Tutorial ${i + 1}`,
    desc: i === 0
      ? 'Para sembrar tomate, prepare un semillero con tierra húmeda y fértil, coloque las semillas a un centímetro de profundidad y ubíquelas en un lugar cálido con mucha luz...'
      : i === 1
      ? 'Para cultivar tomates con éxito, los cuidados principales son: luz solar abundante, riego frecuente sin mojar las hojas y un suelo rico en nutrientes...'
      : 'Aprende todo sobre el cultivo de tu huerta con este tutorial completo y detallado...',
    duracion: '5:30',
    categoria: i === 0 ? 'Siembra' : i === 1 ? 'Cuidado' : 'General',
  }))

  const [selected, setSelected] = useState<typeof videos[0] | null>(null)

  if (selected) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--background)' }}>
        <Header ctx={ctx} />
        <main className="max-w-3xl mx-auto px-4 pt-6 pb-16">
          <button onClick={() => setSelected(null)}
            className="flex items-center gap-1 text-sm font-semibold mb-4"
            style={{ color: 'var(--accent)' }}>
            ‹ Tutoriales
          </button>
          <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-6">
            <div className="w-full h-48 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'var(--secondary)' }}>
              <span className="text-6xl">▶️</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full mb-2 inline-block"
              style={{ background: 'var(--secondary)', color: 'var(--primary)' }}>
              {selected.categoria}
            </span>
            <h2 className="text-xl font-bold mt-1 mb-2" style={{ color: 'var(--foreground)' }}>{selected.titulo}</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{selected.desc}</p>
            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 text-white"
                style={{ background: 'var(--accent)' }}>Ver más</button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} showBack backLabel="Menú principal" backPage="menu" />

      <main className="max-w-4xl mx-auto px-4 pt-12 pb-16">
        <h2 className="text-xl font-black mb-2" style={{ color: 'var(--foreground)' }}>Tutoriales</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>
          Explora nuestra biblioteca de video tutoriales para tu huerta
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {videos.map(v => (
            <button
              key={v.id}
              onClick={() => setSelected(v)}
              className="bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden text-left hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="w-full h-28 flex items-center justify-center"
                style={{ background: 'var(--secondary)' }}>
                <span className="text-4xl">▶️</span>
              </div>
              <div className="p-2">
                <p className="text-xs font-bold truncate" style={{ color: 'var(--foreground)' }}>
                  {v.titulo}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{v.duracion}</p>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
