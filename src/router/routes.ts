// src/router/routes.ts
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    // MainLayout lazily imported to honour code‑splitting rules
    component: () => import('@/components/layout/MainLayout.vue')
  }
];

export default routes;
