import Vue from 'vue';
import Router from 'vue-router';
import datastore from './services/datastore';
import ContactList from './views/ContactList.vue';
import ContactView from './views/ContactView.vue';
import ContactEdit from './views/ContactEdit.vue';
import ContactNew from './views/ContactNew.vue';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import CreateAccount from './views/CreateAccount.vue';
import SelectGroup from './views/SelectGroup.vue';
import ForgotPassword from './views/ForgotPassword.vue';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
      path: '/create-account',
      component: CreateAccount,
      name: 'login'
    },
    {
      path: '/forgot-password',
      component: ForgotPassword,
      name: 'login'
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/select-group',
          component: SelectGroup,
          name: 'switch-account'
        },
        {
          path: ':group',
          component: ContactList,
          name: 'contactlist',
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: 'new',
              component: ContactNew,
              name: 'contactnew'
            },
            {
              path: ':id',
              component: ContactView,
              name: 'contactview'
            },
            {
              path: ':id/edit',
              component: ContactEdit,
              name: 'contactedit'
            },
          ]
        },
      ]
    }
  ],
});


router.beforeEach((to, from, next) => {
  const currentUser = datastore.getCurrentUser();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (!currentUser && requiresAuth) {
    next('/login');
  } else {
    next();
  }
});

export default router;
