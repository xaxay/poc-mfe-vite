import {
  createRouter as p,
  createWebHistory as u
} from "vue-router";
import n from "@browser-module/config/routes";
const a = "/poc-mfe-vite",
  l = Object.entries(n.routes),
  r = l.map(([t, e]) => ({
    path: t,
    component: () => import(e.module),
    meta: {
      title: e.title
    }
  })),
  o = n.defaultPath;
o && r.push({
  path: "/:pathMatch(.*)*",
  redirect: o || "/"
});
console.log("baseUrl", a, "top level routes:", r);
const i = p({
  history: u(a),
  routes: r
});
i.beforeEach((t, e, s) => {
  r.some(c => c.path === t.path) ? (console.log("[router]", t?.path, "<=", e?.path), s()) : (console.log("[router] unknown path:", t.path, "redirecting to default path:", o || "/"), s(o || "/"))
});
export {
  o as defaultRoutePath, i as router
};
