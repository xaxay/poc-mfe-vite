import{createRouter as u,createWebHistory as c}from"vue-router";import s from"@browser-module/config/routes";const n=Object.entries(s.routes),o=n.map(([e,t])=>({path:e,component:()=>import(t.module),meta:{title:t.title}})),r=s.defaultPath;r&&o.unshift({path:"/",redirect:r});console.log("top level routes:",o);const l=u({history:c("/"),routes:o});l.beforeEach((e,t,i)=>{console.log("[router]",e?.path,"<=",t?.path),i()});export{l as router};
