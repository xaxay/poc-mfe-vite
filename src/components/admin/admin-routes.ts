// components/admin/admin-routes.ts

import { RouteRecordRaw } from 'vue-router';
import SearchUser from './SearchUser.vue';
import UserDetails from './UserDetails.vue';
import { RouteDef } from '@browser-module/config/routes';


export function createRouteChildren(parentRouteDef: RouteDef): RouteRecordRaw[] {
  const titlePrefix : string = parentRouteDef?.title ? `${parentRouteDef.title} - ` : '';
  return [
    {
      path: '',
      component: SearchUser,
      meta: {
        title: `${titlePrefix}Search user`,
      }
    },
    {
      path: 'users',
      component: SearchUser,
      meta: {
        title: `${titlePrefix}Search user`,
      }
    },
    {
      path: 'users/:name',
      component: UserDetails,
      meta: {
        title: `${titlePrefix}User details`,
      }
    },
    {
      path: ':pathMatch(.*)*',
      redirect: 'search-user'
    }
  ];
}
