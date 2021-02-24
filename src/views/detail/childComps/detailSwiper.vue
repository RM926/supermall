<template>
  <div class="detail-swiper">
    <swiper>
      <swiper-item class="swiper-item" v-for='item in ctopImages'>
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from '@/components/common/swiper'
export default {
  name: "detailSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    ctopImages:{
      type:Array,
      default(){
        return []
      }
    },
  },
  created(){
    // console.log(this.ctopImages);
  }

}
</script>

<style scoped>
  .swiper-item{
    height: 300px;
    overflow: hidden;
    /*padding: 0 5px;*/
  }
</style>
