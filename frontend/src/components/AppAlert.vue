<template>
  <div>
    <v-snackbar
      v-for="alert in alertsStore.alerts"
      :key="alert.id"
      :color="alert.color"
      :timeout="alert.timeout"
      location="bottom right"
      model-value
      @update:model-value="alertsStore.removeAlert(alert.id)"
    >
      {{ alert.message }}

      <template #actions>
        <v-btn
          icon="mdi-close"
          variant="text"
          @click="alertsStore.removeAlert(alert.id)"
        />
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import useAlertsStore from '@/stores/alerts'

const alertsStore = useAlertsStore()
</script>
