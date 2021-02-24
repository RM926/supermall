import axios from 'axios'

export function request(config){
  //1.创建axios实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5',
    timeout:2000
  })
  //2.axios的拦截器
  //2.1请求拦截
  // instance.interceptors.request.use(res => {
  //   console.log(res);
  // })
  // //2.2响应拦截
  // instance.interceptors.response.use(res =>{
  //   console.log(res);
  // },err =>{
  //   console.log(err);
  // })
  //3.发送真正的网络请求，返回的一个Promise,即instance（config）= Promise
  return instance(config)
}
