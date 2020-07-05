import axios from "axios"; // 引入axios
import qs from "qs"; // 这个是axios里面的模块，用于序列化参数的。 看情况使用哦
import { getToken } from "./auth"   //获取到token

//创建一个axios实例
const service = axios.create({
   baseURL: process.env.VUE_APP_URL,
   timeout:5000,
   //transformRequest 这里主要是 post请求时 请求成功了，但是后台并没 
   //有获取到前端的请求参数。如果后台是直接从请求体里取的话，请忽略
   transformRequest:[
       data => {
           let params = qs.stringify(data, {indices: false})
           return params 
       }        
   ]   
})

let token = getToken(); //获取token

// 请求拦截器
service.interceptors.request.use(
    config => {
        if(token){
            //每次请求都需要带上token去请求接口
            config.headers['token'] = getToken()
        }
        return config
    },
    error => {
       return Promise.reject(error)
    }
)

//响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        if(res.code != 200){
            //这里主要是判断code值 等于什么，代表着token值失效 例如：50008
            if(res.code == 50008){
               MessageBox.confirm("token值失效，请重新登录",{
                  confirmButtonText: "返回登录页",
                  cancelButtonText: "取消",
                  type: "warning"
               }).then(() => {
                //退回到登录页 需要将sessionStorage里面的值给清空掉
                sessionStorage.clear() 
               })
           }
          return res
        }else{
          return res
        }
    },
    error => {
       return Promise.reject(error)
   }
)

export default service