
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
    baseUrl: string;
    defaultPath: string,
    routes: RouteDefs,
  }