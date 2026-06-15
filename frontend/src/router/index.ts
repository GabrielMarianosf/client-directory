import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/clients/:id',
      name: 'client',
      component: () => import('@/views/ClientView.vue'),
    },
  ],
})

export default router
