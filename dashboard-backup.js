import {
  ref as m,
  computed as E,
  resolveComponent as t,
  openBlock as p,
  createBlock as f,
  withCtx as c,
  createVNode as s,
  createElementVNode as d,
  createElementBlock as w,
  Fragment as B,
  renderList as L,
  mergeProps as N,
  createTextVNode as v,
  toDisplayString as h,
  onMounted,
  onBeforeUnmount
} from "vue";
import {
  useRouter as Q
} from "vue-router";
import D from "@browser-module/config/routes";
import {
  _ as P
} from "../../../../_plugin-vue_export-helper-DlAUqK2U.js";

const S = {
  setup() {
    const apps = m([]),
      searchQuery = m(""),
      router = Q();

    Object.entries(D.routes).filter(([_, route]) => route.dashboard !== false).forEach(([name, route]) => {
      apps.value.push({
        name: route.title,
        icon: route.icon || "mdi-application",
        route: name
      });
    });

    const openApp = (route) => {
      router.push(route);
    };

    const filteredApps = E(() => {
      const query = searchQuery.value.toLowerCase();
      return apps.value.filter(app => !searchQuery.value || app.name.toLowerCase().includes(query));
    });

    let styleElement;

    onMounted(() => {
      styleElement = document.createElement('style');
      styleElement.textContent = STYLES;
      document.head.appendChild(styleElement);
    });

    onBeforeUnmount(() => {
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    });

    return {
      searchQuery,
      filteredApps,
      openApp
    };
  }
};

const j = {
    class: "app-grid"
  },
  z = {
    class: "icon-circle"
  },
  F = {
    class: "app-name"
  };

function I(l, n, _, a, u, i) {
  const e = t("v-text-field"),
    o = t("v-icon"),
    x = t("v-card-text"),
    g = t("v-tooltip"),
    C = t("v-card"),
    k = t("v-hover"),
    b = t("v-container");

  return p(), f(b, {
    fluid: ""
  }, {
    default: c(() => [
      s(e, {
        modelValue: a.searchQuery,
        "onUpdate:modelValue": n[0] || (n[0] = (r) => a.searchQuery = r),
        label: "Search Apps",
        flat: "",
        clearable: "",
        "prepend-inner-icon": "mdi-magnify"
      }, null, 8, ["modelValue"]),
      d("div", j, [
        (p(true), w(B, null, L(a.filteredApps, (app, index) => (p(), f(k, {
          key: app.name
        }, {
          default: c(({
            isHovering,
            props
          }) => [
            s(C, N({
              onClick: () => a.openApp(app.route),
              class: "app-card",
              elevation: isHovering ? 16 : 2,
              ref_for: true
            }, props, {
              color: index % 2 === 0 ? "green" : "blue"
            }), {
              default: c(() => [
                s(x, {
                  class: "text-center"
                }, {
                  default: c(() => [
                    d("div", z, [
                      s(o, {
                        class: "app-icon",
                        size: "5rem"
                      }, {
                        default: c(() => [v(h(app.icon), 1)]),
                        _: 2
                      }, 1024)
                    ]),
                    d("div", F, h(app.name), 1)
                  ]),
                  _: 2
                }, 1024),
                s(g, {
                  activator: "parent",
                  location: "top",
                  offset: "-10"
                }, {
                  default: c(() => [v("Click to open")]),
                  _: 1
                })
              ]),
              _: 2
            }, 1040, ["onClick", "elevation", "color"])
          ]),
          _: 2
        }, 1024))), 128))
      ])
    ]),
    _: 1
  });
}

const q = P(S, [
  ["render", I],
  ["__scopeId", "data-v-9228c309"]
]);

export default q;

const STYLES = /*css*/ `
.app-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 1rem;
  justify-items: center;
}

.app-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  width: 10rem;
  height: 15rem;
  cursor: pointer;
  padding-top: 0rem;
}

.icon-circle {
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7rem;
  height: 7rem;
  margin: 0 auto 1rem auto;
}

.app-icon {
  color: black;
}

.app-name {
  font-size: 1.2rem;
  line-height: 1.3rem;
}
`;
