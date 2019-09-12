<template>
  <div class="h-dropdown">
    <slot name="reference"/>
    <transition name="body">
      <div class="h-dropdown__body h-elevated-8" v-if="visible">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({})
export default class Dropdown extends Vue {
  @Prop({default: false})
  public visible!: boolean;

  public top = true;
  public bottom = false;
  public left = true;
  public right = false;
}
</script>

<style lang='scss' scoped>
.h-dropdown {
  position: relative;
  &__body {
    position: absolute;
    padding: 8px 0px;
    min-width: 112px;
    max-width: 280px;
    background: $color-primary;
    border-radius: 4px;
    z-index: 1;
    top: 90%;
    transition: transform opacity 0.25s;
    transform: 'scale(1)';
    opacity: 1;
    &--top {
      top: 0;
    }
    &--bottom {
      bottom: 0;
    }
    &--left {
      left: 0;
    }
    &--right {
      right: 0;
    }

    .body-leave-to, .body-enter {
      transform: 'scale(0.8)';
      opacity: 0;
    }

    &--top,
    &--left {
      transform-origin: top left;
    }
    &--top,
    &--right {
      transform-origin: top right;
    }
    &--bottom,
    &--left {
      transform-origin: bottom left;
    }
    &--bottom,
    &--right {
      transform-origin: bottom right;
    }
  }
}
</style>