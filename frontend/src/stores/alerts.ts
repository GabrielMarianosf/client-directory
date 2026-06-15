import { defineStore } from 'pinia'
import type { IAlert, AlertColor } from '@/types/alert'

const useAlertsStore = defineStore('alerts', {
  state: () => ({
    alerts: [] as IAlert[],
  }),

  actions: {
    addAlert(message: string, color: AlertColor = 'error', timeout: number = 5000): void {
      const id = Date.now()

      this.alerts.push({ id, message, color, timeout })

      setTimeout(() => this.removeAlert(id), timeout)
    },

    removeAlert(id: number): void {
      this.alerts = this.alerts.filter((a) => a.id !== id)
    },
  },
})

export default useAlertsStore
