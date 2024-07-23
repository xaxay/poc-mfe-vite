<!-- /src/components/admin/Admin.vue -->

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app permanent>
      <v-list dense>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :to="item.pathClcik || item.path"
          router
          :active="isActive(item)"
        >
          <template v-slot:prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ getTitle(item) }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { createRouteChildren } from './admin-routes';
import { getUserLogin } from '@browser-module/api/user';
import { getCurrentRoute } from '@browser-module/api/nav';

export default defineComponent({
  name: 'Admin',
  setup() {
    const drawer = ref(true);
    const userLogin = getUserLogin();

    type NavItemDef = {
      title: string,
      icon: string;
      exact: boolean;
      path: string;
      alias?: string;
      pathClcik?: string;
      altTitle?: string;
    };

    const items = computed(() => [
      { 
        title: 'Users', 
        icon: 'mdi-account-search-outline', 
        exact: true,
        path: '/admin/users',
        alias: '/admin',
      },
      { 
        title: 'User', 
        icon: 'mdi-account-outline', 
        exact: false,
        path: `/admin/users/details/`,
        pathClcik: `/admin/users/details/${userLogin}`,
        altTitle: 'User (Me)'
      },
    ] as NavItemDef[]);

    function isActive(item: NavItemDef): boolean {
      const path = getCurrentRoute().path;
      if (item.exact) {
        if (path === item.path) {
          // console.log('[active nav-item] #path', item.path, path);
          return true;
        }
        if (!!item.alias && path === item.alias) {
          // console.log('[active nav-item] #alias', item.alias, path);
          return true;
        }
        // console.log('[non-active nav-item]', item.path, path);
        return false;
      }
      if (path.startsWith(item.path)) {
        // console.log('[active nav-item] #startsWith', item.path, path);
        return true;
      }
      // console.log('[non-active nav-item] #notStartsWith', item.path, path);
      return false;
    }

    function getTitle(item: NavItemDef): string {
      const currentPath = getCurrentRoute().path;
      if (item.pathClcik) {
        return currentPath === item.pathClcik ? item.altTitle || item.title : item.title;
      }
      return item.title;
    }

    return {
      drawer,
      items,
      isActive,
      getTitle,
    };
  },
});

export { createRouteChildren };
</script>

<style scoped>
</style>
