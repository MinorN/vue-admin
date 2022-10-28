import useRouteStore from '@/router';
import type {Menu} from '@/global';

const routeStore = useRouteStore;

const useMenuStore = defineStore(
    'menu',
    {
        state: () => ({
            menus: [] as Menu.recordRaw[],
            actived: 0
        }),
        getters: {
            allMenus() {
                let menus = [];
                menus = routeStore.getRoutes();
                return menus;
            },
            sidebarMenus() {
                return this.allMenus.length > 0 ? this.allMenus[this.actived] : [];
            }
        },
        actions: {}
    },
);

export default useMenuStore;
