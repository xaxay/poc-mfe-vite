import{components as w}from"vuetify";import{defineComponent as C,ref as g,openBlock as u,createBlock as m,withCtx as t,createTextVNode as i,createVNode as n,createElementBlock as h,Fragment as V,toDisplayString as d,createCommentVNode as D,renderList as U,onMounted as k,onBeforeUnmount as b,computed as L,resolveComponent as N}from"vue";import{navigateTo as A,getCurrentRoute as I}from"@browser-module/api/nav";import{getUserLogin as y}from"@browser-module/api/user";import{useRoute as S}from"vue-router";import{_ as T}from"./--plugin-vue--export-helper-DlAUqK2U.js";const B=async e=>{if(!e)return[];const r=y();if(!r.includes(e))return[];const o=[{name:e}];return e!==r&&r.includes(e)&&o.unshift({name:r}),o},M=async e=>{if(!e)return null;const r=y();if(e!=r)return null;const o=["account","rumors","app4","app5","app6","app7","app8","app9","app11","app12","app13","app14","app15","app16","app17","app18"];return e==="admin"&&o.push("admin"),o.sort(E),{name:e,permissions:o}},E=(e,r)=>{const o=/(\D+)(\d+)?/,c=e.match(o),p=r.match(o);if(!c||!p)throw new Error("Unexpected non-matching string format");const[,_,s]=c,[,l,a]=p;return _<l?-1:_>l?1:s!==void 0&&a!==void 0?parseInt(s)-parseInt(a):s!==void 0?-1:a!==void 0?1:0},Q=C({name:"SearchUser",setup(){const e=g(""),r=g([]);return{searchQuery:e,users:r,searchUsers:async()=>{e.value.length>2?r.value=await B(e.value):r.value=[]},goToUserDetails:p=>{A({path:`/admin/users/details/${p}`})}}}}),{VTextField:F,VListItemTitle:P,VListItem:R,VList:z,VContainer:W}=w;function j(e,r,o,c,p,_){return u(),m(W,{fluid:""},{default:t(()=>[i(" Search: "),n(F,{modelValue:e.searchQuery,"onUpdate:modelValue":r[0]||(r[0]=s=>e.searchQuery=s),label:"Input user name",flat:"",clearable:"","prepend-inner-icon":"mdi-magnify",onInput:e.searchUsers},null,8,["modelValue","onInput"]),e.users.length?(u(),h(V,{key:0},[i(" Found user"+d(e.users.length>1?"s":"")+" ",1),e.users.length>1||!e.users.map(s=>s.name).includes(e.searchQuery)?(u(),h(V,{key:0},[i(" with name like *"+d(e.searchQuery)+"* ",1)],64)):D("",!0),n(z,null,{default:t(()=>[(u(!0),h(V,null,U(e.users,s=>(u(),m(R,{key:s.name,onClick:l=>e.goToUserDetails(s.name)},{default:t(()=>[n(P,null,{default:t(()=>[i(d(s.name),1)]),_:2},1024)]),_:2},1032,["onClick"]))),128))]),_:1})],64)):D("",!0)]),_:1})}const q=T(Q,[["render",j]]),G=C({name:"UserDetails",setup(){const e=S(),r=g(null);return k(async()=>{const o=e.params.name;o&&(r.value=await M(o))}),{userDetails:r}}}),{VIcon:H,VAvatar:J,VCol:v,VRow:$,VCardTitle:K,VDivider:O,VChip:X,VCardText:Y,VCard:Z,VContainer:x}=w;function ee(e,r,o,c,p,_){return u(),m(x,null,{default:t(()=>[n($,{justify:"center"},{default:t(()=>[n(v,{cols:"12"},{default:t(()=>[n(Z,{class:"pa-2"},{default:t(()=>[n(K,null,{default:t(()=>[n($,{align:"center"},{default:t(()=>[n(v,{cols:"auto"},{default:t(()=>[n(J,null,{default:t(()=>[n(H,null,{default:t(()=>[i("mdi-account")]),_:1})]),_:1})]),_:1}),n(v,null,{default:t(()=>[i(d(e.userDetails?.name),1)]),_:1})]),_:1})]),_:1}),n(O),n(Y,null,{default:t(()=>[n($,null,{default:t(()=>[n(v,{cols:"12"},{default:t(()=>[i(" Permissions: ")]),_:1})]),_:1}),n($,null,{default:t(()=>[(u(!0),h(V,null,U(e.userDetails?.permissions,s=>(u(),m(v,{key:s,cols:"auto"},{default:t(()=>[n(X,null,{default:t(()=>[i(d(s),1)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}const te=T(G,[["render",ee]]);function $e(e){return[{path:"users",component:q,alias:["","users"]},{path:"users/details/:name",component:te},{path:":pathMatch(.*)*",redirect:`${e}/users`}]}const ne=C({name:"Admin",setup(){const e=g(!0),r=y(),o=g(!1),c=()=>{const a=parseFloat(getComputedStyle(document.documentElement).fontSize);o.value=window.innerWidth>=a*40};k(()=>{c(),window.addEventListener("resize",c)}),b(()=>{window.removeEventListener("resize",c)});const p=L(()=>[{title:"Users",icon:"mdi-account-search-outline",exact:!0,path:"/admin/users",alias:"/admin"},{title:"User",icon:"mdi-account-outline",exact:!1,path:"/admin/users/details/",pathClcik:`/admin/users/details/${r}`,altTitle:"User (Me)"}]);function _(a){const f=I().path;return a.exact?!!(f===a.path||a.alias&&f===a.alias):!!f.startsWith(a.path)}function s(a){const f=I().path;return a.pathClcik&&f===a.pathClcik&&a.altTitle||a.title}function l(){e.value=!e.value}return{drawer:e,items:p,isActive:_,getTitle:s,toggleDrawer:l,isLargeScreen:o}}}),{VAppBarNavIcon:re,VToolbarTitle:ae,VAppBar:oe,VIcon:se,VListItemTitle:le,VListItem:ue,VList:ie,VNavigationDrawer:ce,VMain:pe,VApp:_e}=w;function de(e,r,o,c,p,_){const s=N("router-view");return u(),m(_e,null,{default:t(()=>[n(oe,{app:""},{default:t(()=>[n(re,{onClick:e.toggleDrawer},null,8,["onClick"]),n(ae,null,{default:t(()=>[i("Admin Panel")]),_:1})]),_:1}),n(ce,{modelValue:e.drawer,"onUpdate:modelValue":r[0]||(r[0]=l=>e.drawer=l),app:"",clipped:e.isLargeScreen,permanent:e.isLargeScreen},{default:t(()=>[n(ie,{dense:""},{default:t(()=>[(u(!0),h(V,null,U(e.items,(l,a)=>(u(),m(ue,{key:a,to:l.pathClcik||l.path,router:"",active:e.isActive(l)},{prepend:t(()=>[n(se,null,{default:t(()=>[i(d(l.icon),1)]),_:2},1024)]),default:t(()=>[n(le,null,{default:t(()=>[i(d(e.getTitle(l)),1)]),_:2},1024)]),_:2},1032,["to","active"]))),128))]),_:1})]),_:1},8,["modelValue","clipped","permanent"]),n(pe,null,{default:t(()=>[n(s)]),_:1})]),_:1})}const we=T(ne,[["render",de]]);export{$e as createRouteChildren,we as default};
