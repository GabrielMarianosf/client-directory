export type AlertColor = 'success' | 'error' | 'warning' | 'info'

export interface IAlert {
  id: number
  message: string
  color: AlertColor
  timeout?: number
}
