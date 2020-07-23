<template>
  <div id="app">

    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>

    <main-ta-bar/>
  </div>
</template>

<script>

  import MainTaBar from 'components/content/mainTabbar/MainTabBar'

  export default {
    name: 'App',
    components: {
      MainTaBar
    }
  }
</script>

<style>
 @import "./assets/css/base.css";
</style>
