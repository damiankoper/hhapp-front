<template>
  <div
    class="h-circle-click"
    @click="click"
    @mousedown="mousedown"
    ref="watcher"
  >
    <div
      class="h-circle-click__action"
      ref="action"
      :style="{ backgroundColor: color }"
    ></div>
    <slot />
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import anime from 'animejs';
@Component({})
export default class CircleClick extends Vue {
  @Prop({ default: 'red' })
  public color!: string;
  @Prop({ default: false })
  public keepCircle!: boolean;

  public animEnter?: anime.AnimeInstance;
  public animLeave?: anime.AnimeInstance;
  public target!: HTMLElement;

  public mounted() {
    this.target = this.$refs.action as HTMLElement;
  }

  public async click(e: MouseEvent) {
    this.$emit('click', e);
  }

  public async mousedown(e: MouseEvent) {
    this.$emit('mousedown', e);
    if (this.animEnter) {
      this.animEnter.pause();
    }
    if (this.animLeave) {
      this.animLeave.pause();
    }

    const watcher = this.$refs.watcher as HTMLElement;
    const rect = watcher.getBoundingClientRect();
    const shift =
      rect.width / 2 + parseInt(window.getComputedStyle(watcher).paddingLeft || '0', 10);
    this.target.style.width = rect.width + 'px';
    this.target.style.height = rect.width + 'px';
    this.target.style.opacity = '1';
    this.target.style.transform = `
      translateX(${e.clientX - rect.left - shift}px)
      translateY(${e.clientY - rect.top - rect.height / 2}px)
      scale(0)`;

    this.animEnter = anime({
      targets: this.target,
      scale: 2,
      easing: 'easeInQuad',
      duration: 150,
    });
    await this.animEnter.finished;
    if (!this.keepCircle) {
      await this.hide();
    }
  }

  public async hide() {
    this.animLeave = anime({
      targets: this.target,
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
  position: relative;
  &__action {
    position: absolute;
    border-radius: 999px;
    pointer-events: none;
  }
  /deep/ * {
    z-index: 1;
  }
}
</style>