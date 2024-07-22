// components/admin/Admin.vue

<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { createRouteChildren } from './admin-routes';

export default defineComponent({
  name: 'Admin'
});

export { createRouteChildren };
</script>

<style scoped>
</style>
