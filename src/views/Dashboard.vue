<template>
  <div class="dashboard">
    <top-bar />
    <list :empty="!dataComputed.length">
        <template v-for="(item, nth) in dataComputed">
          <div :key="item.id">
            <list-expand>
              <list-gestures :action-left="{
                icon: 'delete_outline',
                callback: () => remove(nth),
              }">
                <list-item
                  :text="item.text"
                  :secondary="item.secondary"
                  :img="item.img"
                />
                <template v-slot:body>body</template>
              </list-gestures>
            </list-expand>
            <div
              class="h-list__divider"
              v-if="nth+1!==dataComputed.length"
            ></div>
          </div>
        </template>
      <template v-slot:empty>
        <div class="empty">
          <i class="material-icons empty__icon">add_shopping_cart</i>
          <h5>List is empty</h5>
          <p>Save bought product and it<br>will show up here</p>
        </div>
      </template>
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
import ListGestures from '@/components/list/ListGestures.vue';
@Component({
  components: {
    BlockReveal,
    TopBar,
    List,
    ListItem,
    ListExpand,
    ListGestures,
  },
})
export default class Dashboard extends Vue {
  public public = true;
  public data = [
    {
      img: require('@/assets/icons/kettle.png'),
    },
    {
      img: require('@/assets/icons/dinner.png'),
    },
/*     {
      img: require('@/assets/icons/groceries.png'),
    },
    {
      img: require('@/assets/icons/latte.png'),
    },
    {
      img: require('@/assets/icons/soap.png'),
    },
    {
      img: require('@/assets/icons/kettle.png'),
    },
    {
      img: require('@/assets/icons/dinner.png'),
    },
    {
      img: require('@/assets/icons/groceries.png'),
    },
    {
      img: require('@/assets/icons/latte.png'),
    },
    {
      img: require('@/assets/icons/soap.png'),
    },
    {
      img: require('@/assets/icons/latte.png'),
    },
    {
      img: require('@/assets/icons/soap.png'),
    }, */
  ];

  get dataComputed() {
    let id = 1;
    return this.data.map((data: any) => {
      data.text = 'Title';
      data.secondary = 'secondary';
      data.id = data.id !== undefined ? data.id : id++;
      return data;
    });
  }
  public remove(nth: number) {
    this.data.splice(nth, 1);
  }
}
</script>
<style lang="scss" scoped>
.h-list {
  &__divider {
    height: 1px;
    box-sizing: border-box;
    margin-left: 40+16+16px;
    background-color: $color-primary-darker;
    position: relative;
  }
  .empty{
    &__icon{
      font-size:88px;
      color: $color-secondary-light
    }
  }
}
</style>
