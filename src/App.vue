<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './assets/style/variable.scss';
#app{
  background-color: $BgColor;
}
</style>

