import { useState } from 'react'
import Header from '../components/Header'
import type { NavContext } from '../types'

interface Message {
  id: number
  sender: 'user' | 'bot'
  text: string
}

const botResponses: Record<string, string> = {
  papa: '¡A finales del invierno puedes sembrar papas! El período ideal es de abril a mayo en el hemisferio sur.',
  tomate: 'Los tomates se siembran en primavera, cuando las temperaturas superen los 15°C. Necesitan mucho sol.',
  default: '¡Buena pregunta! Te recomiendo revisar la sección de Familias para más información sobre los cultivos.',
}

function getBotResponse(text: string): string {
  const lower = text.toLowerCase()
  if (lower.includes('papa') || lower.includes('tubérculo')) return botResponses.papa
  if (lower.includes('tomate') || lower.includes('solanácea')) return botResponses.tomate
  return botResponses.default
}

export default function Chatbot({ ctx }: { ctx: NavContext }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, sender: 'bot', text: '¡Hola! ¿En qué podría ayudarte?' },
  ])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg: Message = { id: Date.now(), sender: 'user', text: input }
    const botMsg: Message = { id: Date.now() + 1, sender: 'bot', text: getBotResponse(input) }
    setMessages(prev => [...prev, userMsg, botMsg])
    setInput('')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)' }}>
      <Header ctx={ctx} showBack backLabel="Ayuda" backPage="faq" />

      <main className="flex-1 max-w-lg mx-auto w-full px-4 pt-12 pb-4 flex flex-col">
        <h2 className="text-xl font-black mb-4" style={{ color: 'var(--foreground)' }}>
          MIHUERTA CHATBOT
        </h2>

        <div className="flex-1 bg-white rounded-2xl border border-[var(--border)] shadow-sm p-4 flex flex-col gap-3 min-h-64 mb-4 overflow-y-auto">
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="max-w-[80%] px-4 py-2 rounded-2xl text-sm"
                style={{
                  background: m.sender === 'user' ? 'var(--primary)' : 'var(--secondary)',
                  color: m.sender === 'user' ? 'white' : 'var(--foreground)',
                  borderRadius: m.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="TU PREGUNTA"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            className="flex-1 border border-[var(--border)] rounded-xl px-4 py-2 text-sm outline-none focus:border-[var(--primary)]"
          />
          <button
            onClick={sendMessage}
            className="px-5 py-2 rounded-xl text-white font-bold text-sm hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            Enviar
          </button>
        </div>

        <div className="mt-3 flex justify-center">
          <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            ¿Tenés más dudas? &nbsp;
            <button className="font-bold hover:underline" style={{ color: 'var(--accent)' }}>
              Hablar con un agente
            </button>
          </span>
        </div>
      </main>
    </div>
  )
}
