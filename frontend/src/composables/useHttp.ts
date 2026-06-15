import { inject } from 'vue'
import type { AxiosInstance } from 'axios'

export function useHttp(): AxiosInstance {
  const http = inject<AxiosInstance>('$api')
  if (!http) throw new Error('HTTP client não foi injetado.')
  return http
}
