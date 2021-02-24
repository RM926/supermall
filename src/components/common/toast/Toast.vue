<template>
  <div class="toast" v-show="isShow">{{message}}</div>
</template>

<script>
export default {
  name: "Toast",
  data(){
    return{
      isShow:false,
      message:''
    }
  },
  // props: {
  //   message: {
  //     type: String,
  //     default() {
  //       return ''
  //     }
  //   },
  //   isShow: {
  //     type: Boolean,
  //     default() {
  //       return false
  //     }
  //   }
  // },
  methods:{
    show(message,duration=1000){
      this.message = message
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      },duration)
    }
  }
}
</script>

<style scoped>
  .toast{
    position:fixed;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 10px 12px;
    font-size:15px;
    color:#fff;
    border-radius: 5px;
    background: rgba(0, 0, 0, .75);
    z-index:999;
  }
</style>
