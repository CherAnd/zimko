
const routes = [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/note/:id',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/note'), props: true }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: () => import('layouts/public'),
    children: [
      { path: '', component: () => import('pages/login') }
    ],
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    component: () => import('layouts/public'),
    children: [
      { path: '', component: () => import('pages/register') }
    ],
    meta: { requiresAuth: false }
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
