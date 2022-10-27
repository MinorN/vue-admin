import useRouteStore from '@/router';
import type {Menu} from '@/global';

const routeStore = useRouteStore;

const useMenuStore = defineStore(
    'menu',
    {
        state: () => ({
            menus: [] as Menu.recordRaw[]
        }),
        getters: {
            allMenus() {
                let menus = [];
                menus = routeStore.getRoutes();
                return menus;
            }
        },
        actions: {}
    },
);

export default useMenuStore;
