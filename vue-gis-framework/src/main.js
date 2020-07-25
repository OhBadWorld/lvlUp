import Vue from 'vue';
import App from './App.vue';
import elemt from './lib/element';
import LMap from './lib/leaflet';
import VueEchart from './lib/echarts';
import router from './router';
import apiMethods from './lib/apis';
import mp from './lib/dateFormat';
import './assets/icon/iconfont.css';

Vue.config.productionTip = false;

Vue.use(elemt);
Vue.prototype.LMap = LMap;
Vue.use(VueEchart);
Vue.prototype.$apiMethods = apiMethods;
Vue.prototype.$mp = mp;

// 开启debug模式
Vue.config.debug = true;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
