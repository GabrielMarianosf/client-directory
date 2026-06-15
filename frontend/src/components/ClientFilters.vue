<template>
  <v-card variant="outlined" class="pa-4">
    <div class="d-flex align-center justify-space-between mb-3">
      <span class="text-subtitle-2 font-weight-bold">Por Estado</span>
      <v-btn
        v-if="store.filters.selectedState"
        variant="text"
        size="small"
        color="error"
        class="pa-0"
        @click="store.setFilter('')"
      >
        Limpar
      </v-btn>
    </div>

    <v-skeleton-loader v-if="store.loadingStates" type="list-item@5" />

    <template v-else>
      <div class="filters-scroll">
        <v-checkbox
          v-for="state in visibleStates"
          :key="state"
          :label="state"
          :model-value="store.filters.selectedState === state"
          density="compact"
          hide-details
          class="mb-1"
          @update:model-value="toggleState(state)"
        />
      </div>

      <v-btn
        v-if="store.states.length > maxVisible"
        variant="text"
        size="small"
        class="mt-2 pa-0"
        @click="showAll = !showAll"
      >
        {{ showAll ? 'Ver menos' : 'Ver todos' }}
      </v-btn>
    </template>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import useClientsStore from '@/stores/clients'

const store = useClientsStore()
const showAll = ref(false)
const maxVisible = ref(5)

const visibleStates = computed(() =>
  showAll.value ? store.states : store.states.slice(0, maxVisible.value),
)

function toggleState(state: string): void {
  const next = store.filters.selectedState === state ? '' : state
  store.setFilter(next)
}
</script>

<style scoped>
.filters-scroll {
  max-height: calc(100vh - 420px);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
