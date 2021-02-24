<template>
  <div id="shop-cart">
    <!--  导航栏-->
    <nav-bar class="nav-bar"><div slot="center">购物车（{{cartLength}}）</div></nav-bar>
    <!--  商品列表-->
      <cart-list/>
    <!--  底部汇总-->
    <cart-bottom-nav/>
  </div>
</template>
<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomNav from "./childComps/CartBottomNav";
  import {mapGetters} from 'vuex'
  export default{
    name:'Shopcart',
    components:{
      NavBar,
      CartList,
      CartBottomNav,
    },
    computed:{
      //第一种写法：数组直接导入，但不可修改方法名
      ...mapGetters(['cartLength'])
      //第二种写法：对象导入，可以修改方法名
      // ...mapGetters({
      //   length:"cartLength"
      // })
    }
  }
</script>
<style scoped>
  #shop-cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }

</style>
