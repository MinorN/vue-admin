<script lang="ts" setup>

const form = reactive({username:'',password:''})
</script>

<template>
  <div>
    <div class="input-wrapper">
      <el-row>欢迎来到vue-admin</el-row>
      <el-form>
        <el-form-item>
          <el-input v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper{
  width: 500px;
  min-height: 500px;
}
</style>
