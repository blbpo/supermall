import {debounce} from "./utils";
import BackTop from 'content/backTop/BackTop'

export const itemListenrMixin = {
  data() {
    return {

      itemImagListener: null
    }
  },
  mounted() {
    // 监听图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 50);

    //                        回调函数
    this.itemImagListener = () => {
      refresh()
    }

    this.$bus.$on('imageLoad',this.itemImagListener)

  }
}

export const backTopMixin = {
  data: function () {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      console.log('backClick');
      this.$refs.scroll.scrollTo(0,0,500);
    }
  }
}
