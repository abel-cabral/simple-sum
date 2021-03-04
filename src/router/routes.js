
const routes = [
  {
    path: '/',
    component: () => import('components/Main.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('components/Main.vue')
  }
]

export default routes
