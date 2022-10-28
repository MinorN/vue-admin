const constRoutes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/layouts/index.vue'),
        meta: {
            title: '首页',
        },
        children:[
            {
                path: '/login',
                name: 'login',
                component: () => import('@/views/login.vue'),
                meta: {
                    title: '登录',
                    whiteList:true
                },
            }
        ]
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
