<template>
  <div class="logo">
    <div>
      <block-reveal
        :revealed="true"
        :appear="true"
        :options="{color: '#f67b34', delayed: 0, duration: 900}"
      >
        <span class="orange">house</span>
        <span>hold</span>
      </block-reveal>
    </div>
    <div class="logo-word">
      <block-reveal
        :revealed="true"
        :appear="true"
        :options="{color: '#f89861',delayed: 400,duration: 500}"
      >
        <span>{{$route.meta.logoWord}}</span>
      </block-reveal>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BlockReveal from '@/components/style/BlockReveal.vue';
@Component({
  components: {
    BlockReveal,
  },
})
export default class Logo extends Vue {}
</script>

<style lang="scss" scoped>
.logo {
  text-transform: uppercase;
  font-weight: 800;
  font-size: 24px;

  span {
    color: $color-primary-text;
    &.orange {
      color: $color-secondary;
    }
  }
  .logo-word {
    font-size: 16px;
    margin-left:84px;
    position: relative;
    top:-3px;
  }
}
</style>