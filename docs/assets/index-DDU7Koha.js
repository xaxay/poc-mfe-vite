import{defineComponent as m,resolveComponent as c,openBlock as l,createBlock as d,withCtx as p,createVNode as s,unref as _,createApp as y}from"vue";import h from"@browser-module/ui/header";import{createVuetify as v}from"vuetify";import{createPinia as g}from"pinia";import{createPersistedState as O}from"pinia-plugin-persistedstate";import{router as P}from"@browser-module/router";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function u(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=u(e);fetch(e.href,t)}})();const L=m({__name:"App",setup(f){return(r,u)=>{const o=c("router-view"),e=c("v-main"),t=c("v-app");return l(),d(t,null,{default:p(()=>[s(_(h)),s(e,null,{default:p(()=>[s(o)]),_:1})]),_:1})}}}),a=g();a.use(O());const w=v({theme:{defaultTheme:"dark"}}),n=y(L);n.use(w);n.use(a);n.use(P);n.mount("#app");
