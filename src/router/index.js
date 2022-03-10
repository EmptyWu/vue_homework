import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '',
        component: () => import('../views/FrontEnd/IndexView.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/FrontEnd/ProductsView.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/FrontEnd/CartView.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/AdminViews/ProductsView.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/AdminViews/OrdersView.vue'),
      },
      { // 優惠碼
        path: 'coupons',
        component: () => import('../views/AdminViews/CouponsView.vue'),
      },
      {
        path: 'article',
        component: () => import('../views/AdminViews/ArticleView.vue'),
      },
    ],
  },
  {
    path: '/admin/:pathMatch(.*)*',
    redirect: '/login',
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/Page404View.vue'),
    // hidden: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
