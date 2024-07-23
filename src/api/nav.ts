// src/utils/nav.ts

console.log('[nav.ts]')

import { RouteLocationNormalizedLoaded, RouteLocationRaw, Router, createRouter, createWebHistory } from 'vue-router';

let routerInstanse: Router | null = null;

async function loadRouter(): Promise<void> {
  console.log('Started dynamic import of @browser-module/router')
  const { router } = await import('@browser-module/router');
  routerInstanse = router; 
  console.log('Finished dynamic import of @browser-module/router')
}

loadRouter();


export function navigateTo(to: RouteLocationRaw) : void {
  if (!routerInstanse) {
    throw new Error("main router is not loaded yet");
  }
  routerInstanse.push(to);
}

const staticRouter = createRouter({
  history: createWebHistory(),
  routes: [] // Add your routes here if needed
});

export function getCurrentRoute() : RouteLocationNormalizedLoaded {
  if (!routerInstanse) {
    return staticRouter.currentRoute.value;
  }
  return routerInstanse.currentRoute.value;
}

export function join(...paths: string[]): string {
  return paths.map(path => path.replace(/\/+$/, '').replace(/^\/+/, '')).join('/');
}
