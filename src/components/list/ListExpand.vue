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
        <div class="h-list-expand__body__container__header h-elevated-4">
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
        <div class="h-list-expand__body__container__content">
          <slot name="body" />
        </div>
      </div>
    </div>
    <div
      class="h-list-expand__content"
      ref="content"
      @click="expand"
    >
      <slot />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import IconButton from './../style/buttons/IconButton.vue';
import anime from 'animejs';
@Component({
  components: {
    IconButton,
  },
})
export default class ListExpand extends Vue {
  public expanded = false;
  @Prop({ default: 'Title' })
  public title!: string;

  public async expand() {
    const expand = this.$refs.expand as HTMLElement;
    const expandRect = expand.getBoundingClientRect();
    const content = this.$refs.content as HTMLElement;
    const expandContainer = this.$refs.expandContainer as HTMLElement;
    const expandBody = this.$refs.expandBody as HTMLElement;
    expandBody.style.width = expandRect.width + 'px';
    expandBody.style.height = expandRect.height + 'px';
    expandBody.style.top = expandRect.top + 'px';
    expandBody.style.left = expandRect.left + 'px';
    expandBody.style.opacity = '1';

    await new Promise((res) => setTimeout(res, 200));
    expandBody.classList.add('h-elevated-4');
    const a1 = anime({
      targets: expandBody,
      top: 0,
      height: '100vh',
      easing: 'cubicBezier(0.4, 0.0, 0.2, 1)',
      duration: 450,
      delay: 200,
    }).finished;
    const a2 = anime({
      targets: content,
      opacity: 0,
      translateY: '-100px',
      easing: 'cubicBezier(0.4, 0.0, 0.2, 1)',
      duration: 450,
      delay: 200,
    }).finished;
    const a3 = anime({
      targets: expandContainer,
      opacity: 1,
      easing: 'cubicBezier(0.4, 0.0, 0.2, 1)',
      duration: 450,
      delay: 200,
    }).finished;
    await a1;
    await a2;
    await a3;
  }
  public async shrink() {
    const expand = this.$refs.expand as HTMLElement;
    const expandRect = expand.getBoundingClientRect();
    const content = this.$refs.content as HTMLElement;
    const expandContainer = this.$refs.expandContainer as HTMLElement;
    const expandBody = this.$refs.expandBody as HTMLElement;
    const expandBodyRect = expandBody.getBoundingClientRect();

    const a1 = anime({
      targets: content,
      opacity: 1,
      translateY: '0',
      easing: 'cubicBezier(0.4, 0.0, 0.2, 1)',
      duration: 450,
      delay: 200,
    }).finished;
    expandBody.style.height = expandBodyRect.height + 'px';
    const a2 = anime({
      targets: expandBody,
      top: expandRect.top,
      height: expandRect.height,
      easing: 'cubicBezier(0.4, 0.0, 0.2, 1)',
      duration: 450,
      delay: 200,
    }).finished;
    const a3 = anime({
      targets: expandContainer,
      opacity: 0,
      easing: 'cubicBezier(0.4, 0.0, 0.2, 1)',
      duration: 450,
      delay: 200,
    }).finished;
    await a1;
    await a2;
    await a3;
    expandBody.classList.remove('h-elevated-4');
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
    transition: box-shadow 0.3s;
    transition-timing-function: cubicBezier(0.4, 0.0, 0.2, 1);
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
      }
      &__content {
      }
    }
  }
  &__content {
    position: relative;
    z-index: 3;
    cursor: pointer;
  }
}
</style>