<template>
  <div
    class="h-circle-click"
    @click="clicked"
    @mousedown="mousedown"
    ref="watcher"
  >
    <div
      class="h-circle-click__action"
      ref="action"
      :style="{backgroundColor: color}"
    ></div>
    <slot/>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import anime from 'animejs';
@Component({})
export default class CircleClick extends Vue {
  @Prop({default: 'red'})
  public color!: string;

  public animEnter?: anime.AnimeInstance;
  public animLeave?: anime.AnimeInstance;
  public async clicked(e: MouseEvent) {
    this.$emit('clicked', e);
  }
  public async mousedown(e: MouseEvent) {
    this.$emit('mousedown', e);

    if (this.animEnter && this.animLeave) {
      this.animEnter.pause();
      this.animLeave.pause();
    }

    const target = this.$refs.action as HTMLElement;
    const watcher = this.$refs.watcher as HTMLElement;
    const rect = watcher.getBoundingClientRect();
    const shift = rect.width / 2;
    target.style.width = rect.width + 'px';
    target.style.height = rect.width + 'px';
    target.style.opacity = '0.3';
    target.style.transform = `
      translateX(${e.clientX - rect.left - shift}px)
      translateY(${e.clientY - rect.top - rect.height / 2}px)
      scale(0)
    `;

    this.animEnter = anime({
      targets: target,
      scale: 2,
      easing: 'easeInQuad',
      duration: 150,
    });
    await this.animEnter.finished;
    this.animLeave = anime({
      targets: target,
      opacity: 0,
      easing: 'easeOutCubic',
      duration: 150,
    });
    await this.animLeave.finished;

  }
}
</script>

<style lang='scss' scoped>
.h-circle-click {
  overflow: hidden;
  position:relative;
  &__action {
    position: absolute;
    border-radius: 999px;
  }
  /deep/ *{
    z-index: 1;
  }
}
</style>