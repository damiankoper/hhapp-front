<template>
  <circle-click
    :color="colors['color-primary-dark']"
    class="h-icon-button"
    tabindex="0"
    @click="(e)=>$emit('click', e)"
  >
    <i class="h-icon-button__icon material-icons">
      <slot />
    </i>
  </circle-click>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CircleClick from '@/components/style/CircleClick.vue';
// tslint:disable-next-line
const colors = require("@/assets/scss/variables/_variables.scss");
@Component({ components: { CircleClick } })
export default class BlockReveal extends Vue {
  public colors = colors;
}
</script>
<style lang="scss" scoped>
.h-icon-button {
  background: none;
  border: none;
  outline: none;
  display: grid;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  @include square(5 * 8px, 999px);
  transition: background-color 0.3s;

  &__icon {
    margin: auto;
    position: relative;
  }
  &:hover {
    background-color: $color-primary-darker;
  }
  i {
    font-size: 24px;
    line-height: 24px;
    user-select: none;
  }
}
</style>
