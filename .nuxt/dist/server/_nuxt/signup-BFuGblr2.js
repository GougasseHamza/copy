import { _ as __nuxt_component_0 } from "./nuxt-layout-cRFj3n2g.js";
import { mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "../server.mjs";
import "/home/user/copy/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/home/user/copy/node_modules/hookable/dist/index.mjs";
import "/home/user/copy/node_modules/unctx/dist/index.mjs";
import "/home/user/copy/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/home/user/copy/node_modules/radix3/dist/index.mjs";
import "/home/user/copy/node_modules/defu/dist/defu.mjs";
import "/home/user/copy/node_modules/ufo/dist/index.mjs";
import "/home/user/copy/node_modules/klona/dist/index.mjs";
import "/home/user/copy/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = __nuxt_component_0;
  _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "default" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="container-custom py-8"${_scopeId}><h1 class="text-4xl font-bold mb-8"${_scopeId}>Sign Up</h1><p${_scopeId}>Signup page - To be implemented</p></div>`);
      } else {
        return [
          createVNode("div", { class: "container-custom py-8" }, [
            createVNode("h1", { class: "text-4xl font-bold mb-8" }, "Sign Up"),
            createVNode("p", null, "Signup page - To be implemented")
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/signup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const signup = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  signup as default
};
//# sourceMappingURL=signup-BFuGblr2.js.map
