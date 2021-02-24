<template>
  <div class="bottom-nav">
      <div class="item-selector">
        <check-button class="all-click"
                      @click.native="allClick"
                      :is-check="isSelectAll" ref="checkImg">
        </check-button>
        <span>全选</span>
      </div>
      <div class="total">合计:￥{{totalPrice}}</div>
      <div class="to-add-up" @click="toAddUp">去计算({{totalLength}})</div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import {mapGetters} from 'vuex'
export default {
  name: "CartBottomNav",
  components: {
    CheckButton,
  },
  mounted() {
    // console.log(this.$refs.checkImg.$refs.img);
  },
  computed: {
    ...mapGetters(['cartLength']),
    totalPrice() {
      return this.$store.state.cartList.filter(item => item.checked === true).reduce((providePrice, item) => {
        return providePrice + item.count * item.price
      }, 0).toFixed(2)
    },
    totalLength() {
      return this.$store.state.cartList.filter(item => item.checked === true).reduce((provideLength, item) => {
        return provideLength + item.count
      }, 0)
    },
    isSelectAll(){
      if(this.cartLength===0) return false
      return this.$store.state.cartList.every(item =>item.checked === true)
    }
  },
  methods: {
    allClick() {
      if(this.cartLength===0){
        this.$toast.show('购物车为空')
      }
      if(this.isSelectAll){
        this.$store.state.cartList.forEach(item => item.checked=false)
      }else{
        this.$store.state.cartList.forEach(item=>item.checked=true)
      }
    },
    toAddUp(){
      if(this.cartLength===0){
        this.$toast.show('购物车为空')
      }else if(this.$store.state.cartList.every(item => item.checked===false)){
        this.$toast.show('请选择商品')
      }else{
        this.$toast.show('选了就能买吗？')
      }
    }
  },
}
</script>

<style scoped>
  .bottom-nav{
    position:fixed;
    bottom: 49px;
    left: 0;
    z-index:999;

    height:40px;
    width: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    background-color: #c7c6c6;
  }
  .item-selector{
    width:80px;
    display:flex;
    justify-content: center;
    align-items: center;
  }
  .item-selector span{
    padding-left: 3px;
  }
  .total{
    flex:1;
  }
  .to-add-up{
    height: 100%;
    padding: 0 10px;
    line-height:40px;
    color:#fff;
    background-color: #de6b6b;
  }
  .all-click{
    height: 19px;
    width: 20px;
  }

</style>
