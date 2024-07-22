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
          <v-tooltip activator="parent" location="bottom" content-class="tooltip-center">
            <b>{{ userName }}</b>
            <br>Expired in: {{ expiredInSecs }} seconds.
            <br/>Click to logout
          </v-tooltip>
        </v-avatar>
      </v-btn>
      
    </template>

  </v-app-bar>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useCounterStore } from '@browser-module/stores/counter';
import routesConfig from '@browser-module/config/routes';
import { router } from '@browser-module/router';
import { getUserLogin, logout, isLogined, getExpiredInSeconds } from '@browser-module/api/user';

const store = useCounterStore();

const userIcon = ref('mdi-account');

const isDashboardPage = computed(() => router.currentRoute.value.path === '/dashboard');

const title = computed(() => {
  const route = router.currentRoute.value;
  const routeDef = routesConfig.routes[route?.path];
  return routeDef?.title || ''
});

const counter = computed(() => store.counter);

const userName = computed(() => getUserLogin());

const logined = computed(() => isLogined());

const expiredInSecs = ref(getExpiredInSeconds());

const updateExpiredInSecs = () => {
  expiredInSecs.value = getExpiredInSeconds();
};

const goToDashboard = () => {
  router.push('/dashboard');
};

onMounted(() => {
  const interval = setInterval(updateExpiredInSecs, 1000); // Update every second
  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>

<style scoped>
.logo {
  max-width: 2rem;
}

.title {
  font-size: 1.5rem;
}

.tooltip-center .v-tooltip__content {
  text-align: center;
}
</style>
