import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(Router);

const routers = [
    {
    path: "/",
    name: "Home",
    component: Home
  }
];

const router = new Router({
  // mode: 'history',  // 打包的时候，注释掉
  routes: routers
});

export default router;