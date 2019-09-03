<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @before-leave="beforeLeave"
    @leave="leave"
    :css="false"
    :appear="appear"
  >
    <div
      class="block-reveal"
      v-if="revealed"
    >
      <div
        class="content"
        ref="content"
      >
        <slot />
      </div>
      <div
        class="background"
        ref="background"
        :style="{backgroundColor:options.color}"
      ></div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import anime from 'animejs';
interface BlockRevealOptions {
  delayed: number;
  duration: number;
  color: string;
}

@Component({})
export default class BlockReveal extends Vue {
  @Prop({ type: Boolean, required: true })
  public revealed!: boolean;
  @Prop({ default: false })
  public appear!: boolean;
  @Prop({
    default: () => ({
      delayed: 0,
      duration: 900,
      color: 'black',
    }),
  })
  public options!: BlockRevealOptions;

  public beforeEnter(element: HTMLElement) {
    const content = this.$refs.content as HTMLElement;
    const background = this.$refs.background as HTMLElement;
    content.style.visibility = 'hidden';
    background.style.right = '100%';
    background.style.left = '0%';
  }
  public async enter(element: HTMLElement, done: () => void) {
    const content = this.$refs.content as HTMLElement;
    const background = this.$refs.background as HTMLElement;
    await anime(
      this.animParams(background, { right: '0%', delay: this.options.delayed }),
    ).finished;
    content.style.visibility = 'visible';
    await anime(this.animParams(background, { left: '100%' })).finished;
    done();
  }
  public beforeLeave(element: HTMLElement) {
    const content = this.$refs.content as HTMLElement;
    const background = this.$refs.background as HTMLElement;
    content.style.visibility = 'visible';
    background.style.right = '0%';
    background.style.left = '100%';
  }
  public async leave(element: HTMLElement, done: () => void) {
    const content = this.$refs.content as HTMLElement;
    const background = this.$refs.background as HTMLElement;
    await anime(this.animParams(background, { left: '0%' })).finished;
    content.style.visibility = 'hidden';
    await anime(this.animParams(background, { right: '100%' })).finished;
    done();
  }

  public animParams(targets: HTMLElement, params: object) {
    return {
      targets,
      duration: this.options.duration / 2,
      easing: 'cubicBezier(0.65, 0.01, 0.41, 1)',
      ...params,
    };
  }
}
</script>

<style lang="scss" scoped>
.block-reveal {
  position: relative;
  display: inline-block;
  .content {
    display: inline-block;
  }
  .background {
    position: absolute;
    top: 0%;
    left: 0%;
    right: 100%;
    bottom: 0%;
  }
}
</style>