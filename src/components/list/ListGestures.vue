<template>
  <div
    class="h-list-gestures"
    ref="gestures"
    @
  >
    <circle-click
      class="h-list-gestures__underlay"
      ref="underlay"
      :color="colors['color-secondary']"
      @click.stop
      :keep-circle="true"
    >
      <div>
        <i
          v-show="bodyLeft>0"
          class="h-list-gestures__underlay__action-left material-icons"
          ref="actionLeft"
        >{{actionLeft.icon}}</i>
      </div>
      <div></div>
      <div>
        <i
          v-show="bodyLeft<0"
          class="h-list-gestures__underlay__action-right material-icons"
          ref="actionRight"
        >{{finalActionRight.icon}}</i>
      </div>
    </circle-click>
    <div
      class="h-list-gestures__body"
      ref="body"
    >
      <slot />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import Hammer from 'hammerjs';
import anime from 'animejs';
import CircleClick from '@/components/style/buttons/CircleClick.vue';
import Color from 'color';
// tslint:disable-next-line
const colors = require("@/assets/scss/variables/_variables.scss");
interface Action {
  icon: string;
  callback: () => void;
}
@Component({
  components: { CircleClick },
})
export default class ListGestures extends Vue {
  @Prop()
  public actionRight!: Action;
  @Prop()
  public actionLeft!: Action;

  public panStartX: number = 0;
  public bodyLeft: number = 0;
  public started = false;
  public swiped = false;
  public shaked = false;
  public colors = colors;
  public body!: HTMLElement;
  public bodyRect!: ClientRect;
  public underlay!: HTMLElement;
  public underlayVue!: any;

  public mounted() {
    this.body = this.$refs.body as HTMLElement;
    this.underlay = (this.$refs.underlay as Vue).$el as HTMLElement;
    this.underlayVue = this.$refs.underlay as any;

    const gestures = this.$refs.gestures as HTMLElement;
    const mc = new Hammer(gestures);
    mc.on('panmove', this.onPanMove);
    mc.on('panstart', this.onPanStart);
    mc.on('panend', this.onPanEnd);
    mc.on('pancancel', this.onPanEnd);
    mc.on('swipe', this.onSwipe);
  }

  public async beforeDestroy() {
    await new Promise((res) => setTimeout(res, 1500));
  }

  get finalActionRight(): Action {
    return this.actionRight || this.actionLeft;
  }

  private async onPanMove(e: HammerInput) {
    if (this.started) {
      this.bodyLeft = this.panStartX + e.deltaX;
      this.body.style.left = this.bodyLeft + 'px';
      const alpha = Math.abs(Math.min(this.bodyLeft / 72, 1));
      this.underlay.style.backgroundColor = Color(
        colors['color-secondary-light'],
      )
        .alpha(alpha)
        .toString();
      if (Math.abs(this.bodyLeft) > 72) {
        await this.positionUpdate();
      }
    }
  }
  private async onPanStart(e: HammerInput) {
    this.started = true;
    this.panStartX = parseInt(
      (this.$refs.body as HTMLElement).style.left || '0',
      10,
    );
  }

  private async onPanEnd(e: HammerInput) {
    this.started = false;
    if (!this.swiped) {
      const body = this.$refs.body as HTMLElement;
      const underlay = (this.$refs.underlay as Vue).$el as HTMLElement;
      const a1 = anime({
        targets: body,
        left: '0%',
        easing: 'cubicBezier(0.0, 0.0, 0.2, 1)',
        duration: 200,
      });
      const a2 = anime({
        targets: underlay,
        backgroundColor: Color(colors['color-secondary-light'])
          .alpha(0)
          .toString(),
        easing: 'cubicBezier(0.0, 0.0, 0.2, 1)',
        duration: 200,
      });
      this.bodyLeft = 0;
      this.panStartX = 0;
      await a1;
      await a2;
      await this.resetShaked();
    }
    this.swiped = false;
  }
  private async resetShaked() {
    this.shaked = false;
    await (this.$refs.underlay as any).hide();
  }
  private async onSwipe(e: HammerInput) {
    this.swiped = true;
    const bodyRect = this.body.getBoundingClientRect();
    const a0 = this.positionUpdate();
    const a1 = anime({
      targets: this.underlay,
      backgroundColor: colors['color-secondary-light'],
      easing: 'cubicBezier(0.4, 0.0, 1, 1)',
      duration: 150,
    }).finished;
    const a2 = anime({
      targets: this.body,
      left: bodyRect.left > 0 ? '100%' : '-100%',
      easing: 'cubicBezier(0.4, 0.0, 1, 1)',
      duration: 150,
    }).finished;

    await a0;
    await a1;
    await a2;
    if (this.bodyLeft > 0) {
      this.actionLeft.callback();
    } else {
      this.finalActionRight.callback();
    }
  }
  // 5 32
  private async positionUpdate() {
    if (!this.shaked) {
      this.shaked = true;
      let elem;
      if (this.bodyLeft > 0) {
        elem = this.$refs.actionLeft as HTMLElement;
      } else {
        elem = this.$refs.actionRight as HTMLElement;
      }
      const elemRect = elem.getBoundingClientRect();
      const shift = elemRect.width / 2;
      this.underlayVue.mousedown({
        clientX: elemRect.left + shift,
        clientY: elemRect.top + shift,
      });
      return anime({
        targets: elem,
        scale: 1.2,
        easing: 'easeInQuad',
        direction: 'alternate',
        duration: 150,
      }).finished;
    }
    return Promise.resolve();
  }
}
</script>

<style lang='scss' scoped>
.h-list-gestures {
  position: relative;
  &__body {
    position: relative;
    z-index: 1;
  }
  &__underlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    color: $color-primary;
    display: grid;
    grid-template-columns: 56px auto 56px;
    align-items: center;
    justify-items: center;
    i {
      @include square(24px);
      padding: 16px;
      transform: "scale(1)";
    }
    &__action-left {
      margin-left: 16px;
    }
    &__action-right {
      margin-right: 16px;
      text-align: right;
    }
  }
}
</style>