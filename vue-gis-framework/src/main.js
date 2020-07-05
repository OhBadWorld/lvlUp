import Vue from 'vue';
import App from './App.vue';
import elemt from './lib/element';
import LMap from './lib/leaflet';
import router from './router';
import axios from 'axios';

Vue.config.productionTip = false;

Vue.use(elemt);
Vue.prototype.LMap = LMap;
Vue.prototype.$axios = axios;

//开启debug模式
Vue.config.debug = true;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
