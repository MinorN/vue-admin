<script lang="ts" setup>
import useMenuStore from '@/store/modules/menu';
import sidebarItem from './components/sidebar-item.vue';

const menuStore = useMenuStore();
onMounted(() => {
  console.log(menuStore.allMenus);
  console.log(menuStore.sidebarMenus);
});
</script>

<template>
  <div class="sidebar-wrapper">
    <div v-for="(item,index) in menuStore.allMenus" :key="index">
      <el-menu>
        <sidebarItem :item="item"/>
      </el-menu>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-wrapper {
  width: var(--g-sidebar-width);
  height: 100%;
  @apply bg-white overflow-y-auto;
  .el-menu {
    @apply border-none;
  }
}
</style>
