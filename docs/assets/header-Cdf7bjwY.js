import{ref as H,computed as r,resolveComponent as e,openBlock as u,createBlock as m,withCtx as t,createVNode as o,createElementVNode as a,toDisplayString as v,createTextVNode as n,createCommentVNode as I,unref as N,pushScopeId as S,popScopeId as B,onMounted as onM, onUnmounted as onU}from"vue";import{useRouter as M,useRoute as V}from"vue-router";import{useCounterStore as Z}from"@browser-module/stores/counter";import y from"@browser-module/config/routes";import{_ as E}from"./--plugin-vue--export-helper-DlAUqK2U.js";const R="data:image/svg+xml,%3csvg%20width='512'%20height='512'%20viewBox='0%200%20512%20512'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M261.126%20140.65L164.624%20307.732L256.001%20466L377.028%20256.5L498.001%2047H315.192L261.126%20140.65Z'%20fill='%231697F6'/%3e%3cpath%20d='M135.027%20256.5L141.365%20267.518L231.64%20111.178L268.731%2047H256H14L135.027%20256.5Z'%20fill='%23AEDDFF'/%3e%3cpath%20d='M315.191%2047C360.935%20197.446%20256%20466%20256%20466L164.624%20307.732L315.191%2047Z'%20fill='%231867C0'/%3e%3cpath%20d='M268.731%2047C76.0026%2047%20141.366%20267.518%20141.366%20267.518L268.731%2047Z'%20fill='%237BC6FF'/%3e%3c/svg%3e",l=c=>(S("data-v-2e0c20eb"),c=c(),B(),c),T={class:"title"},A=l(()=>a("b",null,"Dashboard",-1)),P=l(()=>a("br",null,null,-1)),j=l(()=>a("b",null,"Notifications",-1)),q=l(()=>a("br",null,null,-1)),z={__name:"Header",setup(c){let sE;onM(()=>{sE=document.createElement('style');sE.textContent=`.logo[data-v-2e0c20eb]{max-width:2rem}.title[data-v-2e0c20eb]{font-size:1.5rem}
`;document.head.appendChild(sE);});onU(()=>{if(sE){document.head.removeChild(sE);}});const f=M(),_=V(),i=Z(),h=H("mdi-account"),b=r(()=>_.path==="/dashboard"),g=r(()=>y[_.path]?.title||""),C=r(()=>i.counter),L=()=>{f.push("/dashboard")};return(G,J)=>{const x=e("v-img"),w=e("v-toolbar-title"),s=e("v-icon"),d=e("v-tooltip"),p=e("v-btn"),k=e("v-badge"),D=e("v-avatar"),F=e("v-app-bar");return u(),m(F,{app:""},{default:t(()=>[o(x,{src:R,alt:"Logo",class:"logo","max-width":"5rem"}),o(w,null,{default:t(()=>[a("span",T,v(g.value),1)]),_:1}),b.value?I("",!0):(u(),m(p,{key:0,icon:"",onClick:L},{default:t(()=>[o(s,null,{default:t(()=>[n("mdi-view-dashboard")]),_:1}),o(d,{activator:"parent",location:"bottom"},{default:t(()=>[A,P,n("Click to open ")]),_:1})]),_:1})),o(p,{icon:"",onClick:N(i).resetCounter},{default:t(()=>[o(k,{content:C.value,color:"red","offset-x":"-5",max:"99"},{default:t(()=>[o(s,null,{default:t(()=>[n("mdi-bell")]),_:1})]),_:1},8,["content"]),o(d,{activator:"parent",location:"bottom"},{default:t(()=>[j,q,n("Click to reset ")]),_:1})]),_:1},8,["onClick"]),o(D,{class:"mx-4"},{default:t(()=>[o(s,null,{default:t(()=>[n(v(h.value),1)]),_:1})]),_:1})]),_:1})}}},X=E(z,[["__scopeId","data-v-2e0c20eb"]]);export{X as default};
