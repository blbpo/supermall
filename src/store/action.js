import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types";


export default {
    addCart(content, payload) {
     return new Promise((resolve, reject) => {

       let oldProduct = null;
       for(let item of content.state.cartList) {
         if(item.iid === payload.iid) {
           oldProduct = item;
         }
       }
       if(oldProduct) {
         // oldProduct.count +=1
         content.commit(ADD_COUNTER, oldProduct)

         resolve('商品数量+1')
       }else {
         payload.count = 1
         //content.state.cartList.push(payload)
         content.commit(ADD_TO_CART, payload)

         resolve('添加新的商品')
       }
     })
  }
}




// export default {
//   addCart(content, payload) {
//     let oldProduct = null;
//     for(let item of content.state.cartList) {
//       if(item.iid === payload.iid) {
//         oldProduct = item;
//       }
//     }
//     if(oldProduct) {
//       // oldProduct.count +=1
//       content.commit('addCounter', oldProduct)
//     }else {
//       payload.count = 1
//       //content.state.cartList.push(payload)
//       content.commit('addToCart', payload)
//     }
//   }
// }
