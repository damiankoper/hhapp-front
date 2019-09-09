<template>
  <div class="h-list">
    <transition-group
      tag="div"
      :css="false"
      @leave="leave"
      style="overflow:hidden"
    >
      <slot />
    </transition-group>
    <transition name="empty">
      <div
        class="h-list__empty"
        v-if="empty"
      >
        <slot name="empty" />
      </div>
    </transition>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import anime from 'animejs';
@Component({})
export default class List extends Vue {
  @Prop({ default: true })
  public empty!: boolean;
  public async leave(el: HTMLElement, done: () => {}) {
    const elRect = el.getBoundingClientRect();
    el.style.height = elRect.height + 'px';
    el.style.pointerEvents = 'none';
    await anime({
      targets: el,
      height: 0,
      easing: 'cubicBezier(0.4, 0.0, 0.2, 1)',
      duration: 150,
    }).finished;
    done();
  }
}
</script>

<style lang='scss' scoped>
.h-list {
  overflow: {
    x: hide;
    y: scroll;
  }
  height: calc(100vh - 56px);
  &__empty {
    position:absolute;
    top:0;left:0;right:0;bottom:0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align:center;
    > *{
      max-width:320px;
    }
  }
}
.empty-enter-active,
.empty-leave-active{
  transition: opacity 0.15s;
}
.empty-enter,
.empty-leave-to{
  opacity: 0;
}
</style>