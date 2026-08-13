import type { NavContext, Page } from '../types'

interface FloatingChatbotProps {
  ctx: NavContext
  currentPage: Page
}

export default function FloatingChatbot({ ctx, currentPage }: FloatingChatbotProps) {
  // Ocultar si ya estamos en la página del chatbot
  if (currentPage === 'chatbot') return null

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <button
        onClick={() => ctx.navigateTo('chatbot')}
        aria-label="Abrir Asistente Chatbot IA"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border-2 border-white/20"
        style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
        }}
      >
        <span className="text-2xl animate-bounce">🤖</span>
        <span className="font-extrabold tracking-wide hidden sm:inline">IA Huerta</span>
        <span className="relative flex h-2.5 w-2.5 -ml-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
      </button>

      {/* Tooltip en hover */}
      <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block whitespace-nowrap bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg border border-gray-700">
        ¿Tienes dudas? ¡Pregúntale a la IA! 🌱
      </div>
    </div>
  )
}
