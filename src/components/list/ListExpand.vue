<template>
  <div
    class="h-list-expand"
    ref="expand"
  >
    <div
      class="h-list-expand__body"
      ref="expandBody"
    >
      <div
        class="h-list-expand__body__container"
        ref="expandContainer"
      >
        <div
          class="h-list-expand__body__container__header h-elevated-4"
          v-if="expanded"
        >
          <div
            style="margin-left: -8px;"
            @click="shrink"
          >
            <icon-button>
              arrow_back
            </icon-button>
          </div>
          <div>
            {{title}}
          </div>
        </div>
        <div
          class="h-list-expand__body__container__content"
          v-if="expanded"
        >
          <slot name="body" />
        </div>
      </div>
    </div>
    <div
      class="h-list-expand__content"
      ref="content"
    >
      <slot />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import IconButton from './../style/buttons/IconButton.vue';
import anime from 'animejs';
import Hammer from 'hammerjs';
@Component({
  components: {
    IconButton,
  },
})
export default class ListExpand extends Vue {
  public expanded = false;
  @Prop({ default: 'Title' })
  public title!: string;
  public a1?: anime.AnimeInstance;
  public a2?: anime.AnimeInstance;
  public a3?: anime.AnimeInstance;

  public mounted() {
    const mc = new Hammer(this.$refs.content as HTMLElement);
    mc.on('tap', this.expand);
  }

  public async expand() {
    this.expanded = true;
    const expand = this.$refs.expand as HTMLElement;
    const expandRect = expand.getBoundingClientRect();
    const content = this.$refs.content as HTMLElement;
    const expandContainer = this.$refs.expandContainer as HTMLElement;
    const expandBody = this.$refs.expandBody as HTMLElement;
    this.stopAll();
    expandBody.style.width = expandRect.width + 'px';
    expandBody.style.height = expandRect.height + 'px';
    expandBody.style.top = expandRect.top + 'px';
    expandBody.style.left = expandRect.left + 'px';
    expandBody.style.opacity = '1';
    await new Promise((res) => setTimeout(res, 150));
    expandBody.style.zIndex = '3';
    content.style.zIndex = '4';
    expandBody.classList.add('h-elevated-4');
    this.a1 = anime({
      targets: expandBody,
      top: 0,
      height: '100vh',
      easing: 'cubicBezier(0.4, 0.0, 0.2, 1)',
      duration: 300,
      delay: 150,
    });
    this.a2 = anime({
      targets: content,
      opacity: 0,
      translateY: Math.min(
        Math.max((expandRect.top / 100 - 1) * -100, -100),
        0,
      ),
      easing: 'cubicBezier(0.4, 0.0, 0.2, 1)',
      duration: 300,
      delay: 150,
    });
    this.a3 = anime({
      targets: expandContainer,
      opacity: 1,
      easing: 'cubicBezier(0.4, 0.0, 0.2, 1)',
      duration: 300,
      delay: 150,
    });
    await this.awaitAll();
  }
  public async shrink() {
    const expand = this.$refs.expand as HTMLElement;
    const expandRect = expand.getBoundingClientRect();
    const content = this.$refs.content as HTMLElement;
    const expandContainer = this.$refs.expandContainer as HTMLElement;
    const expandBody = this.$refs.expandBody as HTMLElement;
    const expandBodyRect = expandBody.getBoundingClientRect();
    this.stopAll();

    this.a1 = anime({
      targets: content,
      opacity: 1,
      translateY: '0',
      easing: 'cubicBezier(0.4, 0.0, 0.2, 1)',
      duration: 250,
      delay: 200,
    });
    expandBody.style.height = expandBodyRect.height + 'px';
    this.a2 = anime({
      targets: expandBody,
      top: expandRect.top,
      height: expandRect.height,
      easing: 'cubicBezier(0.4, 0.0, 0.2, 1)',
      duration: 250,
      delay: 200,
    });
    this.a3 = anime({
      targets: expandContainer,
      opacity: 0,
      easing: 'cubicBezier(0.4, 0.0, 0.2, 1)',
      duration: 250,
      delay: 200,
    });
    await this.awaitAll();
    expandBody.classList.remove('h-elevated-4');
    await new Promise((res) => setTimeout(res, 150));
    expandBody.style.zIndex = '2';
    content.style.zIndex = '2';
    this.expanded = false;
  }
  public async awaitAll() {
    if (
      this.a1 !== undefined &&
      this.a2 !== undefined &&
      this.a3 !== undefined
    ) {
      await Promise.all([this.a1.finished, this.a2.finished, this.a3.finished]);
    }
  }
  public stopAll() {
    if (this.a1 && this.a2 && this.a3) {
      this.a1.pause();
      this.a2.pause();
      this.a3.pause();
    }
  }
}
</script>

<style lang='scss' scoped>
.h-list-expand {
  &__body {
    position: absolute;
    z-index: 2;
    background-color: $color-primary;
    opacity: 0;
    transition: box-shadow 0.15s;
    transition-timing-function: cubicBezier(0.4, 0, 0.2, 1);
    &__container {
      opacity: 0;
      &__header {
        height: 7 * 8px;
        background-color: $color-primary;
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 5 * 8px auto 5 * 8px;
        align-items: center;
        padding: 0 8 * 2px;
        z-index: 10;
      }
      &__content {
      }
    }
  }
  &__content {
    position: relative;
    z-index: 2;
    cursor: pointer;
  }
}
</style>