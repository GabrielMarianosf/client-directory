<template>
  <v-container class="pa-6">
    <v-btn variant="text" prepend-icon="mdi-arrow-left" class="mb-4" @click="$router.back()">
      Voltar
    </v-btn>

    <v-skeleton-loader v-if="store.loadingClient" type="card" />

    <v-card v-else-if="store.selectedClient" class="pa-6">
      <div class="d-flex align-center gap-4 mb-6">
        <v-avatar size="100">
          <v-img :src="store.selectedClient.picture.large" />
        </v-avatar>
        <div>
          <h2 class="text-h5 font-weight-bold">{{ store.selectedClient.fullName }}</h2>
          <span class="text-body-2 text-medium-emphasis">{{ store.selectedClient.email }}</span>
        </div>
      </div>

      <v-divider class="mb-4" />

      <v-row>
        <v-col cols="12" sm="6">
          <div class="text-overline text-medium-emphasis mb-1">Endereço</div>
          <div>{{ store.selectedClient.address.street }}</div>
          <div>{{ store.selectedClient.address.city }}</div>
          <div>
            {{ store.selectedClient.address.state }} - CEP:
            {{ store.selectedClient.address.postcode }}
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-overline text-medium-emphasis mb-1">Contato</div>
          <div>{{ store.selectedClient.phone }}</div>
          <div>{{ store.selectedClient.cell }}</div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-overline text-medium-emphasis mb-1">Data de nascimento</div>
          <div>
            {{ formatDate(store.selectedClient.birthDate.date) }} ({{
              store.selectedClient.birthDate.age
            }}
            anos)
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-overline text-medium-emphasis mb-1">Cadastrado há</div>
          <div>{{ store.selectedClient.registered.yearsRegistered }} anos</div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import useClientsStore from '@/stores/clients'

const route = useRoute()
const store = useClientsStore()

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('pt-BR')
}

onMounted(() => {
  store.fetchClientById(Number(route.params.id))
})
</script>
