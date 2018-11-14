import Vue from 'vue';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import './main.css';

Vue.component('Icon', Icon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
