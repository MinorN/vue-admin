import {createRouter, createWebHistory} from 'vue-router';
import {constRoutes} from './routers';
import userUserStore from '@/store/modules/user'

const router = createRouter({
    history: createWebHistory(),
    routes: constRoutes
});

// 路由前置守卫
router.beforeEach(async (to,from,next)=>{
    const userStore = userUserStore()
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

export default router;
