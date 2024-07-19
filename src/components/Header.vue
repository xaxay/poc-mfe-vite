<template><v-app-bar app>
  <v-img src="@/assets/logo.svg" alt="Logo" class="logo" max-width="5rem"></v-img>

  <v-toolbar-title>
    <span class="title">{{ title }}</span>
  </v-toolbar-title>

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

  <v-avatar class="mx-4">
    <v-icon>{{ userIcon }}</v-icon>
  </v-avatar>
</v-app-bar></template>

<script setup>
  import { ref, computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useCounterStore } from '@browser-module/stores/counter';
  import routesConfig from '@browser-module/config/routes';
  
  const router = useRouter();
  const route = useRoute();
  const store = useCounterStore();
  
  const userIcon = ref('mdi-account');
  
  const isDashboardPage = computed(() => route.path === '/dashboard');
  
  const title = computed(() => routesConfig[route.path]?.title || '');
  
  const counter = computed(() => store.counter);
  
  const goToDashboard = () => {
    router.push('/dashboard');
  };
</script>

<style scoped>
.logo {
  max-width: 2rem;
}

.title {
  font-size: 1.5rem;
}
</style>