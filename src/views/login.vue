<script lang="ts" setup>
import useUserStore from '@/store/modules/user';
import type {FormInstance} from 'element-plus';

const userStore = useUserStore();

const router = useRouter();
const loading = ref(false);
// 登录功能
const form = reactive(
    {
      username: localStorage.getItem('username') || '',
      password: ''
    }
);
const loginRules = ref({
  username: {required: true, trigger: 'blur', message: '请输入用户名'},
  password: [
    {required: true, trigger: 'blur', message: '请输入密码'},
    {min: 6, max: 18, trigger: 'blur', message: '密码长度为6~18位'}
  ]
});
const loginFormRef = ref<FormInstance>();
const handleLogin = () => {
  loginFormRef.value && loginFormRef.value.validate((valid) => {
    loading.value = true;
    if (valid) {
      userStore.login(form).then((res) => {
        loading.value = false;
        router.push({path: '/'});
      });
    }
  });
};

// 试用账号登录
const testAccount = (account:string)=>{
  form.username = account
  form.password = '123456'
  handleLogin()
}


</script>

<template>
  <el-row align="middle" class="h-screen">
    <div class="input-wrapper">
      <el-row class="text-2xl mt-10" justify="center">欢迎来到vue-admin</el-row>
      <el-form :rules="loginRules" :model="form" class="w-2/3 mx-auto mt-5" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="用户名">
            <template #prefix>
              <el-icon>
                <UserFilled/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="密码" :show-password="true">
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-row justify="center" class="mt-5">
        <el-button type="primary" class="w-2/3" @click="handleLogin" :loading="loading">登录</el-button>
      </el-row>
      <el-row justify="center" class="mt-5">
        <el-row class="w-full" justify="center">演示账号一键登录</el-row>
        <el-row class="border-t w-2/3 pt-5 mt-2.5" justify="center">
          <el-button @click="testAccount('admin')">admin</el-button>
          <el-button @click="testAccount('test')">test</el-button>
        </el-row>
      </el-row>
    </div>
  </el-row>
</template>

<style lang="scss" scoped>
.input-wrapper {
  width: 500px;
  min-height: 400px;
  @apply mx-auto bg-white;
}
</style>
