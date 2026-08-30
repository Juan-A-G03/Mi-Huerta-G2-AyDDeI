export type Page =
  | 'login'
  | 'register'
  | 'menu'
  | 'notificaciones'
  | 'familias'
  | 'familia-detalle'
  | 'familia-crear'
  | 'cultivos-aceptados'
  | 'modulos-disponibles'
  | 'siembras-finalizar'
  | 'siembra-form'
  | 'cosechas-pendientes'
  | 'cosecha-harvest'
  | 'cosecha-exito'
  | 'historial-cosechas'
  | 'reportes'
  | 'manual-usuario'
  | 'perfil'
  | 'modificar-usuario'
  | 'cambiar-password'
  | 'cultivo-detalle'
  | 'ayuda'
  | 'tutoriales'
  | 'faq'
  | 'chatbot'

export interface NavContext {
  navigateTo: (page: Page, params?: Record<string, unknown>) => void
  goBack: () => void
  params: Record<string, unknown>
  notifCount: number
  setNotifCount: (n: number) => void
}
