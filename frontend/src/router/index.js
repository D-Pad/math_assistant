import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/calculus',
      name: 'calculus',
      component: () => import('../views/calculus/MainView.vue'),
    },
    {
      path: '/trig',
      name: 'trigonometry',
      component: () => import('../views/trig/MainView.vue'),
    },
  ],
})

export default router
