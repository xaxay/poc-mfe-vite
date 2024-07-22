import{defineStore as a}from"pinia";import{router as s}from"@browser-module/router";const p=a("user",{state:()=>({payload:""}),actions:{async login(e,t){if(await u(e,t)){const o=d(e);return this.payload=o,!0}return!1},async logout(){this.payload=""},isGuest(){return!this.payload||this.isExpired()},isLogined(){return!!this.payload&&!this.isExpired()},getLogin(){if(this.isExpired())return"";const e=r(this.payload);return e?e.login:""},isAdmin(){if(this.isExpired())return!1;const e=r(this.payload);return e?e.permissions.includes("admin"):!1},getPermissions(){if(this.isExpired())return[];const e=r(this.payload);return e?e.permissions:[]},isExpired(){const e=r(this.payload);return e?e.exp<=Date.now():!0},getExpiredTime(){const e=r(this.payload);return e?e.exp:0},getExpiredInSeconds(){if(this.isExpired())return 0;const e=this.getExpiredTime(),t=Date.now(),n=Math.floor((e-t)/1e3);return n>0?n:0}},persist:!0});async function u(e,t){if(e===""||e!==t)return!1;const n=["account","rumors","app4","app5","app6","app7","app8","app9","app11","app12","app13","app14","app15","app16","app17","app18"];return e==="admin"&&n.push("admin"),console.log("Logged in as user with login",e,"userPermissions",n),!0}function d(e){const t={login:e,permissions:["account","rumors","app4","app5","app6","app7","app8","app9",...e==="admin"?["admin"]:[]],exp:Date.now()+6e4};return btoa(JSON.stringify(t))}function r(e){try{if(!e)return null;const t=atob(e);return JSON.parse(t)}catch(t){return console.error("Failed to decode payload",t),null}}function i(){return p()}function g(){return i().isGuest()}function f(){return i().isLogined()}function h(){return i().isAdmin()}function m(){return i().getLogin()}async function y(e,t){return await i().login(e,t)}async function x(){await i().logout();const e=s.currentRoute.value.fullPath;e!=="/login"&&s.push({path:"/login",query:{back:e}})}function E(){return i().getPermissions()}function L(){return i().getExpiredInSeconds()}export{L as getExpiredInSeconds,m as getUserLogin,E as getUserPermissions,h as isAdmin,g as isGuest,f as isLogined,y as login,x as logout};
