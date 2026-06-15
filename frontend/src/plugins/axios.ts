import axios from 'axios'
import type { App } from 'vue'

export const $api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export default {
  install(app: App) {
    app.provide('http', $api)
  },
}
