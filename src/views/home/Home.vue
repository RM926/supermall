<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control  class="tab-control"
                  :class="{change:tabShow}"
                  ref="tabControl1"
                  :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  v-show="tabShow"/>
    <scroll class="wrapper" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :cbanners="banners"
                    @swiperImg="tabFixed"/>
      <recommend-view :crecommends="recommends"/>
      <feature-view></feature-view>
      <tab-control  ref="tabControl2"
                    :titles="['流行','新款','精选']"
                    @tabClick="tabClick"/>
      <goods-list :cgoods="goods[currentType].list" ></goods-list>
    </scroll>
    <back-top @click.native="backTop"
              v-show="isShow"/>
  </div>
</template>

<script>
import HomeSwiper from './childComps/homeSwiper'
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/featureView"
import NavBar from '@/components/common/navbar/NavBar'
import TabControl from "@/components/content/tabControl/TabControl"
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/content/backTop/BackTop'
import {getHomeMultidata,getHomeGoods} from "@/network/home";
import {itemListenerMixin} from "@/common/mixin";

export default{
  name:'Home',
  //在data中保留请求过来的信息
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      isShow:false,
      tabShow:false,
      tabTop:0,
      saveY:0,
    }
  },
  mixins:[itemListenerMixin],
  components:{
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    Scroll,
    BackTop,
    TabControl,
    GoodsList,
  },
  computed:{},

  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY)
  },
  deactivated(){
    //1.离开首页时保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
    //2.取消全局事件的监听,第一个参数是取消的事件，第二个是参数是取消调用的函数（图片加载页面刷新的函数）
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  created(){
    //created里面写的是组件创建完就调用的方法
    //1.请求多个数据,
    // 请求过来的数据res已经保存在created中了，直接引用res就可以
    this.getHomeMultidata()
    // 2.请求商品数据,这里只需传递一个种类参数，页面的+1和处理在mothods中处理。
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {

    // let newRefresh = debouce(this.$refs.scroll.refresh,100)
    // this.itemImgListener = () => {
    //   //这里为什么还要加小括号，在上面debouce中传入参数不是已经调用了吗？
    //     newRefresh()
    //   }
    //   this.$bus.$on('itemImageLoad',this.itemImgListener)
    //获取tab-control的offsetTop值
    //所有组件都有一个属性
    // console.log(this.$refs.tabControl.$el.offsetTop);
    //监听每一次图片加载完成
    // this.$bus.$on('itemImageLoad',() => {
    //     debounce(this.$refs.scroll.refresh(),100)
    // })
    //itemImageLoad是@load事件，每创建完一次改@load事件即调用一次
      //this.&bus.$on 是接收GoodsListItem.vue发射过来的事件，为了调用this.$refs.scroll.scroll中的refresh 方法
      // console.log(this.$refs.scroll.refresh);

  },
  methods:{
    tabFixed(){
      this.tabTop=this.$refs.tabControl2.$el.offsetTop
      console.log(this.$refs.tabControl2.$el.offsetTop)
    },
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    //回到顶部
    backTop(){
      //组件
      console.log(this.$refs.scroll);
      //组件中的BScroll对象
      // console.log(this.$refs.scroll.scroll);
      //组件中BScroll对象的方法
      // console.log(this.$refs.scroll.scroll.scrollTo);
      this.$refs.scroll.scrollTo(0,0)
    },
    //滚动位置
    contentScroll(position){
      // console.log(position)
      //1.backTop位置的记录
      // (-position.y>900)? this.isShow=true:this.isShow=false;
      this.isShow=(-position.y>900)
      //2.tab-control是否显示判断
      this.tabShow=(-position.y>this.tabTop)
    },
    //上拉加载更多
    loadMore(){
      // console.log('上拉加载更多....');
      this.getHomeGoods(this.currentType)
      // this.$refs.scroll.scroll.refresh()
    },

    // 网络请求获取数据的方法
     getHomeMultidata(){
      getHomeMultidata().then(res => {
        // console.log(res);
        // console.log(res.data.data.banner.list);
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;

      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res =>{
        // console.log(res);
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1
        // //刷新后再次刷新需要调用better-scroll中的finishPullUp方法
        // this.$refs.scroll.finishPullUp()
        setTimeout(() => {
          this.$refs.scroll.finishPullUp()
        },2000)
      })
    },
  }
  }
</script>
<style>
  #home{
    position:relative;
    height: 100vh;
    /*padding-top:44px;*/
  }
 .home-nav{
   background-color: var(--color-tint);
   color: #fff;
   /*position:fixed;*/
   /*left: 0;*/
   /*right: 0;*/
   /*top: 0;*/
   z-index: 9;
 }
  .tab-control{
    position: relative;
    background-color: #fff;
    z-index:9;
  }
  .wrapper {
    position: absolute;
    top: 45px;
    bottom:49px;
    right: 0;
    left: 0;
    /*height: 300px;*/
    overflow: hidden;
    /*background-color: red;*/
  }
  /*.changewrapper{*/
  /*  top: 50px;*/
  /*}*/
  .change{
    box-shadow: 0 -2px 1px rgba(255, 255, 255,1);
  }
  /*.tabControlShow{*/
  /*  position: fixed;*/
  /*  top:44px;*/
  /*  right: 0;*/
  /*  left: 0;*/
  /*}*/
</style>
