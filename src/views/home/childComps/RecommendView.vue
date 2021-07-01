<template>
  <div class="recommend">
    <div v-for="(item,index) in crecommends" class="recommend-item" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props:{
    crecommends:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommend{
    display:flex;
    text-align: center;
    width:100%;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
  }
  .recommend-item{
    flex: 1;
    height: 25%;
    width: 25%;
  }
  .recommend-item img{
    height: 70%;
    width: 70%;
    margin-bottom:10px
  }

</style>
