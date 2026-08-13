import { useState } from 'react'
import type { NavContext } from '../types'

export default function Register({ ctx }: { ctx: NavContext }) {
  const [form, setForm] = useState({ nombre: '', apellido: '', mail: '', telefono: '', localidad: '', password: '', repPassword: '' })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    ctx.navigateTo('menu')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10" style={{ background: 'var(--background)' }}>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-3xl">🌱</span>
        <span className="text-2xl font-black tracking-tight" style={{ color: 'var(--primary)' }}>MI HUERTA</span>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-[var(--border)] p-8 w-full max-w-lg">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>Ingrese los siguientes datos:</p>
            <h2 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>Registro</h2>
          </div>
          <button
            onClick={() => ctx.navigateTo('login')}
            className="text-sm font-bold py-1.5 px-4 rounded-lg text-white"
            style={{ background: 'var(--primary)' }}
          >
            INICIAR SESIÓN
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {[
            { label: 'Nombre:', key: 'nombre' as const, placeholder: 'Juan' },
            { label: 'Apellido:', key: 'apellido' as const, placeholder: 'Fernandez' },
            { label: 'Mail:', key: 'mail' as const, placeholder: 'fernandez@mail.com', type: 'email' },
            { label: 'Teléfono:', key: 'telefono' as const, placeholder: '1234567890' },
            { label: 'Localidad:', key: 'localidad' as const, placeholder: 'CABA' },
          ].map(({ label, key, placeholder, type }) => (
            <div key={key} className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>{label}</label>
              <input
                type={type || 'text'}
                placeholder={placeholder}
                value={form[key]}
                onChange={set(key)}
                required
                className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
              />
            </div>
          ))}

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>Contraseña:</label>
            <input type="password" placeholder="password" value={form.password} onChange={set('password')} required
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>Repetir Contraseña:</label>
            <input type="password" placeholder="password" value={form.repPassword} onChange={set('repPassword')} required
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
          </div>

          <div className="col-span-2 flex justify-center mt-2">
            <button type="submit" className="py-2.5 px-8 rounded-lg font-bold text-white text-sm hover:opacity-90 transition-opacity"
              style={{ background: 'var(--primary)' }}>
              REGISTRARSE
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
