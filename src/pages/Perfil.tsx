import { useState } from 'react'
import Header from '../components/Header'
import type { NavContext } from '../types'

export default function Perfil({ ctx }: { ctx: NavContext }) {
  const [showDesactivar, setShowDesactivar] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} showBack backLabel="Menú principal" backPage="menu" />

      <main className="max-w-md mx-auto px-4 pt-12 pb-16">
        <h2 className="text-xl font-black mb-6" style={{ color: 'var(--foreground)' }}>Perfil</h2>

        <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-6">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full border-4 flex items-center justify-center mb-3"
              style={{ borderColor: 'var(--primary)', background: 'var(--secondary)' }}>
              <span className="text-5xl">👤</span>
            </div>
            <h3 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>Juan Fernandez</h3>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>fernandezjuan@mail.com</p>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Rosario, Argentina</p>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>1234567890</p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => ctx.navigateTo('modificar-usuario')}
              className="w-full py-2.5 rounded-xl font-bold text-sm border-2 hover:bg-[var(--secondary)] transition-colors"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              MODIFICAR USUARIO
            </button>
            <button
              onClick={() => ctx.navigateTo('modificar-usuario')}
              className="w-full py-2.5 rounded-xl font-bold text-sm border-2 hover:bg-[var(--secondary)] transition-colors"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              CAMBIAR FOTO DE PERFIL
            </button>
            <button
              onClick={() => ctx.navigateTo('cambiar-password')}
              className="w-full py-2.5 rounded-xl font-bold text-sm border-2 hover:bg-[var(--secondary)] transition-colors"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              CAMBIAR CONTRASEÑA
            </button>
            <button
              onClick={() => setShowDesactivar(true)}
              className="w-full py-2.5 rounded-xl font-bold text-sm bg-red-500 text-white hover:opacity-90 transition-opacity mt-2"
            >
              DESACTIVAR CUENTA
            </button>
          </div>
        </div>
      </main>

      {showDesactivar && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full border-2 border-red-300">
            <h3 className="font-black text-base text-center mb-2" style={{ color: 'var(--danger)' }}>
              ¡ ATENCIÓN !
            </h3>
            <p className="text-sm text-center mb-1" style={{ color: 'var(--foreground)' }}>
              Si desactiva la cuenta se eliminarán también todos los datos cargados
            </p>
            <p className="text-sm text-center font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              ¿ Está seguro de desactivar la cuenta ?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDesactivar(false)}
                className="flex-1 py-2 rounded-lg font-bold text-sm border border-[var(--border)] hover:bg-[var(--secondary)]">
                NO - cancelar
              </button>
              <button onClick={() => ctx.navigateTo('login')}
                className="flex-1 py-2 rounded-lg font-bold text-sm text-white bg-red-500 hover:opacity-90">
                SI - desactivar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
