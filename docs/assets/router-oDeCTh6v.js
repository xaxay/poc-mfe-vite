import{createRouter as u,createWebHistory as c}from"vue-router";import s from"@browser-module/config/routes";const p=Object.entries(s.routes),r=p.map(([t,e])=>({path:t,component:()=>import(e.module),meta:{title:e.title}})),n=s.baseUrl||"/",o=s.defaultPath;o&&r.push({path:"/:pathMatch(.*)*",redirect:o||"/"});console.log("baseUrl",n,"top level routes:",r);const h=u({history:c(n),routes:r});h.beforeEach((t,e,a)=>{r.some(l=>l.path===t.path)?(console.log("[router]",t?.path,"<=",e?.path),a()):(console.log("[router] unknown path:",t.path,"redirecting to default path:",o||"/"),a(o||"/"))});export{n as baseUrl,o as defaultRoutePath,h as router};