<template>
<div id="detail">
  <detail-nav-bar @detailNavClick="detailNavClick"
                  class="detail-nav-bar"
                  ref="navbar"/>
  <scroll class="wrapper"
          ref="scroll"
          @scroll="contentScroll"
          :probe-type="3">
    <detail-swiper :ctop-images="topImages"></detail-swiper>
    <detail-base-info :cgoods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info  :detail-info="detailInfo"
                        @imageLoad="imageLoad"></detail-goods-info>
    <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
    <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
    <goods-list ref="recommend" :cgoods="recommends"/>
  </scroll>
  <detail-bottom-bar @addToCart="addToCart"/>
  <back-top @click.native="backTop" v-show="isShow"/>
<!--  <toast :message="message" :is-show="isShowToast"/>-->
</div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import {getDetail,getRecommend,Goods,Shop,GoodsParam} from '@/network/detail'
import {itemListenerMixin} from '@/common/mixin'
import DetailSwiper from './childComps/detailSwiper'
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar"

import Scroll from '@/components/common/scroll/Scroll'
import GoodsList from '@/components/content/goods/GoodsList'
import BackTop from "@/components/content/backTop/BackTop";
import Toast from "@/components/common/toast/Toast"
export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
    DetailBottomBar,
    BackTop,
    // Toast
  },
  mixins:[itemListenerMixin],
  data(){
    return {
      iid: null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      currentIndex:0,
      // message:'',
      isShow:false,
      // isShowToast:false,
    }
  },
  mounted(){

  },
  created(){
    //1.保存传入的iid到data（）中，iid是在点击图片物品后获取（每个物品自身携带信息的属性）
    //通过动态绑定id跳转到拼接的/detail/：iid
    //再从当前活跃路由$route.params中获取到iid
    //在详情页再通过网络请求获取另一堆数据中相对应的iid
    // console.log(this.$route);
    // console.log(this.$route.params);
    this.iid =this.$route.params.iid
    //2.根据iid请求数据
    //每个商品的数据请求都是单独的，每打开一个商品就根据iid发送一次请求
    getDetail(this.iid).then(res => {
      // console.log(res)
      //分离请求到的iid数据
      //2.1获取顶部的图片轮播数据
      // console.log(res.data.result.itemInfo.topImages);
      this.topImages = res.data.result.itemInfo.topImages
      //2.2获取detail.js中整合的商品数据；其中，传入Goods中的三个参数都是对象
      this.goods =new Goods(res.data.result.itemInfo,res.data.result.columns,res.data.result.shopInfo.services)
      //2.3获取商家信息
      this.shop = new Shop(res.data.result.shopInfo)
      // 2.4获取图片信息
      this.detailInfo = res.data.result.detailInfo
      //2.5商品参数信息
      this.paramInfo = new GoodsParam(res.data.result.itemParams.info,res.data.result.itemParams.rule)
      //2.6取出评论信息
      if(res.data.result.rate.cRate!==0){
        this.commentInfo = res.data.result.rate.list[0]
        console.log(res.data.result.rate.list);
      }
      getRecommend().then(res => {
        this.recommends = res.data.data.list
        // console.log(res);
      })
    })
  },
  methods:{
    imageLoad(){
      // this.$refs.scroll.refresh()
      this.newRefresh()
      //内容与标题的联动效果 offsetTop的获取
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)

      // console.log(this.themeTopYs);
    },
    detailNavClick(index){
      // console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
    },
    contentScroll(position){
      // console.log(Math.trunc(position.y));
      //让positionY与themeTop[index]比较大小，得出i下标值
      //再让 i = crrentIndex
      const positionY = -position.y
      const length = this.themeTopYs.length
      //条件太多，为防止数组的下标值越界，解决的方法是可以给数组增加一个最大值。
      // for(let i =0 ;i< length;i++){
      //   if(this.currentIndex !== i && ((i < length - 1 && positionY > this.themeTopYs[parseInt(i)] && positionY < this.themeTopYs[parseInt(i+1)]) ||
      //     (i === length -1 && positionY > this.themeTopYs[parseInt(i)]))){
      //     this.currentIndex = i
      //     this.$refs.navbar.currentIndex = this.currentIndex
      //     // console.log(i);
      //   }
      // }
      for(let i =0 ;i< length - 1;i++){
        if(this.currentIndex !== i && positionY >= this.themeTopYs[parseInt(i)]){
          this.currentIndex = i
          this.$refs.navbar.currentIndex = this.currentIndex
        }
        this.isShow=(positionY>=1000)
      }
    },
    backTop(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
    addToCart(){
      //1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      //2.将商品保存到购物车当中
      //commit是传到mutations中
      //   this.$store.commit('addCart',product)
      //dispatch是传到actions中
      this.$store.dispatch('addCart',product).then(res =>{
      //   this.message = res
      //   this.isShowToast = true
      //   setTimeout(()=>{
      //     this.isShowToast = false
      //   },2000)
          this.$toast.show(res)
      })
    }
  },
  destroyed() {
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
}
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 555;
    background-color: #fff;
  }
  .detail-nav-bar{
    position: relative;
    /*background-color: #fff;*/
    z-index:555;
  }
  .wrapper{
    position:absolute;
    top:45px;
    bottom:49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
