import axios from 'axios';

// 创建 axios 实例
const requests = axios.create({
  // baseURL: process.env.VUE_APP_API, // 基础url,如果是多环境配置这样写，也可以像下面一行的写死。
  // baseURL: 'http://168.192.0.123',
  // 如果设置了代理，那你本地开发环境的axios的baseUrl要写为''，即空字符串
  baseURL: '',
  timeout: 6000, // 请求超时时间
});

// request interceptor(请求拦截器)
// eslint-disable-next-line arrow-body-style
requests.interceptors.request.use((config) => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     config.headers['token'] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
  //   }
  return config;
// eslint-disable-next-line no-use-before-define
}, err);

// response interceptor（接收响应拦截器）
requests.interceptors.response.use((response) => {
  // debugger
  const res = response.data;
  if (res.code !== 0 && res.code !== 200) {
    // Notify({ type: 'danger', message: res.message||res.msg });
    // 401:未登录;
    if (res.code === 401 || res.code === 403) {
      // Notify({ type: 'danger', message: '请登录'});
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('error');
  // eslint-disable-next-line no-else-return
  } else {
    return res;
  }
// eslint-disable-next-line no-use-before-define
}, err);

// 错误处理函数
const err = (error) => {
  if (error.response) {
    // const data = error.response.data;
    if (error.response.status === 403) {
    //    Notify({ type: 'danger', message: data.message||data.msg });
    }
    if (error.response.status === 401) {
    //    Notify({ type: 'danger', message: '你没有权限。' });
    // if (token) {
    //   store.dispatch('Logout').then(() => {
    //     setTimeout(() => {
    //       window.location.reload()
    //     }, 1500)
    //   })
    // }
    }
  }
  return Promise.reject(error);
};

export default requests;
