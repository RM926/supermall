import {debouce} from "@/common/utils";

export const itemListenerMixin = {
  data(){
    return {
      itemImgListener:null,
      newRefresh: null
    }
  },
  // mounted(){
  //如果调用newRefresh（）函数，由于形成了闭包结构，newRefresh（）会调用原来保存的的函数，而不是最先开始调用的函数。
  //就仅仅赋值一次
  //   const newRefresh = debouce(this.$refs.scroll.refresh,100)
  //   this.itemImgListener = () => {
  //     newRefresh()
  //   }
  //   this.$bus.$on('itemImageLoad',this.itemImgListener)
  //   // console.log('我是混入的内容');
  // },
  mounted(){
    this.newRefresh = debouce(this.$refs.scroll.refresh,100)
    this.itemImgListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)
  },
}

export const backTopMixin = {
  data(){
    return{
      isShow:false,

    }

  },
  methods:{

  }
}
