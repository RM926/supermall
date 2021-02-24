<template>
  <div class="check-button" :class="{checked:isCheck}">
    <img src="@/assets/img/cart/tick.svg" alt="" ref="img">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props:{
    isCheck:{
      type:Boolean,
      default(){
        return false
      }
    }
  }
}
</script>

<style scoped>
  .check-button{
    border-radius: 50%;
    border: 2px solid #aaa;
  }
  .checked{
    background-color: red;
    border: 2px solid red;
  }
</style>
