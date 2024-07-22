// router.ts
import { createRouter, createWebHistory, RouteMeta, RouteRecordRaw, RouteRecordSingleView, RouteRecordSingleViewWithChildren } from 'vue-router';
import routesConfig, { RouteDef } from '@browser-module/config/routes';
import { isLogined } from '@browser-module/api/user';

console.log('[router.ts]');

const baseUrl = import.meta.env.BASE_URL;

// Use empty router to make possible to resolve circular imports
const router = createRouter({
  history: createWebHistory(baseUrl),
  routes: []
});

const routeEntries: [string, RouteDef][] = Object.entries(routesConfig.routes);

// Store dynamically imported modules
const importedModules: Record<string, any> = {};

// Function to dynamically import modules
async function dynamicImportModule(path: string) {
    console.log(`[dynamicImportModule] Attempting to import: ${path}`);
    if (!importedModules[path]) {
        try {
            importedModules[path] = await import(/* @vite-ignore */ path);
            console.log(`[dynamicImportModule] Successfully imported: ${path}`);
        } catch (error) {
            console.error(`[dynamicImportModule] Failed to import: ${path}`, error);
        }
    }
    return importedModules[path];
}

// Define and register routes
async function registerRoutes() {
    console.log('[registerRoutes] Started');
    const routes: RouteRecordRaw[] = await Promise.all(routeEntries.map(async ([path, data]) => {
        const module = await dynamicImportModule(data.module);
        
        const meta: RouteMeta = { 
            title: data.title, 
            requiresAuth: data.requiresAuth === undefined || data.requiresAuth 
        };

        if (module.createRouteChildren) {
            const children: RouteRecordRaw[] = module.createRouteChildren();
            
            for (const child of children) {
                child.meta = {
                    ...meta,
                    ...child.meta
                };
            }

            console.log(`[registerRoutes] Registered route with children: ${path}`);
            return {
                path,
                component: module.default,
                children
            } as RouteRecordSingleViewWithChildren;
        }

        console.log(`[registerRoutes] Registered route: ${path}`);
        return {
            path,
            component: module.default,
            meta
        } as RouteRecordSingleView;
    }));

    routes.forEach(route => router.addRoute(route));
    console.log('[registerRoutes] Routes added to router:', routes);

    // Add the default redirect route
    const defaultRoutePath = routesConfig.defaultPath;
    if (defaultRoutePath) {
        const defaultRoute = { path: '/:pathMatch(.*)*', redirect: defaultRoutePath };
        router.addRoute(defaultRoute);
        console.log('[registerRoutes] Default redirect route added:', defaultRoute);
    }

    router.beforeEach((to, from, next) => {
      console.log('[router.beforeEach] Navigation from:', from.path, 'to:', to.path);
      if (to.matched.length === 0) {
          console.log('[router.beforeEach] Unknown path:', to.path, 'redirecting to default path:', routesConfig.defaultPath || '/');
          next(routesConfig.defaultPath || '/');
      } else {
          if (to.meta.requiresAuth && !isLogined()) {
              console.log('[router.beforeEach] Requires auth, redirecting to login, back-url:', to.fullPath);
              next({ path: '/login', query: { back: to.fullPath } });
          } else {
              console.log('[router.beforeEach] Navigation allowed:', to.path);
              next();
          }
      }
  });

    console.log('[registerRoutes] Finished');
}


await registerRoutes();



export { router };
