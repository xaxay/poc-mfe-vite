// routes.ts


export type RouteDefs = {
  [path: string]: RouteDef;
};


export type RouteDef = {
  title: string;
  module: string;
  icon?: string;
  dashboard?: boolean; 
};

export type RoutesConfig = {
  defaultPath: string,
  routes: RouteDefs,
}

const PLUGIN_BASE_URL = "@browser-module/ui";


const routesConfig: RoutesConfig = {
  defaultPath: '/dashboard',

  routes: {
    "/dashboard": { title: "Dashboard", icon: "mdi-view-dashboard", module: `${PLUGIN_BASE_URL}/dashboard`, dashboard: false},
  
    "/admim": { title: "Administration", icon: "mdi-cog", module: `${PLUGIN_BASE_URL}/admin`},
    "/account": { title: "My account", icon: "mdi-badge-account-horizontal-outline", module: `${PLUGIN_BASE_URL}/account`},
    "/rumors": { title: "The incredible and unbelievable news", icon: "mdi-newspaper", module: `${PLUGIN_BASE_URL}/rumors`},
    
    // "/app4": { title: "app4", module: `${PLUGIN_BASE_URL}/app4`},
    "/app5": { title: "app5", module: `${PLUGIN_BASE_URL}/app5`},
    "/app6": { title: "app6", module: `${PLUGIN_BASE_URL}/app6`},
    "/app7": { title: "app7", module: `${PLUGIN_BASE_URL}/app7`},
    "/app8": { title: "app8", module: `${PLUGIN_BASE_URL}/app8`},
    // "/app9": { title: "app9", module: `${PLUGIN_BASE_URL}/app9`},
    "/app10": { title: "app10", module: `${PLUGIN_BASE_URL}/app10`},
    "/app11": { title: "app11", module: `${PLUGIN_BASE_URL}/app11`},
    "/app12": { title: "app12", module: `${PLUGIN_BASE_URL}/app12`},
    "/app13": { title: "app13", module: `${PLUGIN_BASE_URL}/app13`},
    "/app14": { title: "app14", module: `${PLUGIN_BASE_URL}/app14`},
    "/app15": { title: "app15", module: `${PLUGIN_BASE_URL}/app15`},
    // "/app16": { title: "app16", module: `${PLUGIN_BASE_URL}/app16`},
    "/app17": { title: "app17", module: `${PLUGIN_BASE_URL}/app17`},
    "/app18": { title: "app18", module: `${PLUGIN_BASE_URL}/app18`},
  }
}


export default routesConfig;