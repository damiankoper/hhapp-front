<template>
  <div class="dashboard">
    <top-bar />
    <list>
      <list-item
        text="Title"
        secondary="secondary"
        :img="require('@/assets/icons/kettle.png')"
      />
      <list-item
        text="Title"
        secondary="secondary"
        :img="require('@/assets/icons/dinner.png')"
      />
      <list-expand>
        <list-item
          text="Title"
          secondary="secondary"
          :img="require('@/assets/icons/groceries.png')"
        />
        <template v-slot:body>body</template>
      </list-expand>
      <list-item
        text="Title"
        secondary="secondary"
        :img="require('@/assets/icons/latte.png')"
      />
      <list-item
        text="Title"
        secondary="secondary"
        :img="require('@/assets/icons/soap.png')"
      />
    </list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BlockReveal from '@/components/style/BlockReveal.vue';
import TopBar from '@/components/navigation/TopBar.vue';
import List from '@/components/list/List.vue';
import ListItem from '@/components/list/ListItem.vue';
import ListExpand from '@/components/list/ListExpand.vue';
@Component({
  components: {
    BlockReveal,
    TopBar,
    List,
    ListItem,
    ListExpand,
  },
})
export default class Dashboard extends Vue {
  public revealed = true;
}
</script>
