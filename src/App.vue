<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class App extends Vue {}
</script>

<style lang="scss">
@import 'assets/scss/main_once.scss';


body {
  height: 100vh;
}

#app {

  color: #2c3e50;

  background: {
    //image: url("./assets/img/bg.jpg");
    color: rgba(255, 255, 255, 1);
    //blend-mode: screen;
    size: cover;
  }

  width: 100%;
  min-height: 100%;
  -webkit-tap-highlight-color: transparent;
}
</style>
