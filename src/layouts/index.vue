<script lang="ts" setup>
import Header from './header/index.vue';
import sideBar from './sidebar/index.vue';
</script>

<template>
  <div class="layout">
    <Header/>
    <div class="main-wrapper">
      <sideBar class="border"/>
      <div class="main">
        <router-view #defalut="{Component,route}">
          <component :is="Component" :key="route.fullPath"></component>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  height: 100%;

  .main-wrapper {
    height: calc(100% - var(--g-header-height));
    @apply flex;
  }
}
</style>
