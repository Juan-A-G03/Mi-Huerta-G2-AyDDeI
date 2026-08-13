import { useState } from 'react'
import type { NavContext } from '../types'

export default function Login({ ctx }: { ctx: NavContext }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    ctx.navigateTo('menu')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'var(--background)' }}>
      <div className="flex items-center gap-2 mb-8">
        <span className="text-4xl">🌱</span>
        <span className="text-3xl font-black tracking-tight" style={{ color: 'var(--primary)' }}>MI HUERTA</span>
      </div>

      <form
        onSubmit={handleLogin}
        className="bg-white rounded-2xl shadow-md border border-[var(--border)] p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6" style={{ color: 'var(--foreground)' }}>
          INICIAR SESIÓN
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>
            Correo electrónico *
          </label>
          <input
            type="email"
            placeholder="Ingrese su correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)] transition-colors"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>
            Contraseña *
          </label>
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)] transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            id="remember"
            checked={remember}
            onChange={e => setRemember(e.target.checked)}
            className="accent-[var(--primary)]"
          />
          <label htmlFor="remember" className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Recordar</label>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-lg font-bold text-white text-sm transition-opacity hover:opacity-90"
          style={{ background: 'var(--primary)' }}
        >
          Iniciar Sesión
        </button>

        <div className="flex justify-between mt-4 text-xs" style={{ color: 'var(--accent)' }}>
          <button type="button" onClick={() => ctx.navigateTo('register')} className="hover:underline">
            ¿No tienes una cuenta?
          </button>
          <button type="button" className="hover:underline">
            ¿Se te olvidó tu contraseña?
          </button>
        </div>
      </form>
    </div>
  )
}
