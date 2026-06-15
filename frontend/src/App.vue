<template>
  <v-app>
    <AppHeader />
    <v-main>
      <RouterView />
    </v-main>
    <AppAlert />
  </v-app>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppAlert from '@/components/AppAlert.vue'
</script>
