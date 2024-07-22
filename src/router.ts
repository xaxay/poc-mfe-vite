// router.ts
import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
import routesConfig, { RouteDef } from '@browser-module/config/routes';
import { isLogined } from '@browser-module/api/user';

const baseUrl = import.meta.env.BASE_URL;

const routeEntries: [string, RouteDef][] = Object.entries(routesConfig.routes);

const loadRoutes = async (): Promise<RouteRecordRaw[]> => {
  const routes = await Promise.all(
    routeEntries.map(async ([path, routeDef]) => {
      console.log('loading module', routeDef.module)
      const module = await import(/* @vite-ignore */ routeDef.module);
      console.log('loaded module', routeDef.module, module)

      const component = module.default;

      // Check if the module exposes subroutes
      const subroutes = module.subroutes ? module.subroutes.map((subroute: any) => ({
        path: subroute.path,
        component: subroute.component,
        meta: subroute.meta,
      })) : [];

      return {
        path,
        component,
        children: subroutes,
        meta: { 
          title: routeDef.title, 
          requiresAuth: routeDef.requiresAuth === undefined || routeDef.requiresAuth 
        }
      } as RouteRecordRaw;
    })
  );

  if (routesConfig.defaultPath) {
    routes.push({ path: '/:pathMatch(.*)*', redirect: routesConfig.defaultPath || '/' });
  }

  return routes;
};

// Initialize the router with loaded routes
const createDynamicRouter = async () : Promise<Router> => {
  console.log('createDynamicRouter started')

  const routes = await loadRoutes();

  console.log('createDynamicRouter creating router', routes)

  const router = createRouter({
    history: createWebHistory(baseUrl),
    routes
  });

  router.beforeEach((to, from, next) => {
    const knownRoute = router.getRoutes().some(route => route.path === to.path);
    if (!knownRoute) {
      console.log('[router] unknown path:', to.path, 'redirecting to default path:', routesConfig.defaultPath || '/');
      next(routesConfig.defaultPath || '/');
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

  return router;
};

const router = await createDynamicRouter();


console.log('export router', router)
export { router };
