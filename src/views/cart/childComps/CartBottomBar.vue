<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
              :is-checked="isAllSelect"
              class="check-button"
              @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate" @click="calculateClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>

  import CheckButton from 'components/content/checkbutton/CheckButton'
  import { mapGetters } from 'vuex'


  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters([
        'cartLength',
        'cartList'
      ]),
      totalPrice() {
        const cartList = this.$store.getters.cartList;
        return '￥'+ cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },

      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isAllSelect() {
        if(this.cartLength === 0) return false

        return !this.cartList.find(item => !item.checked)
      }
    },
    methods: {
      checkClick() {
        if(this.isAllSelect) {
          this.cartList.forEach(item => item.checked = false)
        } else {
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calculateClick() {
        if(!this.isAllSelect) {
          this.$toast.show('请选择购买商品',1000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;

    font-size: 14px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    /*width: 20px;*/
    /*height: 20px;*/
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: orange;
  }
</style>