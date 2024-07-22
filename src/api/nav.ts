// utils/nav.ts

console.log('[nav.ts]')

import { RouteLocationNormalizedLoaded, RouteLocationRaw, Router } from 'vue-router';

let routerInstanse: Router | null = null;


async function loadRouter(): Promise<void> {
  console.log('importing @browser-module/router')
  const { router } = await import('@browser-module/router');
  routerInstanse = router; 
  console.log('imported @browser-module/router')
}

loadRouter();


export function navigateTo(to: RouteLocationRaw) : void {
  if (!routerInstanse) {
    throw new Error("router is not loaded yet");
  }
  routerInstanse.push(to);
}


export function getCurrentRoute() : RouteLocationNormalizedLoaded {
  if (!routerInstanse) {
    throw new Error("router is not loaded yet");
  }
  return routerInstanse.currentRoute.value;
}