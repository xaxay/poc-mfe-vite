import { components as V } from "vuetify";
import { ref as m, computed as x, openBlock as i, createBlock as u, withCtx as c, createVNode as a, createElementVNode as l, createElementBlock as C, Fragment as g, renderList as b, mergeProps as k, createTextVNode as f, toDisplayString as v, onMounted as onM, onUnmounted as onU } from "vue";
import { router as A } from "@browser-module/router";
import y from "@browser-module/config/routes";
import { getUserPermissions as w } from "@browser-module/api/user";
import { _ as E } from "./--plugin-vue--export-helper-DlAUqK2U.js";
const T = {
        setup() {
            let sE;
            onM(() => {
                sE = document.createElement('style');
                sE.textContent = `.app-grid[data-v-33e34672]{display:grid;grid-template-columns:repeat(auto-fill,minmax(10rem,1fr));gap:1rem;justify-items:center}.app-card[data-v-33e34672]{display:flex;flex-direction:column;align-items:center;justify-content:top;width:10rem;height:15rem;cursor:pointer;padding-top:0rem}.icon-circle[data-v-33e34672]{background-color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;width:7rem;height:7rem;margin:0 auto 1rem}.app-icon[data-v-33e34672]{color:#000}.app-name[data-v-33e34672]{font-size:1.2rem;line-height:1.3rem}
`;
                document.head.appendChild(sE);
            });
            onU(() => { if (sE) { document.head.removeChild(sE); } });
            const s = m([]),
                r = m(""),
                p = Object.entries(y.routes),
                n = w();

            function d(e) { return n.includes(e) }
            p.filter(([e, t]) => t.dashboard === !0 && d(e.substring(1))).forEach(([e, t]) => { s.value.push({ name: t.title, icon: t.icon || "mdi-application", path: e }) });
            const _ = e => { A.push(e) },
                o = x(() => { const e = r.value.toLowerCase(); return s.value.filter(t => !r.value || t.name.toLowerCase().includes(e)) });
            return { searchQuery: r, filteredApps: o, openApp: _ }
        }
    },
    { VTextField: B, VIcon: L, VCardText: N, VTooltip: Q, VCard: D, VHover: F, VContainer: I } = V,
    P = { class: "app-grid" },
    S = { class: "icon-circle" },
    U = { class: "app-name" };

function j(s, r, p, n, d, _) { return i(), u(I, { fluid: "" }, { default: c(() => [a(B, { modelValue: n.searchQuery, "onUpdate:modelValue": r[0] || (r[0] = o => n.searchQuery = o), label: "Search Apps", flat: "", clearable: "", "prepend-inner-icon": "mdi-magnify" }, null, 8, ["modelValue"]), l("div", P, [(i(!0), C(g, null, b(n.filteredApps, (o, e) => (i(), u(F, { key: o.name }, { default: c(({ isHovering: t, props: h }) => [a(D, k({ onClick: z => n.openApp(o.path), class: "app-card", elevation: t ? 16 : 2, ref_for: !0 }, h, { color: e % 2 === 0 ? "green" : "blue" }), { default: c(() => [a(N, { class: "text-center" }, { default: c(() => [l("div", S, [a(L, { class: "app-icon", size: "5rem" }, { default: c(() => [f(v(o.icon), 1)]), _: 2 }, 1024)]), l("div", U, v(o.name), 1)]), _: 2 }, 1024), a(Q, { activator: "parent", location: "top", offset: "-10" }, { default: c(() => [f("Click to open")]), _: 1 })]), _: 2 }, 1040, ["onClick", "elevation", "color"])]), _: 2 }, 1024))), 128))])]), _: 1 }) }
const K = E(T, [
    ["render", j],
    ["__scopeId", "data-v-33e34672"]
]);
export { K as default };