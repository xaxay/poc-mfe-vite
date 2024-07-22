// components/admin/admin-routes-factory.ts

import { RouteRecordRaw } from 'vue-router';
import SearchUser from './SearchUser.vue';
import UserDetails from './UserDetails.vue';
import { RouteDef } from '@browser-module/config/routes';


export function createRoutes(parentRouteDef: RouteDef): RouteRecordRaw[] {
  const title : string = parentRouteDef.title;
  return [
    {
      path: '',
      redirect: 'search-user',
    },
    {
      path: 'search-user',
      component: SearchUser,
      meta: {
        title: `${title} - Search user`,
      }
    },
    {
      path: 'user-details',
      component: UserDetails,
      meta: {
        title: `${title} - User details`,
      }
    },
    {
      path: ':pathMatch(.*)*',
      redirect: 'search-user'
    }
  ];
}
