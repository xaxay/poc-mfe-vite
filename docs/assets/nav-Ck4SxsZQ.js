import{createRouter as p,createWebHistory as h}from"vue-router";const v="modulepreload",y=function(e){return"/poc-mfe-vite/"+e},l={},w=function(n,u,R){let a=Promise.resolve();if(u&&u.length>0){document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),o=c?.nonce||c?.getAttribute("nonce");a=Promise.all(u.map(t=>{if(t=y(t),t in l)return;l[t]=!0;const i=t.endsWith(".css"),m=i?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${m}`))return;const r=document.createElement("link");if(r.rel=i?"stylesheet":v,i||(r.as="script",r.crossOrigin=""),r.href=t,o&&r.setAttribute("nonce",o),document.head.appendChild(r),i)return new Promise((d,f)=>{r.addEventListener("load",d),r.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${t}`)))})}))}return a.then(()=>n()).catch(c=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=c,window.dispatchEvent(o),!o.defaultPrevented)throw c})};console.log("[nav.ts]");let s=null;async function E(){console.log("Started dynamic import of @browser-module/router");const{router:e}=await w(async()=>{const{router:n}=await import("@browser-module/router");return{router:n}},[]);s=e,console.log("Finished dynamic import of @browser-module/router")}E();function _(e){if(!s)throw new Error("router is not loaded yet");s.push(e)}const g=p({history:h(),routes:[]});function P(){return s?s.currentRoute.value:g.currentRoute.value}function S(...e){return e.map(n=>n.replace(/\/+$/,"").replace(/^\/+/,"")).join("/")}export{P as getCurrentRoute,S as join,_ as navigateTo};
