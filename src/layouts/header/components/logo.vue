<script lang="ts" setup>
import imgLogo from '@/assets/images/logo.png';

defineProps({
  title: {
    type: String,
    default: '首页'
  },
  showLogo:{
    type:Boolean,
    default:true
  },
  showTitle:{
    type:Boolean,
    default:true
  }
});
const logo = ref(imgLogo);

const to = computed(() => {
  return {name: 'home'};
});

</script>

<template>
  <router-link :to="to" class="logo">
    <img v-if="showLogo" :src="logo" class="img">
    <span v-if="showTitle">{{ title }}</span>
  </router-link>
</template>

<style lang="scss" scoped>
.logo{
  @apply flex justify-center items-center;
  .img{
    @apply w-7 h-7 mr-2.5;
  }
}
</style>
