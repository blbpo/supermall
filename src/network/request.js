//对网络进行一个包装
import axios from 'axios'

export function request(config) {

    //1.创建 axios 实例
    const instance = axios.create({
      baseURL: 'http://123.207.32.32:8000/api/wh',
      timeout: 5000
    })

    // 2.axios 拦截器
    // 1）请求拦截
    instance.interceptors.request.use(config => {
      // console.log(config);
      // 1.比如config中的一些信息需要更改

      // 2.比如每次发送请求,需要在界面现实一个请求图标

      // 3.比如网络请求（登入需要token），必须携带一些特殊信息
      return config;
    },err => {
      console.log(err);
    })

    // 2）响应拦截
    instance.interceptors.response.use(res =>{
      //console.log(res);

      return res.data;
    },err => {
      console.log(err);
    })

    // 3.发送网络请求
    return instance(config)
}