import Vue from 'vue';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon.vue';
import VuePikaday from '@enrian/vue-pikaday';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import './main.css';
import '@enrian/vue-pikaday/dist/vue-pikaday.min.css';

Vue.component('Icon', Icon);
Vue.use(VuePikaday);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
