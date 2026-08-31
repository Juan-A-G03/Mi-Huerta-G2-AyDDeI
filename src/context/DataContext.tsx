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
  cicloMinDias: number
  cicloMaxDias: number
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
  modulo: string
  familia: string
  cultivo: string
  fechaSiembra: string
  fechaDesde: string
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

export interface PropuestaAceptada {
  id: string
  familia: string
  ejemplos?: string
  fechaAceptado: string
  horaAceptado: string
  fechaDesde?: string
  fechaHasta?: string
}

export interface Modulo {
  id: string
  nombre: string
  disponible: boolean
}

export interface Asignacion {
  id: string
  moduloId: string
  modulo: string
  cultivo: string
  familia: string
}

export interface Familia {
  nombre: string
  ejemplos: string
  activa: boolean
  descripcion: string
  humedad: string
  luz: string
  temp: string
  ciclo: string
  cultivos: string[]
}

export interface Desvio {
  id: number
  tipo: string
  motivo: string
  modulo: number
  cultivo: string
  fecha: string
}

export interface Usuario {
  nombre: string
  apellido: string
  mail: string
  telefono: string
  localidad: string
}

interface HistorialCosechaItem {
  id: string
  fecha: string
  familia: string
  cultivo: string
  kilos: number
  fechaSiembra: string
}

interface DataContextType {
  cultivosData: Record<string, CultivoInfo>
  siembras: SiembraItem[]
  cosechas: CosechaItem[]
  historialCosechas: HistorialCosechaItem[]
  notificaciones: NotificacionItem[]
  modulos: Modulo[]
  asignaciones: Asignacion[]
  familias: Familia[]
  desvios: Desvio[]
  usuario: Usuario
  familiasAceptadas: PropuestaAceptada[]
  familiasAsignadas: string[]
  finalizarSiembra: (id: string, fecha: string, hora: string) => void
  completarCosecha: (id: string, kilosMap: Record<string, number>) => void
  aceptarNotificacion: (id: string) => void
  rechazarNotificacion: (id: string) => void
  limpiarNotificacionesAceptadas: () => void
  agregarAsignacion: (moduloId: string, modulo: string, cultivo: string, familia: string) => void
  eliminarAsignacion: (id: string) => void
  confirmarAsignaciones: (familia?: string) => void
  agregarFamilia: (familia: Familia) => void
  modificarFamilia: (nombre: string, data: Familia) => void
  darDeBajaFamilia: (nombre: string) => void
  crearCultivo: (info: CultivoInfo) => void
  modificarCultivo: (nombreAnterior: string, info: CultivoInfo) => void
  eliminarCultivo: (nombre: string) => void
  asignarCultivoAFamilia: (cultivo: string, familia: string) => void
  actualizarUsuario: (usuario: Usuario) => void
  agregarDesvio: (desvio: Desvio) => void
  marcarDesvioCorregido: (id: number) => void
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

export const isoToDdMm = (s: string) => {
  const [y, m, d] = s.split('-')
  return `${d}/${m}/${y}`
}

export const addDays = (dateStr: string, days: number) => {
  const [d, m, y] = dateStr.split('/').map(Number)
  const date = new Date(y, m - 1, d)
  date.setDate(date.getDate() + days)
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
}

export const compareDdMm = (a: string, b: string) => {
  const [da, ma, ya] = a.split('/').map(Number)
  const [db, mb, yb] = b.split('/').map(Number)
  return new Date(ya, ma - 1, da).getTime() - new Date(yb, mb - 1, db).getTime()
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showPopover, setShowPopover] = useState(true)

