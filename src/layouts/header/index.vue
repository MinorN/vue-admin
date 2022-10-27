<script lang="ts" setup>
import Logo from './components/logo.vue';
import useMenuStore from '@/store/modules/menu';

const router = useRouter();
const route = useRoute();
const menuStore = useMenuStore();

const handleClick = (item) => {
  console.log(item);
  router.push({name: item.name});
};
</script>

<template>
  <header>
    <div class="header-main">
      <Logo/>
      <div v-for="(item,index) in menuStore.allMenus" :key="index" class="header-nav" @click="handleClick(item)">
        <el-icon v-if="item.meta.icon">
          <component :is="item.meta.icon"/>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header-main {
  background-color: #fff;
  @apply w-full h-14 pl-5 flex items-center;
  .header-nav {
    @apply ml-5 cursor-pointer flex flex-col items-center;
  }
}
</style>
