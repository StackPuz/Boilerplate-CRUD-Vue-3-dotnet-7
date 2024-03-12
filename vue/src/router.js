import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('./components/authen/Login.vue')
  },
  {
    path: '/logout',
    component: () => import('./components/authen/Logout.vue')
  },
  {
    path: '/resetPassword',
    component: () => import('./components/authen/ResetPassword.vue')
  },
  {
    path: '/changePassword/:token',
    component: () => import('./components/authen/ChangePassword.vue')
  },
  {
    path: '/',
    component: () => import('./components/Default.vue')
  },
  {
    path: '/home',
    component: () => import('./components/Home.vue')
  },
  {
    path: '/profile',
    component: () => import('./components/Profile.vue')
  },
  {
    path: '/userAccount',
    name: 'userAccount',
    component: () => import('./components/userAccount/Index.vue')
  },
  {
    path: '/userAccount/create',
    component: () => import('./components/userAccount/Create.vue')
  },
  {
    path: '/userAccount/:id/',
    component: () => import('./components/userAccount/Detail.vue')
  },
  {
    path: '/userAccount/edit/:id/',
    component: () => import('./components/userAccount/Edit.vue')
  },
  {
    path: '/userAccount/delete/:id/',
    component: () => import('./components/userAccount/Delete.vue')
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('./components/product/Index.vue')
  },
  {
    path: '/product/create',
    component: () => import('./components/product/Create.vue')
  },
  {
    path: '/product/:id/',
    component: () => import('./components/product/Detail.vue')
  },
  {
    path: '/product/edit/:id/',
    component: () => import('./components/product/Edit.vue')
  },
  {
    path: '/product/delete/:id/',
    component: () => import('./components/product/Delete.vue')
  },
  {
    path: '/brand',
    name: 'brand',
    component: () => import('./components/brand/Index.vue')
  },
  {
    path: '/brand/create',
    component: () => import('./components/brand/Create.vue')
  },
  {
    path: '/brand/:id/',
    component: () => import('./components/brand/Detail.vue')
  },
  {
    path: '/brand/edit/:id/',
    component: () => import('./components/brand/Edit.vue')
  },
  {
    path: '/brand/delete/:id/',
    component: () => import('./components/brand/Delete.vue')
  },
  {
    path: '/orderHeader',
    name: 'orderHeader',
    component: () => import('./components/orderHeader/Index.vue')
  },
  {
    path: '/orderHeader/create',
    component: () => import('./components/orderHeader/Create.vue')
  },
  {
    path: '/orderHeader/:id/',
    component: () => import('./components/orderHeader/Detail.vue')
  },
  {
    path: '/orderHeader/edit/:id/',
    component: () => import('./components/orderHeader/Edit.vue')
  },
  {
    path: '/orderHeader/delete/:id/',
    component: () => import('./components/orderHeader/Delete.vue')
  },
  {
    path: '/orderDetail/create',
    component: () => import('./components/orderDetail/Create.vue')
  },
  {
    path: '/orderDetail/edit/:orderId/:no/',
    component: () => import('./components/orderDetail/Edit.vue')
  },
  {
    path: '/orderDetail/delete/:orderId/:no/',
    component: () => import('./components/orderDetail/Delete.vue')
  },
  {
    path: '/:path(.*)',
    component: () => import('./components/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router