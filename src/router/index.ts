import {createRouter, createWebHistory} from 'vue-router';
import {constRoutes} from './routers';

const router = createRouter({
    history: createWebHistory(),
    routes: constRoutes
});

export default router;
