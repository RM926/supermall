import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载导入组件
const Home = () => import('@/views/home/Home')
const Category = () => import('@/views/category/Category')
const Shopcart = () => import('@/views/shopcart/Shopcart')
const Profile = () => import('@/views/profile/profile')
const Detail = () => import('@/views/detail/Detail')
//1.安装插件
Vue.use(VueRouter)
//2.创建router
const routes = [
  {
    path:'',
    redirect:'/home',
  },
  {
    path:'/home',
    component:Home,
    meta:{
      title:'home'
    }
  },
  {
    path:'/category',
    component:Category,
    meta:{
      title:'category'
    }
  },
  {
    path:'/shopcart',
    component:Shopcart,
    meta:{
      title:'shopcart'
    }
  },
  {
    path:'/profile',
    component:Profile,
    meta:{
      title:'profile'
    }
  },
  {
    path:'/detail/:iid',
    component:Detail,
    meta:{
      title:'detail'
    }
  },

]
const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