  const [cultivosData, setCultivosData] = useState<Record<string, CultivoInfo>>({
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
      cicloMinDias: 90,
      cicloMaxDias: 120,
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
      cicloMinDias: 100,
      cicloMaxDias: 140,
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
      cicloMinDias: 60,
      cicloMaxDias: 90,
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
      cicloMinDias: 70,
      cicloMaxDias: 100,
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
      cicloMinDias: 25,
      cicloMaxDias: 35,
    },
    Yuca: {
      nombre: 'Yuca',
      cientifico: 'Manihot Esculenta',
      familia: 'Tubérculos',
      descripcion:
        'También llamada mandioca, es un tubérculo rico en carbohidratos y de gran importancia alimentaria en climas cálidos.',
      humedad: '60% - 80%',
      luz: '6 - 8 hs',
      temp: '20°C - 30°C',
      ciclo: '180 - 300 días',
      ph: '5.5 - 7.0',
      nutrientes: ['Potasio', 'Fósforo'],
      cicloMinDias: 180,
      cicloMaxDias: 300,
    },
    Morrón: {
      nombre: 'Morrón',
      cientifico: 'Capsicum Annuum',
      familia: 'Solanáceas',
      descripcion:
        'Pimiento dulce de fruto carnoso, muy versátil en la cocina. Requiere calor constante y buena iluminación.',
      humedad: '60% - 80%',
      luz: '8 - 10 hs',
      temp: '18°C - 28°C',
      ciclo: '70 - 100 días',
      ph: '6.0 - 7.0',
      nutrientes: ['Nitrógeno', 'Fósforo', 'Potasio'],
      cicloMinDias: 70,
      cicloMaxDias: 100,
    },
    Berenjena: {
      nombre: 'Berenjena',
      cientifico: 'Solanum Melongena',
      familia: 'Solanáceas',
      descripcion:
        'Hortaliza de fruto morado muy sensible al frío. Necesita suelos ricos y riego regular para un buen desarrollo.',
      humedad: '65% - 85%',
      luz: '8 - 10 hs',
      temp: '20°C - 30°C',
      ciclo: '80 - 120 días',
      ph: '5.5 - 6.8',
      nutrientes: ['Potasio', 'Fósforo', 'Calcio'],
      cicloMinDias: 80,
      cicloMaxDias: 120,
    },
    Chile: {
      nombre: 'Chile',
      cientifico: 'Capsicum',
      familia: 'Solanáceas',
      descripcion:
        'Pimiento picante de gran variedad de sabores y niveles de pungencia. Aprecia el calor y el sol directo.',
      humedad: '60% - 80%',
      luz: '8 - 10 hs',
      temp: '20°C - 30°C',
      ciclo: '70 - 110 días',
      ph: '6.0 - 7.0',
      nutrientes: ['Nitrógeno', 'Fósforo', 'Potasio'],
      cicloMinDias: 70,
      cicloMaxDias: 110,
    },
    Zapallo: {
      nombre: 'Zapallo',
      cientifico: 'Cucurbita Máxima',
      familia: 'Cucurbitáceas',
      descripcion:
        'Calabaza de fruto grande y pulpa dulce. Es una planta rastrera que requiere mucho espacio y agua.',
      humedad: '70% - 90%',
      luz: '8 - 10 hs',
      temp: '20°C - 30°C',
      ciclo: '90 - 130 días',
      ph: '6.0 - 7.0',
      nutrientes: ['Potasio', 'Fósforo', 'Materia Orgánica'],
      cicloMinDias: 90,
      cicloMaxDias: 130,
    },
    Pepino: {
      nombre: 'Pepino',
      cientifico: 'Cucumis Sativus',
      familia: 'Cucurbitáceas',
      descripcion:
        'Fruto refrescante de crecimiento rápido. Trepador, ideal para cultivo vertical y riego frecuente.',
      humedad: '70% - 90%',
      luz: '8 - 10 hs',
      temp: '20°C - 30°C',
      ciclo: '50 - 70 días',
      ph: '6.0 - 7.0',
      nutrientes: ['Nitrógeno', 'Potasio', 'Fósforo'],
      cicloMinDias: 50,
      cicloMaxDias: 70,
    },
    Sandía: {
      nombre: 'Sandía',
      cientifico: 'Citrullus Lanatus',
      familia: 'Cucurbitáceas',
      descripcion:
        'Fruta de gran tamaño, muy hidratante y dulce. Exige calor intenso y suelos bien drenados.',
      humedad: '70% - 90%',
      luz: '8 - 10 hs',
      temp: '22°C - 32°C',
      ciclo: '80 - 110 días',
      ph: '6.0 - 6.8',
      nutrientes: ['Potasio', 'Calcio', 'Magnesio'],
      cicloMinDias: 80,
      cicloMaxDias: 110,
    },
    Melón: {
      nombre: 'Melón',
      cientifico: 'Cucumis Melo',
      familia: 'Cucurbitáceas',
      descripcion:
        'Fruta dulce y aromática de verano. Requiere temperaturas cálidas y riego constante en la floración.',
      humedad: '70% - 90%',
      luz: '8 - 10 hs',
      temp: '22°C - 32°C',
      ciclo: '80 - 120 días',
      ph: '6.0 - 6.8',
      nutrientes: ['Potasio', 'Fósforo', 'Calcio'],
      cicloMinDias: 80,
      cicloMaxDias: 120,
    },
    Brócoli: {
      nombre: 'Brócoli',
      cientifico: 'Brassica Oleracea Italica',
      familia: 'Crucíferas',
      descripcion:
        'Hortaliza de inflorescencia verde muy nutritiva. Prefiere climas frescos y suelos fértiles.',
      humedad: '60% - 80%',
      luz: '6 - 8 hs',
      temp: '10°C - 20°C',
      ciclo: '60 - 100 días',
      ph: '6.0 - 7.0',
      nutrientes: ['Nitrógeno', 'Potasio', 'Boro'],
      cicloMinDias: 60,
      cicloMaxDias: 100,
    },
    Repollo: {
      nombre: 'Repollo',
      cientifico: 'Brassica Oleracea Capitata',
      familia: 'Crucíferas',
      descripcion:
        'Hortaliza de hoja que forma una cabeza compacta. Resistente y de alto rendimiento en climas fríos.',
      humedad: '60% - 80%',
      luz: '6 - 8 hs',
      temp: '10°C - 20°C',
      ciclo: '70 - 120 días',
      ph: '6.0 - 7.5',
      nutrientes: ['Nitrógeno', 'Potasio', 'Calcio'],
      cicloMinDias: 70,
      cicloMaxDias: 120,
    },
    Coliflor: {
      nombre: 'Coliflor',
      cientifico: 'Brassica Oleracea Botrytis',
      familia: 'Crucíferas',
      descripcion:
        'Hortaliza de flor blanca compacta. Requiere humedad estable y aportes regulares de nutrientes.',
      humedad: '60% - 80%',
      luz: '6 - 8 hs',
      temp: '10°C - 20°C',
      ciclo: '70 - 120 días',
      ph: '6.0 - 7.5',
      nutrientes: ['Nitrógeno', 'Boro', 'Molibdeno'],
      cicloMinDias: 70,
      cicloMaxDias: 120,
    },
    Rúcula: {
      nombre: 'Rúcula',
      cientifico: 'Eruca Vesicaria',
      familia: 'Crucíferas',
      descripcion:
        'Hoja de sabor picante y crecimiento rápido. Ideal para ensaladas y cosecha continua.',
      humedad: '55% - 75%',
      luz: '5 - 7 hs',
      temp: '12°C - 22°C',
      ciclo: '30 - 50 días',
      ph: '6.0 - 7.0',
      nutrientes: ['Nitrógeno', 'Potasio'],
      cicloMinDias: 30,
      cicloMaxDias: 50,
    },
    Haba: {
      nombre: 'Haba',
      cientifico: 'Vicia Faba',
      familia: 'Leguminosas',
      descripcion:
        'Leguminosa de grano grueso que tolera el frío y enriquece el suelo con nitrógeno.',
      humedad: '55% - 75%',
      luz: '6 - 8 hs',
      temp: '12°C - 20°C',
      ciclo: '90 - 150 días',
      ph: '6.0 - 7.0',
      nutrientes: ['Fósforo', 'Potasio'],
      cicloMinDias: 90,
      cicloMaxDias: 150,
    },
    Frijol: {
      nombre: 'Frijol',
      cientifico: 'Phaseolus Vulgaris',
      familia: 'Leguminosas',
      descripcion:
        'Leguminosa de grano comestible muy difundida. Fija nitrógeno y mejora la estructura del suelo.',
      humedad: '55% - 75%',
      luz: '6 - 8 hs',
      temp: '15°C - 25°C',
      ciclo: '60 - 90 días',
      ph: '6.0 - 7.0',
      nutrientes: ['Fósforo', 'Potasio', 'Nitrógeno'],
      cicloMinDias: 60,
      cicloMaxDias: 90,
    },
    Arveja: {
      nombre: 'Arveja',
      cientifico: 'Pisum Sativum',
      familia: 'Leguminosas',
      descripcion:
        'Leguminosa de vaina dulce, típica de climas frescos. Aporta nitrógeno al suelo en rotación.',
      humedad: '55% - 75%',
      luz: '6 - 8 hs',
      temp: '12°C - 20°C',
      ciclo: '60 - 100 días',
      ph: '6.0 - 7.5',
      nutrientes: ['Fósforo', 'Potasio'],
      cicloMinDias: 60,
      cicloMaxDias: 100,
    },
    Lenteja: {
      nombre: 'Lenteja',
      cientifico: 'Lens Culinaris',
      familia: 'Leguminosas',
      descripcion:
        'Leguminosa de grano pequeño muy nutritiva. Resistente a la sequía y buena para suelos pobres.',
      humedad: '50% - 70%',
      luz: '6 - 8 hs',
      temp: '15°C - 25°C',
      ciclo: '90 - 110 días',
      ph: '6.0 - 7.0',
      nutrientes: ['Fósforo', 'Potasio'],
      cicloMinDias: 90,
      cicloMaxDias: 110,
    },
    Cebolla: {
      nombre: 'Cebolla',
      cientifico: 'Allium Cepa',
      familia: 'Liliáceas',
      descripcion:
        'Hortaliza de bulbo aromático imprescindible en la cocina. Requiere suelos sueltos y buen drenaje.',
      humedad: '50% - 70%',
      luz: '6 - 8 hs',
      temp: '12°C - 22°C',
      ciclo: '120 - 180 días',
      ph: '6.0 - 7.0',
      nutrientes: ['Nitrógeno', 'Potasio', 'Fósforo'],
      cicloMinDias: 120,
      cicloMaxDias: 180,
    },
    Ajo: {
      nombre: 'Ajo',
      cientifico: 'Allium Sativum',
      familia: 'Liliáceas',
      descripcion:
        'Bulbo aromático de gran valor culinario y medicinal. Cultivo rústico de clima frío.',
      humedad: '50% - 70%',
      luz: '6 - 8 hs',
      temp: '10°C - 20°C',
      ciclo: '150 - 210 días',
      ph: '6.0 - 7.0',
      nutrientes: ['Nitrógeno', 'Fósforo', 'Potasio'],
      cicloMinDias: 150,
      cicloMaxDias: 210,
    },
    Puerro: {
      nombre: 'Puerro',
      cientifico: 'Allium Ampeloprasum',
      familia: 'Liliáceas',
      descripcion:
        'Hortaliza de tallo blanco y sabor suave, pariente de la cebolla. Se blanquea al aporcar.',
      humedad: '50% - 70%',
      luz: '6 - 8 hs',
      temp: '12°C - 22°C',
      ciclo: '120 - 180 días',
      ph: '6.0 - 7.0',
      nutrientes: ['Nitrógeno', 'Potasio'],
      cicloMinDias: 120,
      cicloMaxDias: 180,
    },
    Ciboulette: {
      nombre: 'Ciboulette',
      cientifico: 'Allium Schoenoprasum',
      familia: 'Liliáceas',
      descripcion:
        'Hierba aromática perenne de hojas finas. Ideal para macetas y cosecha continua.',
      humedad: '50% - 70%',
      luz: '5 - 7 hs',
      temp: '10°C - 22°C',
      ciclo: '60 - 90 días',
      ph: '6.0 - 7.0',
      nutrientes: ['Nitrógeno', 'Potasio'],
      cicloMinDias: 60,
      cicloMaxDias: 90,
    },
    Lechuga: {
      nombre: 'Lechuga',
      cientifico: 'Lactuca Sativa',
      familia: '',
      descripcion:
        'Hortaliza de hoja por excelencia para ensaladas. De crecimiento rápido y cosecha escalonada.',
      humedad: '60% - 80%',
      luz: '4 - 6 hs',
      temp: '12°C - 20°C',
      ciclo: '50 - 70 días',
      ph: '6.0 - 7.0',
      nutrientes: ['Nitrógeno', 'Potasio'],
      cicloMinDias: 50,
      cicloMaxDias: 70,
    },
    Acelga: {
      nombre: 'Acelga',
      cientifico: 'Beta Vulgaris Cicla',
      familia: '',
      descripcion:
        'Hortaliza de hoja ancha y penca carnosa. Muy productiva, permite cosechas repetidas.',
      humedad: '60% - 80%',
      luz: '5 - 7 hs',
      temp: '12°C - 22°C',
      ciclo: '60 - 90 días',
      ph: '6.0 - 7.0',
      nutrientes: ['Nitrógeno', 'Potasio', 'Magnesio'],
      cicloMinDias: 60,
      cicloMaxDias: 90,
    },
    Espinaca: {
      nombre: 'Espinaca',
      cientifico: 'Spinacia Oleracea',
      familia: '',
      descripcion:
        'Hoja verde rica en hierro y vitaminas. Prefiere climas frescos y riego regular.',
      humedad: '60% - 80%',
      luz: '4 - 6 hs',
      temp: '10°C - 20°C',
      ciclo: '40 - 60 días',
      ph: '6.0 - 7.5',
      nutrientes: ['Nitrógeno', 'Potasio', 'Hierro'],
      cicloMinDias: 40,
      cicloMaxDias: 60,
    },
  })

  const [modulos, setModulos] = useState<Modulo[]>([
    { id: 'm1', nombre: 'Módulo #1', disponible: true },
    { id: 'm2', nombre: 'Módulo #2', disponible: false },
    { id: 'm3', nombre: 'Módulo #3', disponible: false },
    { id: 'm4', nombre: 'Módulo #4', disponible: false },
    { id: 'm5', nombre: 'Módulo #5', disponible: false },
    { id: 'm6', nombre: 'Módulo #6', disponible: false },
    { id: 'm7', nombre: 'Módulo #7', disponible: false },
    { id: 'm8', nombre: 'Módulo #8', disponible: true },
    { id: 'm9', nombre: 'Módulo #9', disponible: true },
    { id: 'm10', nombre: 'Módulo #10', disponible: true },
  ])

  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([])

  const [familiasAceptadas, setFamiliasAceptadas] = useState<PropuestaAceptada[]>([])

  const [familiasAsignadas, setFamiliasAsignadas] = useState<string[]>([])

  const [familias, setFamilias] = useState<Familia[]>([
    {
      nombre: 'Tubérculos',
      ejemplos: 'papas, camote, yuca...',
      activa: true,
      descripcion:
        'Los tubérculos son órganos vegetativos subterráneos que acumulan nutrientes y energía. Son cultivos de gran importancia alimentaria en todo el mundo, especialmente en regiones templadas y frías. Requieren suelos bien drenados y ricos en materia orgánica para un desarrollo óptimo.',
      humedad: '60% - 80%',
      luz: '6 - 8 hs',
      temp: '15°C - 22°C',
      ciclo: '90 - 120 días',
      cultivos: ['Batata', 'Papa', 'Zanahoria', 'Rábano', 'Yuca'],
    },
    {
      nombre: 'Solanáceas',
      ejemplos: 'tomate, morrón, berenjena...',
      activa: true,
      descripcion:
        'Las solanáceas son una familia de plantas que incluye importantes cultivos alimentarios. Se caracterizan por sus flores pentámeras y frutos carnosos. Prefieren climas cálidos y suelos bien drenados con buen contenido de nutrientes.',
      humedad: '65% - 85%',
      luz: '8 - 10 hs',
      temp: '18°C - 28°C',
      ciclo: '60 - 90 días',
      cultivos: ['Tomate', 'Morrón', 'Berenjena', 'Chile'],
    },
    {
      nombre: 'Cucurbitáceas',
      ejemplos: 'zapallo, pepino, sandía...',
      activa: true,
      descripcion:
        'Las cucurbitáceas son plantas trepadoras o rastreras que producen frutos grandes y carnosos. Son cultivos de verano que requieren espacio y calor para desarrollarse. Se caracterizan por su rápido crecimiento.',
      humedad: '70% - 90%',
      luz: '8 - 10 hs',
      temp: '20°C - 30°C',
      ciclo: '60 - 120 días',
      cultivos: ['Zapallo', 'Pepino', 'Sandía', 'Melón'],
    },
    {
      nombre: 'Crucíferas',
      ejemplos: 'brócoli, repollo,...',
      activa: true,
      descripcion:
        'Las crucíferas son plantas de clima frío y moderado, ricas en vitaminas y minerales. Son muy versátiles en la cocina y en la huerta.',
      humedad: '60% - 80%',
      luz: '6 - 8 hs',
      temp: '10°C - 20°C',
      ciclo: '60 - 100 días',
      cultivos: ['Brócoli', 'Repollo', 'Coliflor', 'Rúcula'],
    },
    {
      nombre: 'Leguminosas',
      ejemplos: 'habas, frijoles',
      activa: true,
      descripcion:
        'Las leguminosas fijan nitrógeno del aire al suelo, enriqueciéndolo de forma natural. Son excelentes cultivos de rotación y fuente importante de proteínas vegetales.',
      humedad: '55% - 75%',
      luz: '6 - 8 hs',
      temp: '15°C - 25°C',
      ciclo: '50 - 90 días',
      cultivos: ['Haba', 'Frijol', 'Arveja', 'Lenteja'],
    },
    {
      nombre: 'Liliáceas',
      ejemplos: 'cebolla, ajo',
      activa: true,
      descripcion:
        'Las liliáceas incluyen plantas aromáticas y condimentarias de gran uso culinario. Son cultivos resistentes que se adaptan bien a diferentes tipos de suelo.',
      humedad: '50% - 70%',
      luz: '6 - 8 hs',
      temp: '12°C - 22°C',
      ciclo: '120 - 180 días',
      cultivos: ['Cebolla', 'Ajo', 'Puerro', 'Ciboulette'],
    },
  ])

  const [desvios, setDesvios] = useState<Desvio[]>([
    { id: 26, tipo: 'Riego', motivo: 'Humedad Baja (40%)', modulo: 6, cultivo: 'Papa', fecha: '04/05/2026' },
    { id: 25, tipo: 'Invernadero', motivo: 'Helada (5°C)', modulo: 7, cultivo: 'Batata', fecha: '02/05/2026' },
    { id: 24, tipo: 'Invernadero', motivo: 'Helada (6°C)', modulo: 6, cultivo: 'Papa', fecha: '02/05/2026' },
  ])

  const [usuario, setUsuario] = useState<Usuario>({
    nombre: 'Juan',
    apellido: 'Fernandez',
    mail: 'fernandezjuan@mail.com',
    telefono: '1234567890',
    localidad: 'Rosario, Argentina',
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
      modulo: 'Módulo #4',
      familia: 'Tubérculos',
      cultivo: 'Rábano',
      fechaSiembra: getFormattedToday(-30),
      fechaDesde: getFormattedToday(-5),
      fechaHasta: getFormattedToday(5),
      completada: false,
    },
    {
      id: 'c2',
      modulo: 'Módulo #2',
      familia: 'Tubérculos',
      cultivo: 'Zanahoria',
      fechaSiembra: getFormattedToday(-85),
      fechaDesde: getFormattedToday(-15),
      fechaHasta: getFormattedToday(15),
      completada: false,
    },
    {
      id: 'c3',
      modulo: 'Módulo #6',
      familia: 'Solanáceas',
      cultivo: 'Tomate',
      fechaSiembra: getFormattedToday(-75),
      fechaDesde: getFormattedToday(-15),
      fechaHasta: getFormattedToday(15),
      completada: false,
    },
  ])

  const [historialCosechas, setHistorialCosechas] = useState<HistorialCosechaItem[]>([
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
    const siembra = siembras.find((s) => s.id === id)
    setSiembras((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, estado: 'FINALIZADA', fechaSiembraReal: fecha, horaSiembraReal: hora } : s
      )
    )
    if (siembra) {
      const info = cultivosData[siembra.cultivo]
      const min = info?.cicloMinDias ?? 60
      const max = info?.cicloMaxDias ?? 90
      const fechaDdMm = fecha.includes('-') ? isoToDdMm(fecha) : fecha
      const fechaDesde = addDays(fechaDdMm, min)
      const fechaHasta = addDays(fechaDdMm, max)
      setCosechas((prev) => [
        {
          id: 'c_' + Date.now(),
          modulo: siembra.modulo,
          familia: siembra.familia,
          cultivo: siembra.cultivo,
          fechaSiembra: fechaDdMm,
          fechaDesde,
          fechaHasta,
          completada: false,
        },
        ...prev,
      ])
    }
  }

  const completarCosecha = (id: string, kilosMap: Record<string, number>) => {
    const cosechada = cosechas.find((c) => c.id === id)
    setCosechas((prev) => prev.map((c) => (c.id === id ? { ...c, completada: true } : c)))
    if (cosechada) {
      setModulos((prev) =>
        prev.map((m) => (m.nombre === cosechada.modulo ? { ...m, disponible: true } : m))
      )
      Object.entries(kilosMap).forEach(([cultivoNombre, kg]) => {
        if (kg > 0) {
          setHistorialCosechas((prev) => [
            {
              id: 'h_' + Date.now() + Math.random(),
              fecha: getFormattedToday(),
              familia: cosechada.familia,
              cultivo: cultivoNombre,
              kilos: kg,
              fechaSiembra: cosechada.fechaSiembra,
            },
            ...prev,
          ])
        }
      })
    }
  }

  const aceptarNotificacion = (id: string) => {
    const now = new Date()
    const nowTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const todayFormatted = getFormattedToday()

    const notif = notificaciones.find((n) => n.id === id)
    if (notif && notif.tipo === 'siembra' && notif.familia) {
      setFamiliasAceptadas((prev) => [
        ...prev,
        {
          id: notif.id,
          familia: notif.familia!,
          ejemplos: notif.ejemplos,
          fechaAceptado: todayFormatted,
          horaAceptado: nowTime,
          fechaDesde: notif.fechaDesde,
          fechaHasta: notif.fechaHasta,
        },
      ])
    }

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
  }

  const rechazarNotificacion = (id: string) => {
    setNotificaciones((prev) => prev.filter((n) => n.id !== id))
  }

  const limpiarNotificacionesAceptadas = () => {
    setNotificaciones((prev) => prev.filter((n) => !n.accepted))
  }

  const agregarAsignacion = (moduloId: string, modulo: string, cultivo: string, familia: string) => {
    setAsignaciones((prev) => [
      ...prev,
      { id: 'a_' + Date.now() + Math.random(), moduloId, modulo, cultivo, familia },
    ])
  }

  const eliminarAsignacion = (id: string) => {
    setAsignaciones((prev) => prev.filter((a) => a.id !== id))
  }

  const confirmarAsignaciones = (familia?: string) => {
    const target = familia ? asignaciones.filter((a) => a.familia === familia) : asignaciones
    const targetIds = new Set(target.map((a) => a.id))
    const familiasInvolucradas = Array.from(new Set(target.map((a) => a.familia)))

    target.forEach((a) => {
      setSiembras((prev) => [
        {
          id: 's_' + Date.now() + Math.random(),
          modulo: a.modulo,
          familia: a.familia,
          cultivo: a.cultivo,
          fechaSiembraAceptada: getFormattedToday(),
          estado: 'PENDIENTE',
        },
        ...prev,
      ])
      setModulos((prev) => prev.map((m) => (m.id === a.moduloId ? { ...m, disponible: false } : m)))
    })

    setAsignaciones((prev) => prev.filter((a) => !targetIds.has(a.id)))
    setFamiliasAsignadas((prev) => Array.from(new Set([...prev, ...familiasInvolucradas])))
  }

  const agregarFamilia = (familia: Familia) => {
    setFamilias((prev) => [...prev, familia])
  }

  const modificarFamilia = (nombre: string, data: Familia) => {
    setFamilias((prev) => prev.map((f) => (f.nombre === nombre ? { ...f, ...data } : f)))
  }

  const darDeBajaFamilia = (nombre: string) => {
    const tieneCultivosActivos =
      siembras.some((s) => s.familia === nombre && s.estado === 'PENDIENTE' && s.id.startsWith('s_')) ||
      cosechas.some((c) => c.familia === nombre && !c.completada && c.id.startsWith('c_'))

    if (tieneCultivosActivos) {
      return
    }

    setFamilias((prev) => prev.map((f) => (f.nombre === nombre ? { ...f, activa: false } : f)))
  }

  const crearCultivo = (info: CultivoInfo) => {
    setCultivosData((prev) => ({ ...prev, [info.nombre]: info }))
    if (info.familia) {
      setFamilias((prev) =>
        prev.map((f) =>
          f.nombre === info.familia && !f.cultivos.includes(info.nombre)
            ? { ...f, cultivos: [...f.cultivos, info.nombre] }
            : f
        )
      )
    }
  }

  const modificarCultivo = (nombreAnterior: string, info: CultivoInfo) => {
    setCultivosData((prev) => {
      const next = { ...prev }
      delete next[nombreAnterior]
      next[info.nombre] = info
      return next
    })
    setFamilias((prev) =>
      prev.map((f) => {
        const sinAnterior = f.cultivos.filter((c) => c !== nombreAnterior)
        if (info.familia === f.nombre && !sinAnterior.includes(info.nombre)) {
          return { ...f, cultivos: [...sinAnterior, info.nombre] }
        }
        return { ...f, cultivos: sinAnterior }
      })
    )
  }

  const eliminarCultivo = (nombre: string) => {
    setCultivosData((prev) => {
      const next = { ...prev }
      delete next[nombre]
      return next
    })
    setFamilias((prev) =>
      prev.map((f) => ({ ...f, cultivos: f.cultivos.filter((c) => c !== nombre) }))
    )
  }

  const asignarCultivoAFamilia = (cultivo: string, familia: string) => {
    setCultivosData((prev) =>
      prev[cultivo] ? { ...prev, [cultivo]: { ...prev[cultivo], familia } } : prev
    )
    setFamilias((prev) =>
      prev.map((f) => {
        const sinCultivo = f.cultivos.filter((c) => c !== cultivo)
        if (f.nombre === familia) {
          return { ...f, cultivos: [...sinCultivo, cultivo] }
        }
        return { ...f, cultivos: sinCultivo }
      })
    )
  }

  const actualizarUsuario = (u: Usuario) => {
    setUsuario(u)
  }

  const agregarDesvio = (desvio: Desvio) => {
    setDesvios((prev) => [desvio, ...prev])
  }

  const marcarDesvioCorregido = (id: number) => {
    setDesvios((prev) => prev.filter((d) => d.id !== id))
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
        modulos,
        asignaciones,
        familias,
        desvios,
        usuario,
        familiasAceptadas,
        familiasAsignadas,
        finalizarSiembra,
        completarCosecha,
        aceptarNotificacion,
        rechazarNotificacion,
        limpiarNotificacionesAceptadas,
        agregarAsignacion,
        eliminarAsignacion,
        confirmarAsignaciones,
        agregarFamilia,
        modificarFamilia,
        darDeBajaFamilia,
        crearCultivo,
        modificarCultivo,
        eliminarCultivo,
        asignarCultivoAFamilia,
        actualizarUsuario,
        agregarDesvio,
        marcarDesvioCorregido,
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
