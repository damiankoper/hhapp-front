<template>
  <div class="top-bar h-elevated-4">
    <div style="margin-left: -8px;">
    <icon-button>
      menu
    </icon-button>
    </div>
    <logo class="logo" />
    <div style="margin-left: 8px;">
<!--       <icon-button>
        more_horiz
      </icon-button> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Logo from './Logo.vue';
import IconButton from './../buttons/IconButton.vue';
@Component({
  components: {
    Logo,
    IconButton,
  },
})
export default class TopBar extends Vue {}
</script>

<style lang="scss" scoped>
.top-bar {
  /* position: fixed;
  top:0;
  left:0;
  right: 0; */
  height: 7 * 8px;
  background-color: $color-primary;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 5 * 8px auto 5 * 8px;
  align-items: center;
  padding: 0 8 * 2px;   
   z-index: 3;
   position: relative;
  .logo{
    grid: center;
    justify-self: center;
  }
}
</style>
