import React, { createContext, useContext, useState } from 'react'

export interface CultivoInfo {
  nombre: string
  cientifico: string
  familia: string
  descripcion: string
  humedad: string
  luz: string
  temp: string
  ciclo: string
  ph: string
  nutrientes: string[]
  pasosCosecha?: string[]
}

export interface SiembraItem {
  id: string
  modulo: string
  familia: string
  cultivo: string
  fechaSiembraAceptada: string
  fechaSiembraReal?: string
  horaSiembraReal?: string
  estado: 'PENDIENTE' | 'FINALIZADA'
}

export interface CosechaItem {
  id: string
  familia: string
  cultivo: string
  fechaHasta: string
  kilos?: number
  fechaCosechaReal?: string
  completada: boolean
}

export interface NotificacionItem {
  id: string
  titulo: string
  mensaje: string
  tipo: 'siembra' | 'cosecha' | 'desvio'
  familia?: string
  ejemplos?: string
  fechaDesde?: string
  fechaHasta?: string
  leida: boolean
  accepted?: boolean
  rejected?: boolean
  fechaAceptado?: string
  horaAceptado?: string
  fecha: string
}

interface DataContextType {
  cultivosData: Record<string, CultivoInfo>
  siembras: SiembraItem[]
  cosechas: CosechaItem[]
  historialCosechas: Array<{ id: string; fecha: string; familia: string; cultivo: string; kilos: number; fechaSiembra: string }>
  notificaciones: NotificacionItem[]
  finalizarSiembra: (id: string, fecha: string, hora: string) => void
  completarCosecha: (id: string, kilosMap: Record<string, number>) => void
  agregarSiembra: (modulo: string, familia: string, cultivo: string) => void
  aceptarNotificacion: (id: string) => void
  rechazarNotificacion: (id: string) => void
  showPopover: boolean
  dismissPopover: () => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export const getFormattedToday = (offsetDays = 0) => {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showPopover, setShowPopover] = useState(true)

  const [cultivosData] = useState<Record<string, CultivoInfo>>({
    Papa: {
      nombre: 'Papa',
      cientifico: 'Solanum Tuberosum',
      familia: 'Tubérculos',
      descripcion:
        'La papa es un tubérculo comestible originario de los Andes de gran valor nutricional. Acumula agua y almidón en sus tallos subterráneos y requiere suelos bien aireados y ricos en materia orgánica.',
      humedad: '60% - 80%',
      luz: '6 - 8 hs',
      temp: '15°C - 22°C',
      ciclo: '90 - 120 días',
      ph: '5.0 - 6.5 (Ligeramente Ácido)',
      nutrientes: ['Nitrógeno', 'Fósforo', 'Potasio'],
      pasosCosecha: [
        'Inspeccionar el follaje: esperar a que las hojas comiencen a amarillear y secarse ligeramente.',
        'Aflojar la tierra con cuidado alrededor de la base usando una horca de mano para evitar dañar los tubérculos.',
        'Extraer suavemente la planta completa y recolectar todas las papas del sustrato.',
      ],
    },
    Batata: {
      nombre: 'Batata',
      cientifico: 'Ipomoea Batatas',
      familia: 'Tubérculos',
      descripcion:
        'También conocida como camote o boniato. Es una raíz tuberosa dulce muy nutritiva que prefiere climas cálidos y suelos sueltos.',
      humedad: '60% - 75%',
      luz: '7 - 9 hs',
      temp: '20°C - 28°C',
      ciclo: '100 - 140 días',
      ph: '5.5 - 6.8',
      nutrientes: ['Potasio', 'Fósforo', 'Materia Orgánica'],
    },
    Tomate: {
      nombre: 'Tomate',
      cientifico: 'Solanum Lycopersicum',
      familia: 'Solanáceas',
      descripcion:
        'El tomate es una de las hortalizas más populares. Requiere buena iluminación solar y riego regular para prevenir agrietamiento.',
      humedad: '65% - 85%',
      luz: '8 - 10 hs',
      temp: '18°C - 28°C',
      ciclo: '60 - 90 días',
      ph: '6.0 - 6.8',
      nutrientes: ['Calcio', 'Potasio', 'Nitrógeno'],
    },
    Zanahoria: {
      nombre: 'Zanahoria',
      cientifico: 'Daucus Carota',
      familia: 'Tubérculos',
      descripcion:
        'Hortaliza de raíz de color naranja rica en carotenos. Requiere suelos profundos y arenosos sin piedras para crecer recta.',
      humedad: '60% - 75%',
      luz: '6 - 8 hs',
      temp: '15°C - 24°C',
      ciclo: '70 - 100 días',
      ph: '6.0 - 7.0',
      nutrientes: ['Potasio', 'Fósforo'],
    },
    Rábano: {
      nombre: 'Rábano',
      cientifico: 'Raphanus Sativus',
      familia: 'Tubérculos',
      descripcion:
        'De crecimiento muy rápido y sabor picante fresco. Ideal para huertas urbanas y espacios reducidos.',
      humedad: '60% - 80%',
      luz: '5 - 7 hs',
      temp: '12°C - 20°C',
      ciclo: '25 - 35 días',
      ph: '6.0 - 7.0',
      nutrientes: ['Nitrógeno ligero', 'Fósforo'],
    },
  })

