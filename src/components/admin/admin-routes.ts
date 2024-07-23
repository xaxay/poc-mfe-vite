// components/admin/admin-routes.ts

import { RouteRecordRaw } from 'vue-router';
import Users from './Users.vue';
import UserDetails from './UserDetails.vue';
import { RouteDef } from '@browser-module/config/routes';


export function createRouteChildren(parentRouteDef: RouteDef): RouteRecordRaw[] {
  return [
    // {
    //   path: '',
    //   redirect: 'users',
    // },
    {
      path: 'users',
      component: Users,
      alias: ['', 'users']
    },
    {
      path: 'users/details/:name',
      component: UserDetails,
    },
    {
      path: ':pathMatch(.*)*',
      redirect: 'users'
    }
  ];
}
