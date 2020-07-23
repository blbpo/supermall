import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './action'
import getters from './getters'

//安装插件
Vue.use(Vuex)

const state = {
  cartList: []
}

//插件store对象
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

// 挂载vue实例上面
export default store



// mutations: {
//   //处理尽量单一事件
//   addCounter(state, payload) {
//     payload.count ++
//   },
//   addToCart(state, payload) {
//     state.cartList.push(payload)
//   }
//
// },
// actions: {
//   // actions处理逻辑
//   addCart(content, payload) {
//
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



// mutations: {
//   addCart(state, payload) {
//
//     let oldProduct = null;
//     for(let item of state.cartList) {
//       if(item.iid === payload.iid) {
//         oldProduct = item;
//       }
//     }
//
//     if(oldProduct) {
//       oldProduct.count +=1
//     }else {
//       payload.count = 1
//       state.cartList.push(payload)
//     }
//
//     console.log(oldProduct);
//   }
// }