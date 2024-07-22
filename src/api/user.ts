// src/api/user.ts

import { useUserStore } from '../stores/userStore';
import { router } from '@browser-module/router';

function getUserStore() {
  return useUserStore();
}

export function isGuest(): boolean {
  return getUserStore().isGuest();
}

export function isLogined(): boolean {
  return getUserStore().isLogined();
}

export function isAdmin(): boolean {
  return getUserStore().isAdmin();
}

export function getUserLogin(): string {
  return getUserStore().getLogin();
}

export async function login(name: string, password: string): Promise<boolean> {
  return await getUserStore().login(name, password);
}

export async function logout(): Promise<void> {
  await getUserStore().logout();
  const currentPath = router.currentRoute.value.fullPath;
  if (currentPath !== '/login') {
    router.push({ path: '/login', query: { back: currentPath } });
  }
}

export function getUserPermissions(): string[] {
  return getUserStore().getPermissions();
}


export function getExpiredInSeconds(): number {
  return getUserStore().getExpiredInSeconds();
}