import { useState } from 'react'
import Header from '../components/Header'
import type { NavContext } from '../types'

export default function CambiarPassword({ ctx }: { ctx: NavContext }) {
  const [form, setForm] = useState({ anterior: '', nueva: '', repetir: '' })
  const [showConfirm, setShowConfirm] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} showBack backLabel="Perfil" backPage="perfil" />

      <main className="max-w-md mx-auto px-4 pt-12 pb-16">
        <h2 className="text-xl font-black mb-6" style={{ color: 'var(--foreground)' }}>Modificar Contraseña</h2>

        <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-6">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>
                Contraseña Anterior:
              </label>
              <input type="password" placeholder="Password" value={form.anterior} onChange={set('anterior')}
                className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
              <button className="text-xs mt-1 hover:underline" style={{ color: 'var(--accent)' }}>
                Olvidé mi contraseña
              </button>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>
                Nueva Contraseña:
              </label>
              <input type="password" placeholder="Password" value={form.nueva} onChange={set('nueva')}
                className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>
                Repetir Contraseña:
              </label>
              <input type="password" placeholder="Password" value={form.repetir} onChange={set('repetir')}
                className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
            </div>
          </div>

          <button
            onClick={() => setShowConfirm(true)}
            className="w-full mt-6 py-2.5 rounded-xl font-bold text-sm text-white hover:opacity-90"
            style={{ background: 'var(--primary)' }}
          >
            GUARDAR CAMBIOS
          </button>
        </div>
      </main>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full border border-orange-300">
            <h3 className="font-bold text-base mb-2">⚠️ Alerta!</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--foreground)' }}>
              ¿Estás seguro de que deseas cambiar la contraseña?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)}
                className="flex-1 py-2 rounded-lg font-bold text-sm border border-[var(--border)] hover:bg-[var(--secondary)]">
                Cancelar
              </button>
              <button onClick={() => { setShowConfirm(false); ctx.navigateTo('perfil') }}
                className="flex-1 py-2 rounded-lg font-bold text-sm text-white"
                style={{ background: 'var(--primary)' }}>
                SI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
