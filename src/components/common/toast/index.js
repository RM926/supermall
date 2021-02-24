import Toast from './Toast'
const obj ={}
//在main.js文件中导入obj对象，并执行Vue的use方法，进而执行obj的install函数(install是自定义函数,函数名字不能改)
//在入口文件main.js执行后就先将toast加到vue中
//函数中的Vue是自动传过来的
obj.install= function(Vue){
  //将Toast.vue挂载到Vue上
  //1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  //new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConstructor()
  //3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}
export default obj

