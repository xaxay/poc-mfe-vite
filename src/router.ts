// router.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import routesConfig, { RouteDef } from '@browser-module/config/routes';
import { isLogined } from '@browser-module/api/user';

const baseUrl = import.meta.env.BASE_URL;

const routeEntries: [string, RouteDef][] = Object.entries(routesConfig.routes);

// Define routes
const routes: RouteRecordRaw[] = routeEntries.map(([path, data]) => {
    return {
        path,
        component: () => import(/* @vite-ignore */ data.module),
        meta: { 
            title: data.title, 
            requiresAuth: data.requiresAuth === undefined || data.requiresAuth 
        }
    }
});

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
        if (to.meta.requiresAuth && !isLogined()) {
            console.log('[router] requires auth, redirecting to login, back-url:', to.fullPath);
            next({ path: '/login', query: { back: to.fullPath } });
        } else {
            next();
        }
    }
});
