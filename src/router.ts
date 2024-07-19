import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import routesConfig, { RouteDef } from '@browser-module/config/routes';

const routeEntries: [string, RouteDef][] = Object.entries(routesConfig.routes);

// Define routes
const routes: RouteRecordRaw[] = routeEntries.map(([path, data]) => ({
    path,
    component: () => import(/* @vite-ignore */ data.module),
    meta: { title: data.title }
}));

const defaultRoutePath: string | undefined = routesConfig.defaultPath;
if (defaultRoutePath) {
    routes.unshift({ path: '/', redirect: defaultRoutePath });
}

console.log('top level routes:', routes);

const currentPath = window.location.pathname;
let BASE_URL = currentPath.substring(0, currentPath.length-1);
console.log('BASE_URL', BASE_URL);

export const router = createRouter({
    history: createWebHistory(BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    console.log('[router]', to?.path, '<=', from?.path);
    next();
});
