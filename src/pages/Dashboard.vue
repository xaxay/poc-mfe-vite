// components/Dashboard.vue

<template><v-container fluid>
  <v-text-field v-model="searchQuery" label="Search Apps" flat clearable
    prepend-inner-icon="mdi-magnify"></v-text-field>
  <div class="app-grid">
    <v-hover v-for="(app, appIndex) in filteredApps" :key="app.name" v-slot:default="{ isHovering, props }">
      <v-card @click="openApp(app.route)" class="app-card" :elevation="isHovering ? 16 : 2" v-bind="props"
        :color="appIndex % 2 === 0 ? 'green' : 'blue'">
        <v-card-text class="text-center">
          <div class="icon-circle">
            <v-icon class="app-icon" size="5rem">{{ app.icon }}</v-icon>
          </div>
          <div class="app-name">{{ app.name }}</div>
        </v-card-text>
        <v-tooltip activator="parent" location="top" offset="-10">Click to open</v-tooltip>
      </v-card>
    </v-hover>
  </div>
</v-container></template>

<script>
  import { ref, computed } from 'vue';
  import { router } from '@browser-module/router';
  import routesConfig from '@browser-module/config/routes';
  import { getUserPermissions } from '@browser-module/api/user';

  export default {
    setup() {
      const apps = ref([]);
      const searchQuery = ref('');
  
      const routeEntries = Object.entries(routesConfig.routes);

      const permissions = getUserPermissions();

      function isAllowedApp(appName) {
        const allowed = permissions.includes(appName);
        return allowed;
      }

      routeEntries
        .filter(([path, data]) => (data.dashboard === true) && isAllowedApp(path.substring(1)))
        .forEach(([path, data]) => {
          apps.value.push({
            name: data.title,
            icon: data.icon || 'mdi-application',
            route: path
          });
        });
  
      const openApp = (route) => {
        router.push(route);
      };
  
      const filteredApps = computed(() => {
        const search = searchQuery.value.toLowerCase();
        return apps.value.filter(app => !searchQuery.value || app.name.toLowerCase().includes(search));
      });

      return {
        searchQuery,
        filteredApps,
        openApp
      };
    }
  };
  </script>

<style scoped>
.app-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 1rem;
  justify-items: center;
}

.app-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  width: 10rem;
  height: 15rem;
  cursor: pointer;
  padding-top: 0rem;
}

.icon-circle {
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7rem;
  height: 7rem;
  margin: 0 auto 1rem auto;
}

.app-icon {
  color: black;
}

.app-name {
  font-size: 1.2rem;
  line-height: 1.3rem;
}
</style>