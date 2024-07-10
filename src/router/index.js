import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/solution',
      name: 'solution',
      component: () => import('../views/SolutionView.vue'),
    },
    {
      path: '/ButtonView',
      name: 'ButtonView',
      component: () => import('../views/ButtonView.vue'),
    },
  ],
});

export default router;
