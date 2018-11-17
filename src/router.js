import Vue from 'vue';
import Router from 'vue-router';
import ContactList from './views/ContactList.vue';
import ContactView from './views/ContactView.vue';
import ContactEdit from './views/ContactEdit.vue';
import ContactNew from './views/ContactNew.vue';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: ':group',
          component: ContactList,
          name: 'contactlist',
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
