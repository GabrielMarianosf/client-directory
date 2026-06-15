<template>
  <v-card variant="outlined" class="pa-3 mb-4">
    <v-row align="center" no-gutters>
      <v-col cols="12" sm="auto" class="text-body-2 text-medium-emphasis text-no-wrap">
        Exibindo {{ store.clients.length }} de {{ store.total }} itens
      </v-col>

      <v-spacer class="d-none d-sm-block" />

      <v-col cols="12" sm="auto" class="d-flex align-center gap-3 mt-2 mt-sm-0">
        <v-text-field
          :model-value="store.filters.searchName"
          placeholder="Buscar por nome"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          class="mr-1"
          clearable
          hide-details
          style="min-width: 190px"
          @update:model-value="onSearch"
        />
        <v-select
          :model-value="store.filters.sortBy"
          :items="sortOptions"
          item-title="label"
          item-value="value"
          density="compact"
          variant="outlined"
          hide-details
          style="min-width: 130px"
          @update:model-value="(val) => store.setSort(val, store.filters.sortOrder)"
        />
        <v-btn
          :icon="store.filters.sortOrder === 'asc' ? 'mdi-sort-ascending' : 'mdi-sort-descending'"
          variant="text"
          density="compact"
          @click="toggleOrder"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import useClientsStore from '@/stores/clients'
import { useDebounceFn } from '@vueuse/core'

const store = useClientsStore()

const sortOptions = [
  { label: 'Nome', value: 'name' },
  { label: 'Cadastro', value: 'registeredAt' },
]

function toggleOrder(): void {
  const next = store.filters.sortOrder === 'asc' ? 'desc' : 'asc'
  store.setSort(store.filters.sortBy, next)
}

const onSearch = useDebounceFn((value: string) => {
  store.setSearch(value ?? '')
}, 400)
</script>
