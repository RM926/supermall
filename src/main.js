import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from '@/components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from "vue-lazyload";
 //安装toast插件
Vue.use(toast)

Vue.config.productionTip = false
//往vue的原型上添加一个属性值为vue实例的属性$bus(添加事件总线对象)

//解决移动端300ms延迟问题
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})

Vue.prototype.$bus = new Vue()
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
import axios from 'axios'
// axios.get('http://api.vikingship.xyz/api/columns').then(res => {
//   console.log(res)
// })
axios.get('http://apis.imooc.com/api/columns?icode=C6A6C4086133360B').then(res => {
  console.log(res)
})