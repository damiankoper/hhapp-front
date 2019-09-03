<template>
  <div class="h-list">
    <slot />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class List extends Vue {}
</script>

<style lang='scss' scoped>
</style>