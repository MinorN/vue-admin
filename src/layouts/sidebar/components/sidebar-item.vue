<script lang="ts" setup>
import SidebarItem from './sidebar-item.vue';

const props = defineProps(
    {
      item: {
        type: Object,
        required: true
      }
    }
);
</script>

<template>
  <div class="h-full">
    <router-link v-if="!item.children ||item.children.length===0" :to="item.path">
      <el-menu-item>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </router-link>
    <el-sub-menu v-else :index="item.path">
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
      <template v-for="route in item.children" :key="route.path">
        <SidebarItem :item="route"/>
      </template>
    </el-sub-menu>
  </div>
</template>

<style lang="scss" scoped>

</style>
