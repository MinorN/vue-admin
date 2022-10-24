# 第一节

## 使用`vite`

这里我是用的是`yarn create vite`，选择的是`vue + typescript`

这里可以看官网教程来搭建

然后打开`main.ts`

```js
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
app.mount('#app')
```

[vite官网](https://cn.vitejs.dev/)

## 安装`sass(scss)`

`yarn add sass`即可

## 安装`tailwindcss`

这里，我选择使用`tailwindcss`来进行样式的编写，可以减少自己写样式的时间，同时可以更好的适配`dark`模式（本质上其实相当于定义了全局的class来进行书写）（但是这样写起来超爽！）

运行

`yarn add -D tailwindcss postcss autoprefixer`

`yarn tailwindcss init -p`

可以发现你的目录下多了两个文件（`tailwind.config.cjs`和`postcss.config.cjs`）

打开`tailwind.config,cjs`复制如下代码即可

```javascript
module.exports = {
    darkMode:'class',
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [],
}
```

注意：安装的`tailwindcss`要注意版本，目前`tailwindcss`中文网站版本和英文网站差了一个大版本，所以个人推荐最好看英文版官网（这可能是我唯一能看的懂得几个网站了）

[tailwind](https://tailwindcss.com/docs/guides/vite)

## 安装`Element Plus`

直接运行`yarn add element-plus`即可

然后打开`main.ts`

```js
// 引入Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

app.use(ElementPlus) // 注意放的位置
```

然后如果使用`Volar`

在`tsconfig.json`中添加如下

```json
{
    "compilerOptions": {
    // ...
    "types": ["element-plus/global"]
  }
}
```

再引入一下`Element Plus`的`Icon`

```js
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
```



这里有个小问题：我第一次是先安装的`ElementPlus`再安装的`tailwindcss`，但是一直安装不上，会报错，排查后，初步断定为先安装`ElementPlus`会将`Process`(好像是这个包)限制版本，但是`tailwindcss`需要这个包版本很高，所以导致安装不上，所以需要先安装`tailwindcss`后再安装`tailwindcss`

## 安装`Vue Router 4`

`yarn add vue-router@4`即可

接下来在`src`目录下新建目录`router`，`router`下新建`routers.ts`，

内容如下：

```js
const constRoutes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/components/HelloWorld.vue'),
        meta: {
            title: '首页'
        }
    },
];


export {
    constRoutes,
};

```

`router`下新建`index.ts`，

内容如下：

```js
import {createRouter, createWebHistory} from 'vue-router';
import {constRoutes} from './routers';

const router = createRouter({
    history: createWebHistory(),
    routes: constRoutes
});
export default router;
```

打开`main.ts`，加入如下代码：

```js
// 引入Vue Router
import router from './router';
app.use(router)
```

## 配置`@`路径

先安装`node：path`，运行`yarn add @types/node`

打开`vite.config.ts`，加入如下代码：

```js
import path from 'node:path'
export default defineConfig({
  resolve:{
    alias: {
      '@' : path.resolve(__dirname,'src')
    }
  }
})
```

(补)再打开`tsconfig.json`加入以下代码：

```json
"compilerOptions":{
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
}
// 不加会发现在使用@来引入，会无法导入模块
```

这样就可以使用`@`来快速引用文件路径了

## 安装`Pinia`

我们需要一个全局的状态管理库，这里我选择`Pinia`

选择它主要有两个原因：

1. `Pinia`是`Vue3`官方推荐（没错，官方让我们干什么就干什么）
2. `Pinia`对比`Vuex`来说，功能两者一样，`Pinia`写法简单，易于理解使用

运行`yarn add pinia`

然后我们在`src`目录下新建一个目录`store`，`store`下新建`index.ts`，内容如下：

```js
import {createPinia} from 'pinia';

const pinia = createPinia();

export default pinia
```

随后打开`main.ts`，加入以下代码：

```js
// 引入Vue Router
import router from './router';
app.use(pinia)
```



到此为止，目前我们可能用到的包都已经成功安装

# 第二节

## 登录页

先加上登录页路由，打开`router`下的`rouetrs.ts`

```js
const constRoutes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/components/HelloWorld.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue'),
        meta: {
            title: '登录',
            whiteList:true // 白名单，即不需要登录页可以访问
        }
    }
];


export {
    constRoutes,
};

```

然后我们怎么进入到登录页呢？一般来说，用户进来网址，比如：`http:127.0.0.1`下的时候，会先判断用户是否登录，如果登录了直接跳到首页，反之跳到登录页。

首页我们需要知道用户是否登录，在`store`目录下建立`modules`目录，`modules`目录下建立`uers.ts`，内容如下：

思考：我们需要存储用户的哪些信息？

1. 用户名：`username`
2. `token`
3. 失效时间：`fail_time`（总不能登陆上去就一直挂着吧）

```js
import {defineStore} from 'pinia';
const useUserStore = defineStore(
    'user',
    {
        state: () => ({
            username: localStorage.getItem('username') || '',
            token: localStorage.getItem('token') || '',
            fail_time: localStorage.getItem('fail_time') || ''
        }),
        getters: {
            isLogin: (state) => {
                let isLogin = false;
                if (state.token) {
                    if (new Date().getTime() < parseInt(state.fail_time) * 1000) {
                        isLogin = true;
                    }
                }
                return isLogin;
            }
        },
);

export default useUserStore;
```

然后需要在用户进入页面前判断是否登录，这时候就需要路由导航守卫了，打开`router`下的`index.ts`，加入以下代码：

```js
import userUserStore from '@/store/modules/user'
// 路由前置守卫
router.beforeEach(async (to,from,next)=>{
    const userStore = userUserStore()
    // 如果用户登陆了，就让往下继续走，
    // 如果用户未登录，判断用户去的界面是否为白名单界面，如果是白名单界面，允许访问，反之，跳转到登录页面
    if(userStore.isLogin){
        next()
    }else{
        if(!to?.meta?.whiteList){
            next({
                name:'login'
            })
        }else{
            next()
        }
    }
})
```

接下来开始可以写登录页代码了，我在写的过程中，因为用的是Vue3，很容易出现`ref`，`reactive`等`import`，这些多余的`import`对于代码来说都是冗余的，所以找了一个包来对`Vue`，`VueRouter`，`Pinia`等来进行全局的自动注册，无需再在每个`Vue`文件中去`import`,

[unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)

运行`yarn add -D unplugin-auto-import`，然后打开`vite.config.ts`加入以下代码：

```js
plugins: [
   AutoImport({
     imports: ['vue', 'vue-router', 'pinia'],
     dts: './src/auto-import.d.ts'
   }),
],
```

重新`yarn dev`，你就会发现你多了一个文件名为`auto-import.d.ts`的文件，这个文件就帮助我们全局注册了`Vue`，`VueRouter`，`Pinia`的一些常用`import`

我们还需要自己mock登录的接口，这里我是用的是`vite-plugin-mock`

运行`yarn add mockjs`和`yarn add vite-plugin-mock -D`，

然后再在修改`vite.config.ts`：

```js
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import {viteMockServe} from 'vite-plugin-mock';
import { UserConfigExport, ConfigEnv } from 'vite'
// 全局引入ref...等
import AutoImport from 'unplugin-auto-import/vite';


export default ({command}:ConfigEnv):UserConfigExport => {
    return defineConfig({
        plugins: [
            AutoImport({
                imports: ['vue', 'vue-router', 'pinia'],
                dts: './src/auto-import.d.ts'
            }),
            vue(),
            viteMockServe({
                // default
                mockPath: 'src/mock',
                localEnabled: command === 'serve',
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        }
    });
}

```

再引入一下`axios`：`yarn add axios`



好了，我们可以写`login.vue`了（我放在了`src/views`下），代码如下：

```vue
// 我这里在index.html里，修改了整个页面的背景色
// <div id="app" class="bg-slate-100"></div>
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
```

`api`目录下`index.ts`代码如下：

```js
import axios from 'axios';


const api = axios.create({
    baseURL: '/',
    timeout: 10000,
    responseType: 'json'
});


export default api
```

`store`目录下`user.ts`代码如下

```js
import {defineStore} from 'pinia';
import api from '@/api';

const useUserStore = defineStore(
    'user',
    {
        state: () => ({
            username: localStorage.getItem('username') || '',
            token: localStorage.getItem('token') || '',
            fail_time: localStorage.getItem('fail_time') || ''
        }),
        getters: {
            isLogin: (state) => {
                let isLogin = false;
                if (state.token) {
                    if (new Date().getTime() < parseInt(state.fail_time) * 1000) {
                        isLogin = true;
                    }
                }
                return isLogin;
            }
        },
        actions: {
            login(data: {
                username: string,
                password: string
            }) {
                return new Promise<void>((resolve, reject) => {
                    api.post('/mock/user/login', data).then(res => {
                        localStorage.setItem('username', res.data.data.username);
                        localStorage.setItem('token', res.data.data.token);
                        localStorage.setItem('fail_time', res.data.data.fail_time);
                        this.username = res.data.username;
                        this.token = res.data.token;
                        this.fail_time = res.data.fail_time;
                        resolve()
                    }).catch(error => {
                        reject(error);
                    });
                });
            }
        }
    }
);

export default useUserStore;
```

在`src`目录下新建`mock`目录，`mock`目录下新建`user.ts`(以后mock目录就放我们mock的接口)：

```js
export default [
    {
        url: '/mock/user/login',
        method: 'post',
        response: (option: any) => {
            return {
                error: '',
                status: 1,
                data: {
                    username: option.body.username,
                    token: '@string',
                    fail_time : Math.ceil(new Date().getTime() / 1000 + 24 * 60 * 60)
                }
            };
        }

    }
];
```

现在一个登录的功能就实现了！
