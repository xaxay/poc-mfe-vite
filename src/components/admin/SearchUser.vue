// components/admin/SearchUser.vue

<template>
  <v-container fluid>
    <v-text-field 
      v-model="searchQuery" 
      label="Search Users" 
      flat 
      clearable 
      prepend-inner-icon="mdi-magnify"
      @input="searchUsers"
    ></v-text-field>
    <v-list>
      <v-list-item 
        v-for="user in users" 
        :key="user.name" 
        @click="goToUserDetails(user.name)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { navigateTo } from '@browser-module/api/nav';
import { searchUser, User } from './admin-api';

export default defineComponent({
  name: 'SearchUser',
  setup() {
    const searchQuery = ref('');
    const users = ref<User[]>([]);

    const searchUsers = async () => {
      if (searchQuery.value.length > 2) {
        users.value = await searchUser(searchQuery.value);
      } else {
        users.value = [];
      }
    };

    const goToUserDetails = (name: string) => {
      navigateTo({ name: 'UserDetails', params: { name } });
    };

    return {
      searchQuery,
      users,
      searchUsers,
      goToUserDetails
    };
  }
});
</script>
