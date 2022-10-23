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
import  'element-plus/dist/index.css'

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
import userUserStore from '@/store/modules/user'

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
