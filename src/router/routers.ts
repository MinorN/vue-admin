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
            whiteList:true
        }
    }
];


export {
    constRoutes,
};
