<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    created() {
      // console.log(this.recommends);
    }
  }
</script>

<style scoped>

  .recommend {
    display: flex;
    text-align: center;

    padding: 15px 0 20px;

    border-bottom: 10px solid #eee;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img{
    width: 80%;
    margin: 10%;
  }

</style>