<template>
  <v-container fluid class="pa-6">
    <h1 class="text-h5 font-weight-bold mb-6">Lista de clientes</h1>

    <v-row>
      <!-- Sidebar -->
      <v-col cols="12" md="3" lg="2">
        <ClientFilters />
      </v-col>

      <!-- Main -->
      <v-col cols="12" md="9" lg="10">
        <ClientsToolbar />

        <!-- Loading -->
        <v-row v-if="store.loadingClients" class="grid-scroll">
          <v-col v-for="n in store.filters.limit" :key="n" cols="12" sm="6" md="4">
            <v-skeleton-loader type="card" />
          </v-col>
        </v-row>

        <!-- Empty -->
        <v-empty-state
          v-else-if="!store.clients?.length"
          icon="mdi-account-search"
          title="Nenhum cliente encontrado"
          text="Tente ajustar os filtros ou a busca."
        />

        <!-- Grid -->
        <v-row v-else class="grid-scroll">
          <v-col v-for="client in store.clients ?? []" :key="client.id" cols="12" sm="6" md="4">
            <ClientCard :client="client" />
          </v-col>
        </v-row>

        <!-- Pagination -->
        <div
          class="d-flex flex-column flex-sm-row align-center justify-sm-space-between flex-wrap gap-3 mt-6 px-4"
        >
          <div class="d-flex align-center gap-2">
            <span class="text-body-2 text-medium-emphasis text-no-wrap mr-2"
              >Itens por página:</span
            >
            <v-select
              :model-value="store.filters.limit"
              :items="limitOptions"
              density="compact"
              variant="outlined"
              hide-details
              style="min-width: 90px"
              @update:model-value="store.onLimitChange"
            />
          </div>

          <v-pagination
            :model-value="store.filters.page"
            :length="store.totalPages"
            :total-visible="display.smAndUp.value ? 5 : 3"
            @update:model-value="store.setPage"
          />

          <span class="text-body-2 text-medium-emphasis text-no-wrap">
            {{ totalItems }} / {{ store.total }}
          </span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import useClientsStore from '@/stores/clients'
import ClientFilters from '@/components/ClientFilters.vue'
import ClientsToolbar from '@/components/ClientsToolbar.vue'
import ClientCard from '@/components/ClientCard.vue'
import { useDisplay } from 'vuetify'

const store = useClientsStore()

const display = useDisplay()

onMounted(() => {
  store.fetchClients()
  store.fetchStates()
})

const limitOptions = computed(() => {
  const defaults = [5, 10, 20, 50]
  if (!store.total) return defaults
  if (!defaults.includes(store.total)) defaults.push(store.total)
  return defaults
})

const totalItems = computed(() => {
  if (!store.total) return '0-0'
  const start = (store.filters.page - 1) * store.filters.limit + 1
  const end = Math.min(store.filters.page * store.filters.limit, store.total)
  return `${start}-${end}`
})
</script>

<style scoped>
.grid-scroll {
  max-height: calc(100vh - 470px);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
