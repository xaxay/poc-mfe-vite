let n="",i=[];function t(){return n===""}function u(){return n!==""}function s(){return n==="admin"}function e(){return n}async function a(p,r){return p===""||p!==r?!1:(n=p,i=["account","rumors","app4","app5","app6","app7","app8","app9","app10","app11","app12","app13","app14","app15","app16"],p==="admin"&&i.push("admin"),!0)}async function o(){n=""}async function c(){return[...i]}export{e as getUserLogin,c as getUserPermissions,s as isAdmin,t as isGuest,u as isLogined,a as login,o as logout};