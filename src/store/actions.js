import {
  ADD_COUNTER,
  ADD_TO_CART,
} from './mutations-types'
export default {
  addCart(context,payload){
    return new Promise((resolve, reject)=>{
      //查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct){
        context.commit(ADD_COUNTER,oldProduct)
        resolve('当前商品数量+1')
      }else{
        payload.count =1
        //把payload写成了oldProduct，一直报iid未找到的错误，原因：在第一次走判断的时候，走else，怎么可以把 oldProduce
        //第一次返回的结果undefined插入到cartList数组中。。。。在下面使用find数组方法的时候当然就找不到iid了
        context.commit(ADD_TO_CART,payload)
        resolve('添加了新的商品')
      }
    })
  }
}
