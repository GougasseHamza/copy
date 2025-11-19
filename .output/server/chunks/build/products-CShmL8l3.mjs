import { _ as __nuxt_component_0 } from './nuxt-layout-cRFj3n2g.mjs';
import { mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = __nuxt_component_0;
  _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "default" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="container-custom py-8"${_scopeId}><h1 class="text-4xl font-bold mb-8"${_scopeId}>Products</h1><p${_scopeId}>Products page - To be implemented</p></div>`);
      } else {
        return [
          createVNode("div", { class: "container-custom py-8" }, [
            createVNode("h1", { class: "text-4xl font-bold mb-8" }, "Products"),
            createVNode("p", null, "Products page - To be implemented")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const products = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { products as default };
//# sourceMappingURL=products-CShmL8l3.mjs.map
