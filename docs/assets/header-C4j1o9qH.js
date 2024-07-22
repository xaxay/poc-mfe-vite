import{components as D}from"vuetify";import{defineComponent as E,ref as v,computed as a,onMounted as F,onUnmounted as N,openBlock as s,createBlock as h,withCtx as t,createVNode as o,createElementVNode as e,toDisplayString as r,createElementBlock as H,Fragment as M,createTextVNode as n,createCommentVNode as b,unref as g,pushScopeId as T,popScopeId as Z,onMounted as onM, onUnmounted as onU}from"vue";import{useCounterStore as y}from"@browser-module/stores/counter";import{router as i}from"@browser-module/router";import A from"@browser-module/config/routes";import{getUserLogin as P,isLogined as R,getExpiredInSeconds as C,logout as U}from"@browser-module/api/user";import{_ as j}from"./--plugin-vue--export-helper-DlAUqK2U.js";const q="data:image/svg+xml,%3csvg%20width='512'%20height='512'%20viewBox='0%200%20512%20512'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M261.126%20140.65L164.624%20307.732L256.001%20466L377.028%20256.5L498.001%2047H315.192L261.126%20140.65Z'%20fill='%231697F6'/%3e%3cpath%20d='M135.027%20256.5L141.365%20267.518L231.64%20111.178L268.731%2047H256H14L135.027%20256.5Z'%20fill='%23AEDDFF'/%3e%3cpath%20d='M315.191%2047C360.935%20197.446%20256%20466%20256%20466L164.624%20307.732L315.191%2047Z'%20fill='%231867C0'/%3e%3cpath%20d='M268.731%2047C76.0026%2047%20141.366%20267.518%20141.366%20267.518L268.731%2047Z'%20fill='%237BC6FF'/%3e%3c/svg%3e",{VImg:z,VToolbarTitle:G,VIcon:u,VTooltip:_,VBtn:d,VBadge:J,VAvatar:K,VAppBar:O}=D,l=c=>(T("data-v-2b044b92"),c=c(),Z(),c),Q={class:"title"},W=l(()=>e("b",null,"Dashboard",-1)),X=l(()=>e("br",null,null,-1)),Y=l(()=>e("b",null,"Notifications",-1)),$=l(()=>e("br",null,null,-1)),tt=l(()=>e("br",null,null,-1)),ot=l(()=>e("br",null,null,-1)),et=E({__name:"Header",setup(c){let sE;onM(()=>{sE=document.createElement('style');sE.textContent=`.logo[data-v-2b044b92]{max-width:2rem}.title[data-v-2b044b92]{font-size:1.5rem}
`;document.head.appendChild(sE);});onU(()=>{if(sE){document.head.removeChild(sE);}});const p=y(),x=v("mdi-account"),L=a(()=>i.currentRoute.value.path===A.defaultPath),k=a(()=>i.currentRoute.value.meta.title||""),I=a(()=>p.counter),V=a(()=>P()),w=a(()=>R()),m=v(C()),B=()=>{m.value=C()},S=()=>{i.push("/dashboard")};return F(()=>{const f=setInterval(B,1e3);N(()=>{clearInterval(f)})}),(f,nt)=>(s(),h(O,{app:""},{default:t(()=>[o(z,{src:q,alt:"Logo",class:"logo","max-width":"5rem"}),o(G,null,{default:t(()=>[e("span",Q,r(k.value),1)]),_:1}),w.value?(s(),H(M,{key:0},[L.value?b("",!0):(s(),h(d,{key:0,icon:"",onClick:S},{default:t(()=>[o(u,null,{default:t(()=>[n("mdi-view-dashboard")]),_:1}),o(_,{activator:"parent",location:"bottom"},{default:t(()=>[W,X,n("Click to open ")]),_:1})]),_:1})),o(d,{icon:"",onClick:g(p).resetCounter},{default:t(()=>[o(J,{content:I.value,color:"red","offset-x":"-5",max:"99"},{default:t(()=>[o(u,null,{default:t(()=>[n("mdi-bell")]),_:1})]),_:1},8,["content"]),o(_,{activator:"parent",location:"bottom"},{default:t(()=>[Y,$,n("Click to reset ")]),_:1})]),_:1},8,["onClick"]),o(d,{icon:"",onClick:g(U),class:"mx-4"},{default:t(()=>[o(K,null,{default:t(()=>[o(u,null,{default:t(()=>[n(r(x.value),1)]),_:1}),o(_,{activator:"parent",location:"bottom"},{default:t(()=>[e("b",null,r(V.value),1),tt,n("Expired in: "+r(m.value)+" seconds. ",1),ot,n("Click to logout ")]),_:1})]),_:1})]),_:1},8,["onClick"])],64)):b("",!0)]),_:1}))}}),_t=j(et,[["__scopeId","data-v-2b044b92"]]);export{_t as default};