  const [siembras, setSiembras] = useState<SiembraItem[]>([
    {
      id: 's1',
      modulo: 'Módulo #5',
      familia: 'Tubérculos',
      cultivo: 'Papa',
      fechaSiembraAceptada: getFormattedToday(-2),
      estado: 'PENDIENTE',
    },
    {
      id: 's2',
      modulo: 'Módulo #7',
      familia: 'Tubérculos',
      cultivo: 'Batata',
      fechaSiembraAceptada: getFormattedToday(-1),
      estado: 'PENDIENTE',
    },
    {
      id: 's3',
      modulo: 'Módulo #3',
      familia: 'Cucurbitáceas',
      cultivo: 'Pepino',
      fechaSiembraAceptada: getFormattedToday(-5),
      estado: 'PENDIENTE',
    },
  ])

  const [cosechas, setCosechas] = useState<CosechaItem[]>([
    {
      id: 'c1',
      familia: 'Tubérculos',
      cultivo: 'Papa',
      fechaHasta: getFormattedToday(7),
      completada: false,
    },
    {
      id: 'c2',
      familia: 'Solanáceas',
      cultivo: 'Tomate',
      fechaHasta: getFormattedToday(3),
      completada: false,
    },
  ])

  const [historialCosechas, setHistorialCosechas] = useState<
    Array<{ id: string; fecha: string; familia: string; cultivo: string; kilos: number; fechaSiembra: string }>
  >([
    {
      id: 'h1',
      fecha: getFormattedToday(-10),
      familia: 'Tubérculos',
      cultivo: 'Papa',
      kilos: 4,
      fechaSiembra: getFormattedToday(-100),
    },
    {
      id: 'h2',
      fecha: getFormattedToday(-10),
      familia: 'Tubérculos',
      cultivo: 'Batata',
      kilos: 5,
      fechaSiembra: getFormattedToday(-110),
    },
    {
      id: 'h3',
      fecha: getFormattedToday(-45),
      familia: 'Solanáceas',
      cultivo: 'Tomate',
      kilos: 3,
      fechaSiembra: getFormattedToday(-120),
    },
  ])

  // Fechas estrictamente posteriores al dia actual
  const fechaPosteriorInicio = getFormattedToday(3)
  const fechaPosteriorFin = getFormattedToday(30)

