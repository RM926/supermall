<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>
<script>
  export default{
      name:'TabBar',
  }
</script>
<style>
  #tab-bar{
    position:absolute;
    height: 49px;
    bottom: 0;
    left: 0;
    right: 0;
    display:flex;
    background-color: #f6f6f6;
    box-shadow:0px -1px 1px rgba(100,100,100,0.2);
    z-index: 9;
  }
</style>
