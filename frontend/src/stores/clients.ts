import { defineStore } from 'pinia'
import { $api } from '@/plugins/axios'
import type { IClient, IClientsQuery, IClientsResponse } from '@/types/client'
import useAlertsStore from '@/stores/alerts'

const useClientsStore = defineStore('clients', {
  state: () => ({
    clients: [] as IClient[],
    total: 0 as number,
    states: [] as string[],
    selectedClient: null as IClient | null,

    loadingClients: false as boolean,
    loadingClient: false as boolean,
    loadingStates: false as boolean,

    filters: {
      page: 1 as number,
      limit: 10 as number,
      selectedState: '' as string,
      searchName: '' as string,
      sortBy: 'name' as 'name' | 'registeredAt',
      sortOrder: 'asc' as 'asc' | 'desc',
    },
  }),

  getters: {
    totalPages: (state) => Math.ceil(state.total / state.filters.limit),

    currentParams: (state): IClientsQuery => {
      const query: IClientsQuery = {
        page: state.filters.page,
        limit: state.filters.limit,
        sortBy: state.filters.sortBy,
        sortOrder: state.filters.sortOrder,
      }

      if (state.filters.selectedState) query.state = state.filters.selectedState
      if (state.filters.searchName) query.name = state.filters.searchName

      return query
    },
  },

  actions: {
    async fetchClients(): Promise<void> {
      this.loadingClients = true
      try {
        const { data } = await $api.get<IClientsResponse>('clients', {
          params: this.currentParams,
        })
        this.clients = data.data
        this.total = data.total
      } catch {
        useAlertsStore().addAlert('Erro ao carregar clientes. Tente novamente.')
        this.clients = []
        this.total = 0
      } finally {
        this.loadingClients = false
      }
    },

    async fetchStates(): Promise<void> {
      this.loadingStates = true
      try {
        const { data } = await $api.get<string[]>('clients/states')
        this.states = data
      } catch {
        useAlertsStore().addAlert('Erro ao carregar estados.')
      } finally {
        this.loadingStates = false
      }
    },

    async fetchClientById(id: number): Promise<void> {
      this.loadingClient = true
      try {
        const { data } = await $api.get<IClient>(`clients/${id}`)
        this.selectedClient = data
      } catch {
        useAlertsStore().addAlert('Erro ao carregar cliente.')
      } finally {
        this.loadingClient = false
      }
    },

    setPage(page: number): void {
      this.filters.page = page
      this.fetchClients()
    },

    setFilter(state: string): void {
      this.filters.selectedState = state
      this.filters.page = 1
      this.fetchClients()
    },

    setSearch(name: string): void {
      this.filters.searchName = name
      this.filters.page = 1
      this.fetchClients()
    },

    setSort(by: 'name' | 'registeredAt', order: 'asc' | 'desc'): void {
      this.filters.sortBy = by
      this.filters.sortOrder = order
      this.filters.page = 1
      this.fetchClients()
    },

    onLimitChange(limit: number): void {
      this.filters.limit = limit
      this.filters.page = 1
      this.fetchClients()
    },

    selectClient(client: IClient): void {
      this.selectedClient = client
    },

    clearSelectedClient(): void {
      this.selectedClient = null
    },
  },
})

export default useClientsStore
