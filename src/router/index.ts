import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes.ts'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

export default router
