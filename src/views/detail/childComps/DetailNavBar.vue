<template>
 <div class="detail-nav-bar">
   <nav-bar>
     <div slot="left" class="back" @click="backClick">
       <img src="@/assets/img/common/back.svg" alt="" >
     </div>
     <div slot="center" class="title">
       <div v-for="(item,index) in title"
            @click="navClick(index)"
            :class="{Active:index===currentIndex}"
            class="title-item" >{{item}}</div>
     </div>
   </nav-bar>
 </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
export default {
  name: "DetailNavBar",
  components:{
    NavBar
  },
  data(){
    return {
      title:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    navClick(index){
      this.currentIndex = index
      this.$emit('detailNavClick',index)
    },
    backClick(){
      // this.$router.back()
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  *{
  box-sizing: border-box
  }
  .title{
    display: flex;
    font-size: 13px;
  }
  .title-item{
    flex: 1
  }
  .Active{
    color: var(--color-tint);
  }
  .back{
    height: 45px;
  }
  img{
    padding-top: 13px
  }
</style>
