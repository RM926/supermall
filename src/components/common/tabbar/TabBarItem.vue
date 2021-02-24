<template>
  <div class="tab-bar-item" @click="itemActive">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!--<div v-bind:class="{active:isActive}"><slot name="item-text"></slot></div>-->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>
<script>
  export default{
    name:'TabBarItem',
    data(){
        return{
//            isActive:true,
        }
    },
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'red'
      }
    },
    computed:{
      isActive(){
          return this.$route.path.indexOf(this.path)!==-1
      },
      activeStyle(){
          return this.isActive?{color:this.activeColor}:{}
      }
    },
    methods:{
      itemActive(){
          return this.$router.replace(this.path)
      }
    }
  }
</script>
<style>
  .tab-bar-item{
    flex:1;
    text-align:center;
    height: 49px;
    font-size:12px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin:5px 0 3px 0;
  }
  /*.active{*/
    /*color:#FF5777;*/
  /*}*/
</style>
