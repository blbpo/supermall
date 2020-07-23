<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"/>

    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">

      <!--<ul>-->
        <!--<li v-for="item in $store.state.cartList">{{item}}</li>-->
      <!--</ul>-->

      <detail-swiper :top-images="topImages" />

      <detail-base-info :goods="goods" />

      <detail-shop-info :shop="shop" />

      <detail-goods-info @imageLoad="imageLoad"
              :detail-info="detailInfo" />

      <detail-param-info ref="params" :param-info="paramInfo"/>

      <detail-comment-info ref="comment" :comment-info="commentInfo"/>

      <goods-list ref="recommend" :goods="recommends"/>

    </scroll>

    <detail-bottom-bar @addToCart="addToCart"/>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'
  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'


  import { getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import {debounce} from "../../common/utils";
  import {itemListenrMixin, backTopMixin} from "../../common/mixin";





  export default {
    name: "Detail",
    components: {
      DetailCommentInfo,
      DetailParamInfo,
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      GoodsList,
      DetailBottomBar,

    },
    mixins: [itemListenrMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTops: [],
        getThemeTops: null,
        currentIndexs: 0,
        curHeight: 0,

      }
    },
    created() {

      // 防抖
      this.getThemeTops = debounce(() => {

        this.themeTops = []
        this.themeTops.push(0)
        this.themeTops.push(this.$refs.params.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTops);

      },100)
    },
    mounted() {
      // 1.保存转入id
      this.iid = this.$route.params.iid

      // 2.根据id请求数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部轮播图
        const data = res.result

        console.log(data);

        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品详情数据
        this.detailInfo = data.detailInfo

        // 5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        // 6.取出详情信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })

      // 3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

    },
    destroyed() {
      // 取消全局事件监听
      this.$bus.$off('imageLoad',this.itemImagListener)

    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
        //console.log('刷新');

        this.getThemeTops()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTops[index], 500)
      },
      contentScroll(position) {
        this.curHeight = document.documentElement.clientHeight || document.body.clientHeight;
        this.curHeight *= 1.5
        this.isShowBackTop = -position.y > this.curHeight

        console.log(this.isShowBackTop);

        let positionY = -position.y + 44
        let currentIndex = 0
        for(let i = 1; i < 4 ; i++) {
          console.log(this.themeTops[i]);
          if(positionY >= this.themeTops[i]){
            currentIndex +=1
          }
        }
        if(this.currentIndexs != currentIndex){
          this.currentIndexs = currentIndex
          console.log(currentIndex);
          this.$refs.nav.currentIndex = this.currentIndexs
        }
      },
      addToCart() {
        // 1.获取购物车需要的信息

        const product = {}

        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.nowPrice;
        product.iid = this.iid;

        // 2.加入购物车
        // this.$store.commit('addCart', product)
        // console.log(product);

        // console.log(this.$store);
        this.$store.dispatch('addCart', product).then(res => {
          this.$toast.show(res,2000)
          // console.log(res);
        })
        // console.log('加入购物车');
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;

    /*等于100%视窗高度*/
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }
</style>