<template>
  <div class="cart-list">
    <scroll class="wrapper" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList"
                      :itemInfo="item"
                      :key="index"/>
    </scroll>

  </div>
</template>

<script>
import CartListItem from "./CartListItem";
import {mapGetters} from 'vuex'
import Scroll from "@/components/common/scroll/Scroll";
export default {
  name: "CartList",
  components:{
    CartListItem,
    Scroll,
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }

}
</script>

<style scoped>
.wrapper{
  position: absolute;
  top: 45px;
  bottom:89px;
  right: 0;
  left: 0;
  overflow: hidden;
}
</style>
