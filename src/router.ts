// router.ts
import { createRouter, createWebHistory, RouteMeta, RouteRecordRaw, RouteRecordSingleView, RouteRecordSingleViewWithChildren } from 'vue-router';
import routesConfig, { RouteDef } from '@browser-module/config/routes';
import { isLogined } from '@browser-module/api/user';

const baseUrl = import.meta.env.BASE_URL;

const routeEntries: [string, RouteDef][] = Object.entries(routesConfig.routes);

console.log('routeEntries:', routeEntries);


// Function to dynamically import a module and check for createRoutes export
async function importComponentAndRoutes(path: string, routeDef: RouteDef) : Promise<RouteRecordRaw>  {

  console.log('importComponentAndRoutes()', 'path:', path, 'routeDef:', routeDef);

  const module = await import(/* @vite-ignore */ routeDef.module);
  const component = module.default;

  let routeRecord : RouteRecordRaw  = {
    path,
    component,
  }

  const meta : RouteMeta =  { 
    title: routeDef.title, 
    requiresAuth: routeDef.requiresAuth === undefined || routeDef.requiresAuth 
  };

  const children: RouteRecordRaw[] = module.createRoutes ? module.createRoutes(routeDef) : null;
  if (children) {

    for(const child of children) {
      child.meta = {
        ...meta, // use default values from parent meta
        meta: child.meta
      };
    }

    routeRecord = {
      ...routeRecord,
      children
    } as RouteRecordSingleViewWithChildren

  } else {
    
    routeRecord = {
      ...routeRecord,
      meta
    } as RouteRecordSingleView;

  }

  console.log('importComponentAndRoutes()', 'routeRecordRaw:', routeRecord);

  return routeRecord;
}

// Define routes dynamically
const routes: RouteRecordRaw[] = [];

async function createRouterBasedOnConfig() {
  for (const [path, data] of routeEntries) {
    const route = await importComponentAndRoutes(path, data);
    routes.push(route);
  }

  if (defaultRoutePath) {
    routes.push({ path: '/:pathMatch(.*)*', redirect: defaultRoutePath || '/' });
  }

  console.log('baseUrl', baseUrl, 'top level routes:', routes);

  const router = createRouter({
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

  return router;
}

export const defaultRoutePath: string | undefined = routesConfig.defaultPath;

// Load the routes and create the router instance
export const router = await createRouterBasedOnConfig();
