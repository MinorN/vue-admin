<script lang="ts" setup>
import Logo from './components/logo.vue';
import Tool from './components/tool.vue';
import useMenuStore from '@/store/modules/menu';

const router = useRouter();
const route = useRoute();
const menuStore = useMenuStore();

const handleClick = (item) => {
  router.push({name: item.name});
};
</script>

<template>
  <header class="header-container">
    <div class="header-main">
      <Logo/>
      <div v-for="(item,index) in menuStore.allMenus" :key="index" class="header-nav" @click="handleClick(item)">
        <el-icon v-if="item.meta.icon">
          <component :is="item.meta.icon"/>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </div>
    </div>
    <Tool/>
  </header>
</template>

<style lang="scss" scoped>
.header-container {
  height: var(--g-header-height);
  background-color: #fff;
  @apply flex items-center;
  .header-main {
    @apply w-full pl-5 flex items-center;
    .header-nav {
      @apply ml-5 cursor-pointer inline-block;
    }
  }
}

</style>
