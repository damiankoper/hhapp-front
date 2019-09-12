<template>
  <circle-click
    class="h-dropdown__body__option"
    :color="colors['color-primary-dark']"
  >
    <div>
      <slot />
    </div>
  </circle-click>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import CircleClick from '../style/CircleClick.vue';
// tslint:disable-next-line
const colors = require("@/assets/scss/variables/_variables.scss");
@Component({
  components: {
    CircleClick,
  },
})
export default class DropdownOption extends Vue {
  public colors = colors;
}
</script>

<style lang='scss' scoped>
.h-dropdown {
  &__body {
    &__option {
      display: flex;
      align-items: center;
      height: 32px;
      padding: 0 16px;
      transition: background 0.15s;
      user-select: none;
      cursor: pointer;
      z-index: 2;
      &:hover {
        background-color: $color-primary-darker;
        transition: background 0.25s;
      }
    }
  }
}
</style>