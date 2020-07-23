<template>
  <div id="home">

    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control ref="tabControl_1"
                 :titles="['流行','新款','精选']"
                 v-show="isTabFixed"
                 @tabClick="tabClick" class="tab-control"/>

    <scroll class="content"
            ref="scroll" :probe-type="3"
            @scroll="contentScroll"
            @pullingUp="loadMore"
            :pull-up-load="true">

      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>

      <home-recommend-view :recommends="recommends" />

      <home-feature-view />

      <tab-control ref="tabControl_2"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"/>

      <goods-list :goods="showGoods"/>

    </scroll>


    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
  //子模块
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import HomeFeatureView from './childComps/HomeFeatureView'

  //公共模块
  import TabControl from 'content/tabControl/TabControl'
  import NavBar from 'common/navbar/NavBar'
  import GoodsList from 'content/goods/GoodsList'
  import Scroll from 'common/scroll/Scroll'

  import {
    getHomeMultidata,
    getHomeGoods
  } from "network/home";

  import {debounce} from "../../common/utils";
  import {itemListenrMixin, backTopMixin} from "../../common/mixin";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
      TabControl,
      NavBar,
      GoodsList,
      Scroll,

    },
    mixins: [itemListenrMixin, backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        tabOffsetTop: 557,
        isTabFixed: false,
        saveY: 0,
        curHeight: 0
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)

      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 1.保存Y值
      this.saveY = this.$refs.scroll.scroll.y

      // 2.取消全局事件监听
      this.$bus.$off('imageLoad',this.itemImagListener)

    },
    created() {
      //console.log('----');
      // 1.请求多个数据
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },
    mounted() {
      // 获取tabControld的offsetTop
      // 所以组件都有一个属性 $el 用于获取组件中的元素

      // this.$refs.tabControl.$el


    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {

      // 事件请求相关方法
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break

        }
        this.$refs.tabControl_1.currentIndex = index;
        this.$refs.tabControl_2.currentIndex = index;
      },

      contentScroll(position) {
        //判断backTop是否显示
        // 获取屏幕高度 document.documentElement.clientHeight || document.body.clientHeight;
        this.curHeight = document.documentElement.clientHeight || document.body.clientHeight;
        this.curHeight *= 1.5
        this.isShowBackTop = -position.y > this.curHeight

        // 决定tabControl是否吸顶
        this.isTabFixed = (-position.y) >this.tabOffsetTop
      },
      loadMore() {
        console.log('上拉加载更多');
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {

        this.tabOffsetTop=this.$refs.tabControl_2.$el.offsetTop;
        console.log(this.$refs.tabControl_2.$el.offsetTop);
      },


      // 网络请求相关方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          //console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {

        const page = this.goods[type].page + 1

        getHomeGoods(type,page).then(res => {
          //console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()


        })
      }
    }


  }
</script>

<!--scoped 作用域-->
<style scoped>
  #home {
    /*padding-top: 44px;*/
    position: relative;
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;


    /*浏览器原生滚动时，让导航栏不跟着滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top:0;*/
    /*z-index: 9;*/
  }

  /*.tab-control {*/
    /*position: sticky;*/
    /*top: 44px;*/
    /*z-index: 9;*/
  /*}*/

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }


  /*.content {*/
    /*height: calc(100% - 93px);*/
    /*overflow: hidden;*/
    /*margin-top: 44px;*/
  /*}*/

</style>