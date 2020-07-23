<template>
  <div class="goodslist">
    <GoodsListItem
            v-for="(item,index) in goods"
            :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'

  import BScroll from 'better-scroll'

  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type:Array,
        default() {
          return [];
        }
      }
    },
    // data() {
    //   return {
    //     scroll:null
    //   }
    // },
    // mounted() {
    //   this.scroll =new  BScroll(this.$refs.aaaa,{
    //
    //   })
    // }
  }
</script>

<style scoped>
  .goodslist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }


</style>