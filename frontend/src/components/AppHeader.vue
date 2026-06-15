<template>
  <v-app-bar color="primary" elevation="1" height="64">
    <v-container class="d-flex align-center justify-space-between h-100">
      <img
        src="https://www.camara.leg.br/tema/assets/images/logo-200-anos.png"
        height="44"
        alt="Câmara dos Deputados"
      />

      <v-btn
        :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        variant="text"
        color="white"
        @click="toggleTheme"
      />
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

const isDark = computed(() => theme.global.name.value === 'dark')

function toggleTheme(): void {
  theme.change(isDark.value ? 'light' : 'dark')
}
</script>
