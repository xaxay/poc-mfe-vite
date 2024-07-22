<template>
  <div>
    <p>Name: {{ name }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'UserDetails',
  setup() {
    const route = useRoute();
    const name = route.params.name as string;

    return {
      name
    };
  }
});
</script>
