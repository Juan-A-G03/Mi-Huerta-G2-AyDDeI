import Header from '../components/Header'
import type { NavContext } from '../types'

const pasos = [
  '1. Inicia sesión con tu usuario y contraseña para acceder al sistema.',
  '2. Desde el menú principal podés entrar a cultivos, cosechas, familias y reportes.',
  '3. En la sección de familias podés ver cada grupo de cultivo y su detalle.',
  '4. Para registrar una siembra, selecciónala desde la lista y completá la información pedida.',
  '5. Revisá tus cosechas pendientes y confirmá el estado final cuando esté listo.',
  '6. Consultá reportes y ayuda para seguir el progreso de tu huerta.',
]

export default function ManualUsuario({ ctx }: { ctx: NavContext }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} showBack backLabel="Menú principal" backPage="menu" />

      <main className="max-w-4xl mx-auto px-4 py-10 pb-16">
        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--primary)' }}>
            Guía de uso
          </p>
          <h1 className="text-3xl font-black" style={{ color: 'var(--foreground)' }}>
            Manual de usuario
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr] items-start">
          <section className="rounded-3xl border p-6 shadow-sm" style={{ background: 'white', borderColor: 'var(--border)' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              ¿Cómo funciona Mi Huerta?
            </h2>

            <div className="space-y-3">
              {pasos.map((paso) => (
                <div
                  key={paso}
                  className="rounded-2xl p-3 text-sm leading-relaxed"
                  style={{ background: 'var(--secondary)', color: 'var(--foreground)' }}
                >
                  {paso}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                Recomendaciones
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                Revisá las notificaciones y mantené actualizada la información de cada familia para mejorar el control de tu producción y la planificación de siembras.
              </p>
            </div>
          </section>

          <aside className="rounded-3xl border p-4 shadow-sm" style={{ background: 'white', borderColor: 'var(--border)' }}>
            <p className="text-sm font-bold mb-3" style={{ color: 'var(--primary)' }}>
              Vista general
            </p>
            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--border)' }}>
              <img
                src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80"
                alt="Huerta y cultivos"
                className="w-full h-64 object-cover"
              />
            </div>
            <p className="mt-3 text-xs leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              La aplicación te ayuda a gestionar cultivos, siembras, cosechas y seguimiento del estado de la huerta.
            </p>
          </aside>
        </div>
      </main>
    </div>
  )
}
