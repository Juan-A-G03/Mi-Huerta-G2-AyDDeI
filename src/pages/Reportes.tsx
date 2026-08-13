import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts'
import Header from '../components/Header'
import type { NavContext } from '../types'

const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']

// Simulated sensor data for Papas 2023 and 2024
const data = meses.map((mes, i) => ({
  mes,
  humedad2023: 60 + Math.sin(i * 0.8) * 15 + (i === 4 ? -25 : 0),
  humedad2024: 65 + Math.sin(i * 0.6 + 1) * 12,
  temp2023: 18 + Math.cos(i * 0.7) * 8 + (i === 6 ? -5 : 0),
  temp2024: 20 + Math.cos(i * 0.5 + 0.5) * 7,
  luz2023: 7 + Math.sin(i * 0.9 + 0.3) * 2,
  luz2024: 7.5 + Math.sin(i * 0.8 + 1.2) * 2.5,
}))

const modulos = ['#5', '#3', '#7', '#1', '#2']

type Sensor = 'humedad' | 'temp' | 'luz'

export default function Reportes({ ctx }: { ctx: NavContext }) {
  const [modulo, setModulo] = useState('#5')
  const [desde, setDesde] = useState('2023-01-01')
  const [hasta, setHasta] = useState('2024-12-31')
  const [activo, setActivo] = useState(false)
  const [activeSensors, setActiveSensors] = useState<Set<Sensor>>(new Set(['humedad', 'temp', 'luz']))

  const toggleSensor = (s: Sensor) => {
    setActiveSensors(prev => {
      const next = new Set(prev)
      next.has(s) ? next.delete(s) : next.add(s)
      return next
    })
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} showBack backLabel="Menú principal" backPage="menu" />

      <main className="max-w-5xl mx-auto px-4 pt-12 pb-16">
        <h1 className="text-3xl font-black text-center mb-8" style={{ color: 'var(--foreground)' }}>
          REPORTES
        </h1>

        {!activo ? (
          /* Filter form */
          <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-8 max-w-lg mx-auto">
            <div className="flex flex-wrap gap-6 items-end mb-8">
              <div>
                <label className="block text-sm font-bold mb-1" style={{ color: 'var(--muted-foreground)' }}>MÓDULO:</label>
                <select
                  value={modulo}
                  onChange={e => setModulo(e.target.value)}
                  className="border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)] bg-[var(--secondary)]"
                >
                  {modulos.map(m => <option key={m} value={m}>#{m.replace('#', '')}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1" style={{ color: 'var(--muted-foreground)' }}>PERÍODO:</label>
                <div className="flex items-center gap-2">
                  <input type="date" value={desde} onChange={e => setDesde(e.target.value)}
                    className="border border-[var(--border)] rounded-lg px-2 py-2 text-sm outline-none focus:border-[var(--primary)]" />
                  <span style={{ color: 'var(--muted-foreground)' }}>→</span>
                  <input type="date" value={hasta} onChange={e => setHasta(e.target.value)}
                    className="border border-[var(--border)] rounded-lg px-2 py-2 text-sm outline-none focus:border-[var(--primary)]" />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => setActivo(true)}
                className="px-8 py-3 rounded-xl text-white font-bold hover:opacity-90"
                style={{ background: 'var(--primary)' }}
              >
                CONSULTAR REPORTE
              </button>
            </div>
          </div>
        ) : (
          /* Chart */
          <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-4 sm:p-6">
            <button onClick={() => setActivo(false)}
              className="flex items-center gap-1 text-sm font-semibold mb-4"
              style={{ color: 'var(--accent)' }}>
              ‹ REPORTES
            </button>

            <div className="text-center mb-2">
              <p className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>
                Papas &nbsp;·&nbsp; Desde el 1° de Enero de 2023 &nbsp;·&nbsp; Hasta el 31 de Diciembre de 2023
              </p>
              <p className="text-sm font-bold" style={{ color: 'var(--muted-foreground)' }}>
                Desde el 1° de Enero de 2024 &nbsp;·&nbsp; Hasta el 31 de Diciembre de 2024
              </p>
            </div>

            {/* Sensor toggles */}
            <div className="flex gap-3 justify-end mb-4 flex-wrap">
              {([
                { key: 'humedad', label: 'Humedad', color: '#3a8f5c' },
                { key: 'temp', label: 'Temperatura', color: '#e05a2b' },
                { key: 'luz', label: 'Luz', color: '#d4a800' },
              ] as { key: Sensor; label: string; color: string }[]).map(({ key, label, color }) => (
                <button
                  key={key}
                  onClick={() => toggleSensor(key)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-lg border transition-opacity"
                  style={{
                    borderColor: color,
                    color,
                    opacity: activeSensors.has(key) ? 1 : 0.35,
                  }}
                >
                  <span className="w-3 h-0.5 inline-block rounded" style={{ background: color }} />
                  {label}
                </button>
              ))}
            </div>

            <div className="flex gap-2 text-xs mb-2">
              <span className="font-bold" style={{ color: 'var(--muted-foreground)' }}>Valor</span>
            </div>

            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: '1px solid var(--border)', fontSize: 12 }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />

                {/* Reference lines for events */}
                <ReferenceLine x="May" stroke="#3a8f5c" strokeDasharray="4 4"
                  label={{ value: 'Desact. Riego H>80%', fontSize: 9, fill: '#3a8f5c' }} />
                <ReferenceLine x="Jul" stroke="#e05a2b" strokeDasharray="4 4"
                  label={{ value: 'Medianera T<10°C', fontSize: 9, fill: '#e05a2b' }} />

                {activeSensors.has('humedad') && <>
                  <Line type="monotone" dataKey="humedad2023" name="Humedad 2023" stroke="#3a8f5c" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="humedad2024" name="Humedad 2024" stroke="#3a8f5c" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 4 }} />
                </>}
                {activeSensors.has('temp') && <>
                  <Line type="monotone" dataKey="temp2023" name="Temp 2023" stroke="#e05a2b" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="temp2024" name="Temp 2024" stroke="#e05a2b" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 4 }} />
                </>}
                {activeSensors.has('luz') && <>
                  <Line type="monotone" dataKey="luz2023" name="Luz 2023" stroke="#d4a800" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="luz2024" name="Luz 2024" stroke="#d4a800" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 4 }} />
                </>}
              </LineChart>
            </ResponsiveContainer>

            <div className="text-right mt-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>Tiempo</div>
          </div>
        )}
      </main>
    </div>
  )
}
