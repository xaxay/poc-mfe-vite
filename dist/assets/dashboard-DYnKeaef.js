import{ref as m,computed as E,resolveComponent as t,openBlock as p,createBlock as f,withCtx as c,createVNode as s,createElementVNode as d,createElementBlock as w,Fragment as B,renderList as L,mergeProps as N,createTextVNode as v,toDisplayString as h,onMounted as onM, onUnmounted as onU}from"vue";import{useRouter as Q}from"vue-router";import D from"@browser-module/config/routes";import{_ as P}from"./_plugin-vue_export-helper-DlAUqK2U.js";const S={setup(){let sE;onM(()=>{sE=document.createElement('style');sE.textContent=`.app-grid[data-v-52806a68]{display:grid;grid-template-columns:repeat(auto-fill,minmax(10rem,1fr));gap:1rem;justify-items:center}.app-card[data-v-52806a68]{display:flex;flex-direction:column;align-items:center;justify-content:top;width:10rem;height:15rem;cursor:pointer;padding-top:0rem}.icon-circle[data-v-52806a68]{background-color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;width:7rem;height:7rem;margin:0 auto 1rem}.app-icon[data-v-52806a68]{color:#000}.app-name[data-v-52806a68]{font-size:1.2rem;line-height:1.3rem}
`;document.head.appendChild(sE);});onU(()=>{if(sE){document.head.removeChild(sE);}});const l=m([]),n=m(""),_=Q();Object.entries(D.routes).filter(([e,o])=>o.dashboard!==!1).forEach(([e,o])=>{l.value.push({name:o.title,icon:o.icon||"mdi-application",route:e})});const u=e=>{_.push(e)},i=E(()=>{const e=n.value.toLowerCase();return l.value.filter(o=>!n.value||o.name.toLowerCase().includes(e))});return console.log("filteredApps",i,"apps",l),{searchQuery:n,filteredApps:i,openApp:u}}},j={class:"app-grid"},z={class:"icon-circle"},F={class:"app-name"};function I(l,n,_,a,u,i){const e=t("v-text-field"),o=t("v-icon"),x=t("v-card-text"),g=t("v-tooltip"),C=t("v-card"),k=t("v-hover"),b=t("v-container");return p(),f(b,{fluid:""},{default:c(()=>[s(e,{modelValue:a.searchQuery,"onUpdate:modelValue":n[0]||(n[0]=r=>a.searchQuery=r),label:"Search Apps",flat:"",clearable:"","prepend-inner-icon":"mdi-magnify"},null,8,["modelValue"]),d("div",j,[(p(!0),w(B,null,L(a.filteredApps,(r,y)=>(p(),f(k,{key:r.name},{default:c(({isHovering:A,props:V})=>[s(C,N({onClick:O=>a.openApp(r.route),class:"app-card",elevation:A?16:2,ref_for:!0},V,{color:y%2===0?"green":"blue"}),{default:c(()=>[s(x,{class:"text-center"},{default:c(()=>[d("div",z,[s(o,{class:"app-icon",size:"5rem"},{default:c(()=>[v(h(r.icon),1)]),_:2},1024)]),d("div",F,h(r.name),1)]),_:2},1024),s(g,{activator:"parent",location:"top",offset:"-10"},{default:c(()=>[v("Click to open")]),_:1})]),_:2},1040,["onClick","elevation","color"])]),_:2},1024))),128))])]),_:1})}const q=P(S,[["render",I],["__scopeId","data-v-52806a68"]]);export{q as default};
