import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import routesConfig, { RouteDef } from '@browser-module/config/routes';

const routeEntries: [string, RouteDef][] = Object.entries(routesConfig.routes);

// Define routes
const routes: RouteRecordRaw[] = routeEntries.map(([path, data]) => ({
    path,
    component: () => import(/* @vite-ignore */ data.module),
    meta: { title: data.title }
}));

const baseUrl: string = routesConfig.baseUrl || '/';
const defaultRoutePath: string | undefined = routesConfig.defaultPath;
if (defaultRoutePath) {
    routes.push({ path: '/:pathMatch(.*)*', redirect: defaultRoutePath });
}

console.log('baseUrl', baseUrl, 'top level routes:', routes);

export const router = createRouter({
    history: createWebHistory(baseUrl),
    routes
});

router.beforeEach((to, from, next) => {
    console.log('[router]', to?.path, '<=', from?.path);
    next();
});
