<template>
  <div class="tab-control">
    <div  v-for="(item,index) in titles"
          @click="itemClick(index)" class="tab-control-item"
          :class="{Active:index===currentIndex}">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data(){
      return{
        currentIndex:0,
      }
    },
    props:{
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex=index
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display:flex;
    text-align:center;
    height: 44px;
    line-height: 44px;
    font-size: 15px;
    z-index: 9;
  }
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span{
    padding: 10px 5px 4px;
  }
 .Active{
   color: var(--color-high-text);
 }
 .Active span{
   border-bottom: 3px solid var(--color-tint);
 }
</style>
