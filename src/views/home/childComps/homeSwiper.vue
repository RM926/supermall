<template>
  <swiper>
    <swiper-item v-for="item in cbanners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperImgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from '@/components/common/swiper'
export default {
  name: "homeSwiper",
  data(){
    return{
      isFalse:true,
    }
  },
  props:{
    cbanners:{
      type:Array,
      default(){
        return []
      }
    },
  },
  components:{
    Swiper,SwiperItem
  },
  methods:{
    swiperImgLoad(){
      // console.log('图片加载完成。。。');
      //加一步判断
      if(this.isFalse){
        this.$emit('swiperImg')
        this.isFalse = !this.isFalse
      }

    }
  }
}
</script>

<style scoped>

</style>
