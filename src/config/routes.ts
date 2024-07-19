// routes.ts

import { RoutesConfig } from "@/types/routeTypes";


const routesConfig: RoutesConfig = {
  
  defaultPath: '/dashboard',

  routes: {
    "/dashboard": { title: "Dashboard", icon: "mdi-view-dashboard", module: `@browser-module/ui/dashboard`, dashboard: false},
  
    "/admim": { title: "Administration", icon: "mdi-cog", module: `@browser-module/ui/admin`},
    "/account": { title: "My account", icon: "mdi-badge-account-horizontal-outline", module: `@browser-module/ui/account`},
    "/rumors": { title: "The incredible and unbelievable news", icon: "mdi-newspaper", module: `@browser-module/ui/rumors`},
    
    // "/app4": { title: "app4", module: `@browser-module/ui/app4`},
    "/app5": { title: "app5", module: `@browser-module/ui/app5`},
    "/app6": { title: "app6", module: `@browser-module/ui/app6`},
    "/app7": { title: "app7", module: `@browser-module/ui/app7`},
    "/app8": { title: "app8", module: `@browser-module/ui/app8`},
    // "/app9": { title: "app9", module: `@browser-module/ui/app9`},
    "/app10": { title: "app10", module: `@browser-module/ui/app10`},
    "/app11": { title: "app11", module: `@browser-module/ui/app11`},
    "/app12": { title: "app12", module: `@browser-module/ui/app12`},
    "/app13": { title: "app13", module: `@browser-module/ui/app13`},
    "/app14": { title: "app14", module: `@browser-module/ui/app14`},
    "/app15": { title: "app15", module: `@browser-module/ui/app15`},
    // "/app16": { title: "app16", module: `@browser-module/ui/app16`},
    "/app17": { title: "app17", module: `@browser-module/ui/app17`},
    "/app18": { title: "app18", module: `@browser-module/ui/app18`},
  }
}


export default routesConfig;