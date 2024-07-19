import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import routesConfig, { RouteDef } from '@browser-module/config/routes';
import baseUrl from './config/baseUrl';

const routeEntries: [string, RouteDef][] = Object.entries(routesConfig.routes);

// Define routes
const routes: RouteRecordRaw[] = routeEntries.map(([path, data]) => ({
    path,
    component: () => import(/* @vite-ignore */ data.module),
    meta: { title: data.title }
}));

export const defaultRoutePath: string | undefined = routesConfig.defaultPath;
if (defaultRoutePath) {
    routes.push({ path: '/:pathMatch(.*)*', redirect: defaultRoutePath || '/' });
}

console.log('baseUrl', baseUrl, 'top level routes:', routes);

export const router = createRouter({
    history: createWebHistory(baseUrl),
    routes
});


router.beforeEach((to, from, next) => {
    const knownRoute = routes.some(route => route.path === to.path);
    if (!knownRoute) {
        console.log('[router] unknown path:', to.path, 'redirecting to default path:', defaultRoutePath || '/');
        next(defaultRoutePath || '/');
    } else {
        console.log('[router]', to?.path, '<=', from?.path);
        next();
    }
});
