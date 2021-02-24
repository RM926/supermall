<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  data(){
    return {
      scroll: null
    }
  },
  props:{
    probeType:{
      type: Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    },
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll.scrollTo(x,y,time)
    },
    // finishPullUp(){
    //   this.scroll.finishPullUp()
    // }
    //实时刷新
    refresh(){
      //添加this.scroll是为了判断更新图片之前scroll对象是否创建完成，防止创建较慢，出现找不到refresh方法。
      this.scroll && this.scroll.refresh()
      // console.log('jjjj');
    },
    //再次加载
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    //得到scroll的Y值
    getScrollY(){
      return this.scroll?this.scroll.y:0
    }
  },
  mounted(){
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      //获取位置这个属性必须得加上
      probeType:this.probeType,
      click:true,
      pullUpLoad:this.pullUpLoad,
    })
    // console.log(this.scroll);
      //监听滚动位置
    if(this.probeType === 2 || this.probeType === 3 ) {
      this.scroll.on('scroll',(position)=>{
        // console.log(position);
        this.$emit('scroll',position)
      })
    }

    // 上拉加载更多
    // 这一步仅仅只是监听前面的pullUpLoad的有没有到底的记录
    //到底的话就可以在首页调用this.getHomeGoods(this.currentType)，再从服务器中请求数据
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',() => {
        this.$emit('pullingUp')
      })
    }
  },
}
</script>
<style scoped>

</style>
