<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {


      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      if(this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          // console.log(position);

          this.$emit('scroll', position)
        })
      }
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          let that = this;
          setTimeout(function () {
            that.$emit('pullingUp')
          }, 3000);
        })
      }
    },
    methods: {
      scrollTo(x, y, time=300) {
        //当this.scroll有值就去执行this.scroll.scrollTo this.scroll.scrollTo有值再执行下一个
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        console.log('-----');
        this.scroll && this.scroll.refresh()
      },
    }
  }
</script>

<style scoped>

</style>