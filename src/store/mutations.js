import {
  ADD_COUNTER,
  ADD_TO_CART,
} from './mutations-types'
export default {
    // addCart(state, payload) {
    //   //1.
    //   // console.log(payload);
    //   // if(state.cartList.length===0){
    //   //   state.cartList.push(payload)
    //   // }else{
    //   //   for (let i=0;i<state.cartList.length;i++){
    //   //     if (state.cartList[i].iid!==payload.iid){
    //   //       state.cartList.push(payload)
    //   //     }else{
    //   //       state.cartList[i].count++
    //   //     }
    //   //   }
    //   // }
    //   //2.01
    //   // let oldProduct = null
    //   // for(let item of state.cartList){
    //   //   if(item.iid === payload.iid){
    //   //     oldProduct = item
    //   //   }
    //   // }
    //   //2.02
    //   //这一步有遇到错误，在起初的时候将全等符号写成了赋值符号  =
    //   let product =state.cartList.find(item => item.iid === payload.iid)
    //   console.log(product);
    //   if(product){
    //     //这一步是不能实现的
    //     // payload.count += 1
    //     // console.log(product.count);
    //     product.count +=1
    //   }else{
    //     payload.count = 1
    //     state.cartList.push(payload)
    //
    //   }
    //
    // }

    [ADD_COUNTER](state,payload){
      payload.count++
    },
    [ADD_TO_CART](state,payload){
      // console.log(payload);
      payload.checked = true
      state.cartList.push(payload)
    }

}
