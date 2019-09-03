<template>
  <circle-click
    :color="colors['color-secondary-light']"
    class="h-list__list-item"
  >
    <div class="h-list__list-item__img">
      <img :src="img" />
    </div>
    <div class="h-list__list-item__text">
      <div class="primary">{{text}}</div>
      <div
        class="secondary"
        v-if="secondary"
      >{{secondary}}</div>
    </div>
    <div class="h-list__list-item__text">
      <i class="material-icons">more_vert</i>
    </div>
  </circle-click>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import CircleClick from '@/components/style/buttons/CircleClick.vue';
// tslint:disable-next-line
const colors = require("@/assets/scss/variables/_variables.scss");
@Component({
  components: {
    CircleClick,
  },
})
export default class ListItem extends Vue {
  @Prop()
  public text!: string;
  @Prop()
  public secondary!: string;
  @Prop()
  public img!: string;

  public colors = colors;
}
</script>

<style lang='scss' scoped>
.h-list__list-item {
  height: 7 * 8px;
  padding: 1 * 8px 2 * 8px;
  display: grid;
  grid-column-gap: 2 * 8px;
  grid-template-columns: 40px auto 24px;
  align-items: center;
  position: relative;

  &__img {
    @include square(40px, 999px);
    overflow: hidden;
    background-color: $color-primary-dark;
    display: grid;
    img {
      position: relative;
      margin: auto;
      width: 64%;
      height: 64%;
    }
  }
  &__text {
    .primary {
      font-size: 16px;
      color: $color-primary-text;
      line-height: 16px;
    }
    .secondary {
      font-size: 14px;
      color: $color-primary-text-light;
      line-height: 20px;
    }
  }
}
</style>