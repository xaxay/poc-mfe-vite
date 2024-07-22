// src/shims/shim-routes.d.ts

declare module "@browser-module/config/routes" {

  import { RoutesConfig, RouteDef, RouteDefs } from '../types/routeTypes'
  
  declare const routesConfig: RoutesConfig;

  export default routesConfig;
  export { RoutesConfig, RouteDef, RouteDefs };
}
