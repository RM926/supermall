<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: "BackTop",
  data(){
    return{
      // isShow:false
    }
  },
  methods:{

  }
}
</script>

<style scoped>
  .back-top{
    position:fixed;
    bottom: 55px;
    right: 7px;
  }
  .back-top img{
    height: 43px;
    width: 43px;
  }
</style>