  const [notificaciones, setNotificaciones] = useState<NotificacionItem[]>([
    {
      id: 'n1',
      titulo: 'Siembra familia Tubérculos',
      mensaje: `Se acerca la fecha para sembrar Tubérculos. Del ${fechaPosteriorInicio} al ${fechaPosteriorFin} podés sembrarlas.`,
      tipo: 'siembra',
      familia: 'Tubérculos',
      ejemplos: 'papas, camote, yuca...',
      fechaDesde: fechaPosteriorInicio,
      fechaHasta: fechaPosteriorFin,
      leida: false,
      accepted: false,
      fecha: getFormattedToday(),
    },
    {
      id: 'n2',
      titulo: 'Siembra familia Hortalizas',
      mensaje: `Se acerca la fecha para sembrar Hortalizas. Del ${getFormattedToday(5)} al ${getFormattedToday(35)} podés sembrarlas.`,
      tipo: 'siembra',
      familia: 'Hortalizas',
      ejemplos: 'lechuga, acelga, espinaca...',
      fechaDesde: getFormattedToday(5),
      fechaHasta: getFormattedToday(35),
      leida: false,
      accepted: false,
      fecha: getFormattedToday(),
    },
    {
      id: 'n3',
      titulo: 'Siembra familia Crucíferas',
      mensaje: `Se acerca la fecha para sembrar Crucíferas. Del ${getFormattedToday(7)} al ${getFormattedToday(40)} podés sembrarlas.`,
      tipo: 'siembra',
      familia: 'Crucíferas',
      ejemplos: 'brócoli, repollo, coliflor...',
      fechaDesde: getFormattedToday(7),
      fechaHasta: getFormattedToday(40),
      leida: false,
      accepted: false,
      fecha: getFormattedToday(),
    },
  ])

  const finalizarSiembra = (id: string, fecha: string, hora: string) => {
    setSiembras((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, estado: 'FINALIZADA', fechaSiembraReal: fecha, horaSiembraReal: hora } : s
      )
    )
  }

  const completarCosecha = (id: string, kilosMap: Record<string, number>) => {
    setCosechas((prev) => prev.map((c) => (c.id === id ? { ...c, completada: true } : c)))
    const cosechada = cosechas.find((c) => c.id === id)
    if (cosechada) {
      Object.entries(kilosMap).forEach(([cultivoNombre, kg]) => {
        if (kg > 0) {
          setHistorialCosechas((prev) => [
            {
              id: 'h_' + Date.now() + Math.random(),
              fecha: getFormattedToday(),
              familia: cosechada.familia,
              cultivo: cultivoNombre,
              kilos: kg,
              fechaSiembra: getFormattedToday(-90),
            },
            ...prev,
          ])
        }
      })
    }
  }

  const agregarSiembra = (modulo: string, familia: string, cultivo: string) => {
    const nueva: SiembraItem = {
      id: 's_' + Date.now(),
      modulo,
      familia,
      cultivo,
      fechaSiembraAceptada: getFormattedToday(),
      estado: 'PENDIENTE',
    }
    setSiembras((prev) => [nueva, ...prev])
  }

  const aceptarNotificacion = (id: string) => {
    const now = new Date()
    const nowTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const todayFormatted = getFormattedToday()

    setNotificaciones((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              accepted: true,
              leida: true,
              fechaAceptado: todayFormatted,
              horaAceptado: nowTime,
            }
          : n
      )
    )

    const target = notificaciones.find((n) => n.id === id)
    if (target && target.familia) {
      const nuevoModuloNum = Math.floor(Math.random() * 5) + 8
      agregarSiembra(
        `Módulo #${nuevoModuloNum}`,
        target.familia,
        target.familia === 'Tubérculos' ? 'Papa' : 'Batata'
      )
    }
  }

  const rechazarNotificacion = (id: string) => {
    setNotificaciones((prev) => prev.filter((n) => n.id !== id))
  }

  const dismissPopover = () => {
    setShowPopover(false)
  }

  return (
    <DataContext.Provider
      value={{
        cultivosData,
        siembras,
        cosechas,
        historialCosechas,
        notificaciones,
        finalizarSiembra,
        completarCosecha,
        agregarSiembra,
        aceptarNotificacion,
        rechazarNotificacion,
        showPopover,
        dismissPopover,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
