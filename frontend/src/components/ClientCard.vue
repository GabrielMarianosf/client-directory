<template>
  <v-card
    hover
    class="d-flex flex-column align-center pa-4 cursor-pointer"
    height="100%"
    @click="$router.push({ name: 'client', params: { id: client.id } })"
  >
    <v-avatar size="80" class="mb-3">
      <v-img :src="client.picture.large" :alt="client.fullName" />
    </v-avatar>

    <v-card-title class="text-subtitle-1 font-weight-bold text-center pa-0 mb-1">
      {{ client.fullName }}
    </v-card-title>

    <v-card-text class="text-center pa-0 text-body-2 text-medium-emphasis">
      <div>{{ client.address.street }}</div>
      <div>{{ client.address.city }}</div>
      <div>{{ client.address.state }} - CEP: {{ client.address.postcode }}</div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { IClient } from '@/types/client'

defineProps({
  client: {
    type: Object as () => IClient,
    required: true,
  },
})
</script>
