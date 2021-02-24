<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="imgShow" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{cgoodsItem.title}}</p>
      <span class="price">{{cgoodsItem.price}}</span>
      <span class="collect">{{cgoodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      cgoodsItem:{
        type: Object,
        default(){
         return {}
        }
      }
    },
    methods:{
      imageLoad(){
        this.$bus.$emit('itemImageLoad')

        //根据路由判断，发射事件
        //需要区分出事件发射的名称
        // if(this.$route.path.indexOf('/home')!==-1){
        //   this.$bus.$emit('homeitemImageLoad')
        // }else if(this.$route.path.indexOf('/detail')!==-1){
        //   this.$bus.$emit('detailitemImageLoad')
        // }
      },
      itemClick(){
        // console.log(this.cgoodsItem.iid);
        this.$router.push('/detail/' + this.cgoodsItem.iid)
      }
    },
    computed:{
      imgShow(){
        return this.cgoodsItem.image || this.cgoodsItem.show.img
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
