import { _ as __nuxt_component_0 } from "./nuxt-link-V1O1A3kR.js";
import { defineComponent, ref, watch, mergeProps, withCtx, createBlock, createVNode, openBlock, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { b as useRoute } from "../server.mjs";
import "/home/user/copy/node_modules/ufo/dist/index.mjs";
import "/home/user/copy/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/home/user/copy/node_modules/hookable/dist/index.mjs";
import "/home/user/copy/node_modules/unctx/dist/index.mjs";
import "/home/user/copy/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/home/user/copy/node_modules/radix3/dist/index.mjs";
import "/home/user/copy/node_modules/defu/dist/defu.mjs";
import "/home/user/copy/node_modules/klona/dist/index.mjs";
import "/home/user/copy/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const mobileMenuOpen = ref(false);
    const route = useRoute();
    watch(() => route.path, () => {
      mobileMenuOpen.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background" }, _attrs))}><nav class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"><div class="container-custom flex h-16 items-center justify-between">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center space-x-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"${_scopeId}></path></svg><span class="text-xl font-bold"${_scopeId}>PharmFinder</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "h-8 w-8 text-primary",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                })
              ])),
              createVNode("span", { class: "text-xl font-bold" }, "PharmFinder")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden md:flex items-center space-x-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/pharmacies",
        class: "text-sm font-medium transition-colors hover:text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Pharmacies `);
          } else {
            return [
              createTextVNode(" Pharmacies ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products",
        class: "text-sm font-medium transition-colors hover:text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Produits `);
          } else {
            return [
              createTextVNode(" Produits ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/chatbot",
        class: "text-sm font-medium transition-colors hover:text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Assistant `);
          } else {
            return [
              createTextVNode(" Assistant ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/staff",
        class: "text-sm font-medium transition-colors hover:text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Personnel `);
          } else {
            return [
              createTextVNode(" Personnel ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center space-x-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/login",
        class: "hidden md:inline-flex items-center justify-center text-sm font-medium transition-colors hover:text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Connexion `);
          } else {
            return [
              createTextVNode(" Connexion ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/signup",
        class: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` S&#39;inscrire `);
          } else {
            return [
              createTextVNode(" S'inscrire ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-accent"><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">`);
      if (!unref(mobileMenuOpen)) {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`);
      } else {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`);
      }
      _push(`</svg></button></div></div>`);
      if (unref(mobileMenuOpen)) {
        _push(`<div class="md:hidden border-t"><div class="space-y-1 px-4 py-3">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/pharmacies",
          class: "block rounded-md px-3 py-2 text-base font-medium hover:bg-accent",
          onClick: ($event) => mobileMenuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Pharmacies `);
            } else {
              return [
                createTextVNode(" Pharmacies ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/products",
          class: "block rounded-md px-3 py-2 text-base font-medium hover:bg-accent",
          onClick: ($event) => mobileMenuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Produits `);
            } else {
              return [
                createTextVNode(" Produits ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/chatbot",
          class: "block rounded-md px-3 py-2 text-base font-medium hover:bg-accent",
          onClick: ($event) => mobileMenuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Assistant `);
            } else {
              return [
                createTextVNode(" Assistant ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/staff",
          class: "block rounded-md px-3 py-2 text-base font-medium hover:bg-accent",
          onClick: ($event) => mobileMenuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Personnel `);
            } else {
              return [
                createTextVNode(" Personnel ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/login",
          class: "block rounded-md px-3 py-2 text-base font-medium hover:bg-accent",
          onClick: ($event) => mobileMenuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Connexion `);
            } else {
              return [
                createTextVNode(" Connexion ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav><main>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="border-t mt-20"><div class="container-custom py-8 md:py-12"><div class="grid grid-cols-1 md:grid-cols-4 gap-8"><div><h3 class="text-lg font-semibold mb-4">PharmFinder</h3><p class="text-sm text-muted-foreground"> Trouvez les pharmacies près de chez vous et vérifiez la disponibilité des médicaments en temps réel. </p></div><div><h4 class="text-sm font-semibold mb-4">Navigation</h4><ul class="space-y-2 text-sm text-muted-foreground"><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/pharmacies",
        class: "hover:text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Pharmacies`);
          } else {
            return [
              createTextVNode("Pharmacies")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products",
        class: "hover:text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Produits`);
          } else {
            return [
              createTextVNode("Produits")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/chatbot",
        class: "hover:text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Assistant`);
          } else {
            return [
              createTextVNode("Assistant")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div><h4 class="text-sm font-semibold mb-4">Support</h4><ul class="space-y-2 text-sm text-muted-foreground"><li><a href="#" class="hover:text-primary">FAQ</a></li><li><a href="#" class="hover:text-primary">Contact</a></li><li><a href="#" class="hover:text-primary">Conditions</a></li></ul></div><div><h4 class="text-sm font-semibold mb-4">Suivez-nous</h4><div class="flex space-x-4"><a href="#" class="text-muted-foreground hover:text-primary"><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg></a><a href="#" class="text-muted-foreground hover:text-primary"><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg></a></div></div></div><div class="mt-8 border-t pt-8 text-center text-sm text-muted-foreground"><p>© 2025 PharmFinder. Tous droits réservés.</p></div></div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=default-B9kbJ_Qr.js.map
