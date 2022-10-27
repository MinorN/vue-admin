<script lang="ts" setup>
import useUserStore from '@/store/modules/user';

const userStore = useUserStore();
</script>

<template>
  <div class="tool">
    <el-dropdown>
      <div class="avatar-wrapper">
        <el-avatar icon="UserFilled"/>
        <span>
          {{ userStore.username }}
        </span>
        <el-icon>
          <arrow-down />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item disabled>Action 4</el-dropdown-item>
          <el-dropdown-item divided>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.tool {
  @apply mr-5;
  .avatar-wrapper {
    @apply flex items-center;
    .el-avatar{
      @apply w-6 h-6;
    }
    >span{
      @apply ml-1;
    }
  }
}
</style>
