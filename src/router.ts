import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import ShoppingItems from './views/ShoppingItems.vue';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        title: 'Dashboard',
        logoWord: 'app',
      },
    },
    {
      path: '/shoppingItems',
      name: 'shoppingItems',
      component: ShoppingItems,
      meta: {
        title: 'Shopping',
        logoWord: 'shopping',
      },
    },
  ],
});

router.afterEach((to, from) => {
  document.title = to.meta.title + ' - Household App';
});


export default router;
