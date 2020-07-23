<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">
        购物车({{cartLength}})
      </div>
    </nav-bar>

    <cart-list />

    <cart-bottom-bar />
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  // import { sumTrue } from '../../common/utils'
  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    data() {
      return {
        counter: 0,

      }
    },
    // isAllSelect: false,
    // itemClick: null
    // mounted() {
    //
    //   this.$bus.$on('cartItemClick',() => {
    //     this.checkAllTrue()
    //
    //   },)
    //
    // },
    // activated() {
    //   this.checkAllTrue()
    // },
    computed: {
      ...mapGetters([
        'cartLength',
        'cartList'
      ])
    },
    // methods: {
    //   checkAllTrue() {
    //     let trueSum = 0
    //     trueSum = sumTrue(this.cartList);
    //     if(trueSum && trueSum === this.cartLength){
    //       this.isAllSelect = true
    //     }else {
    //       console.log(trueSum+' '+this.cartLength);
    //       this.isAllSelect = false
    //     }
    //   },
    //   cartBottomBar() {
    //     console.log('dsa11');
    //
    //     let trueSum = sumTrue(this.cartList);
    //
    //     let tempBoolean = true
    //
    //     if(trueSum && trueSum === this.cartLength){
    //       tempBoolean = false
    //     }
    //
    //     for( let i in this.cartList){
    //       this.cartList[i].checked = tempBoolean
    //     }
    //     this.isAllSelect = tempBoolean
    //   }
    // }
  }
</script>

<style scoped>

  .cart {
    height: 100vh;
    /*100vh 就是视窗高度*/
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    /*font-weight: 700;*/
  }
</style>