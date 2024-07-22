// components/admin/Admin.vue

<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Import the routes factory here
import { createRoutes } from './admin-routes-factory';

export default defineComponent({
  name: 'Admin'
});

// Export the routes factory here
export { createRoutes };
</script>

<style scoped>
</style>
