<!-- /src/components/Header.vue -->

<template>
  <v-app-bar app>
    <v-img src="@/assets/logo.svg" alt="Logo" class="logo" max-width="5rem"></v-img>

    <v-toolbar-title>
      <span class="title">{{ title }}</span>
    </v-toolbar-title>

    <template v-if="logined">
      <template v-if="!isDashboardPage">
        <v-btn icon @click="goToDashboard">
          <v-icon>mdi-view-dashboard</v-icon>
          <v-tooltip activator="parent" location="bottom">
            <b>Dashboard</b>
            <br>Click to open
          </v-tooltip>
        </v-btn>
      </template>

      <v-btn icon @click="store.resetCounter">
        <v-badge :content="counter" color="red" offset-x="-5" max="99">
          <v-icon>mdi-bell</v-icon>
        </v-badge>
        <v-tooltip activator="parent" location="bottom">
          <b>Notifications</b>
          <br>Click to reset
        </v-tooltip>
      </v-btn>

      <v-btn icon @click="logout" class="mx-4">
        <v-avatar>
          <v-icon>{{ userIcon }}</v-icon>
          <v-tooltip activator="parent" location="bottom">
            <b>{{ userName }}</b>
            <br>Expired in: {{ expiredInSecs }} seconds.
            <br/>Click to logout
          </v-tooltip>
        </v-avatar>
      </v-btn>
      
    </template>

  </v-app-bar>
</template>

<script setup lang="ts">

console.log('[Header.vue] setup started');

import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useCounterStore } from '@browser-module/stores/counter';
import { getRouter, getCurrentRoute, getDefaultPath, navigateTo, onRouterLoaded } from '@browser-module/api/nav';
import { getUserLogin, logout, isLogined, getExpiredInSeconds } from '@browser-module/api/user';

const store = useCounterStore();

const userIcon = ref<string>('mdi-account');
const isDashboardPage = ref<boolean>(false);
const title = ref<string>('');
const counter = computed<number>(() => store.counter);
const userName = computed<string>(() => getUserLogin());
const logined = computed<boolean>(() => isLogined());
const expiredInSecs = ref<number>(getExpiredInSeconds());

const updateExpiredInSecs = (): void => {
  expiredInSecs.value = getExpiredInSeconds();
};

const goToDashboard = (): void => {
  navigateTo('/dashboard');
};

const updateRouteInfo = (): void => {
  const currentRoute = getCurrentRoute();
  isDashboardPage.value = currentRoute.path === getDefaultPath();
  title.value = currentRoute.meta.title as string || '';
  console.log('[Header.vue] updateRouteInfo.', currentRoute.path,
    'currentRoute:', currentRoute);
};


onRouterLoaded(router => {
  updateRouteInfo();
  getRouter().afterEach(() => {
    console.log('[Header.vue] router afterEach');
    updateRouteInfo();
  });
});

onMounted((): void => {
  console.log('[Header.vue] mounted');
  const interval = setInterval(updateExpiredInSecs, 1000); // Update every second
  onUnmounted((): void => {
    clearInterval(interval);
  });
});

console.log('[Header.vue] setup ended');

</script>

<style scoped>
.logo {
  max-width: 2rem;
}

.title {
  font-size: 1.5rem;
}
</style>
