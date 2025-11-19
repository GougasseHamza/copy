import { _ as __nuxt_component_0 } from "./nuxt-layout-cRFj3n2g.js";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-V1O1A3kR.js";
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createTextVNode, createVNode, createBlock, withDirectives, openBlock, isRef, vModelText, createCommentVNode, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { u as useHead, n as navigateTo } from "../server.mjs";
import "vue-router";
import "/home/user/copy/node_modules/ufo/dist/index.mjs";
import "/home/user/copy/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/home/user/copy/node_modules/hookable/dist/index.mjs";
import "/home/user/copy/node_modules/unctx/dist/index.mjs";
import "/home/user/copy/node_modules/h3/dist/index.mjs";
import "/home/user/copy/node_modules/radix3/dist/index.mjs";
import "/home/user/copy/node_modules/defu/dist/defu.mjs";
import "/home/user/copy/node_modules/klona/dist/index.mjs";
import "/home/user/copy/node_modules/@unhead/vue/dist/index.mjs";
const mockPharmacies = [
  {
    id: "1",
    name: "Pharmacie Centrale",
    address: "45 Boulevard Mohammed V",
    city: "Casablanca",
    phone: "+212 522 123456",
    latitude: 33.5731,
    longitude: -7.5898,
    isOpen: true,
    rating: 4.5,
    reviewCount: 128,
    distance: 0.5,
    image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400"
  },
  {
    id: "2",
    name: "Pharmacie Al Amal",
    address: "12 Rue Allal Ben Abdellah",
    city: "Casablanca",
    phone: "+212 522 234567",
    latitude: 33.5891,
    longitude: -7.6114,
    isOpen: true,
    rating: 4.7,
    reviewCount: 95,
    distance: 1.2,
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400"
  },
  {
    id: "3",
    name: "Pharmacie de Nuit",
    address: "78 Avenue Hassan II",
    city: "Casablanca",
    phone: "+212 522 345678",
    latitude: 33.5651,
    longitude: -7.6032,
    isOpen: false,
    nextOpenTime: "20:00",
    rating: 4.2,
    reviewCount: 64,
    distance: 2.1,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400"
  },
  {
    id: "4",
    name: "Pharmacie Atlas",
    address: "23 Rue de Fès",
    city: "Casablanca",
    phone: "+212 522 456789",
    latitude: 33.5821,
    longitude: -7.6189,
    isOpen: true,
    rating: 4.6,
    reviewCount: 112,
    distance: 3.5,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400"
  },
  {
    id: "5",
    name: "Pharmacie Moderne",
    address: "56 Boulevard Zerktouni",
    city: "Casablanca",
    phone: "+212 522 567890",
    latitude: 33.5771,
    longitude: -7.6321,
    isOpen: true,
    rating: 4.8,
    reviewCount: 156,
    distance: 4.2,
    image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400"
  }
];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "pharmacies",
  __ssrInlineRender: true,
  setup(__props) {
    gsap.registerPlugin(ScrollTrigger);
    const searchQuery = ref("");
    const viewMode = ref("list");
    const filterOpen = ref(true);
    const selectedPharmacy = ref(null);
    const headerSection = ref(null);
    const searchSection = ref(null);
    const pharmacyCards = ref([]);
    const filteredPharmacies = computed(() => {
      let pharmacies = [...mockPharmacies];
      if (searchQuery.value) {
        pharmacies = pharmacies.filter(
          (p) => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || p.address.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      if (filterOpen.value) {
        pharmacies = pharmacies.filter((p) => p.isOpen);
      }
      return pharmacies;
    });
    const selectPharmacy = (pharmacy) => {
      selectedPharmacy.value = pharmacy;
      if (viewMode.value === "list") {
        navigateTo(`/pharmacy/${pharmacy.id}`);
      }
    };
    useHead({
      title: "Pharmacies - PharmFinder",
      meta: [
        { name: "description", content: "Trouvez les pharmacies ouvertes près de chez vous au Maroc" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "default" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container-custom py-8"${_scopeId}><div class="mb-8"${_scopeId}><h1 class="text-4xl font-bold mb-2"${_scopeId}>Pharmacies à proximité</h1><p class="text-muted-foreground"${_scopeId}>Trouvez les pharmacies ouvertes près de chez vous</p></div><div class="mb-6 space-y-4"${_scopeId}><div class="flex flex-col md:flex-row gap-4"${_scopeId}><div class="flex-1 relative"${_scopeId}><svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg><input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Rechercher une pharmacie..." class="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"${_scopeId}></div><div class="flex gap-2 p-1 bg-muted rounded-lg"${_scopeId}><button class="${ssrRenderClass([
              "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
              unref(viewMode) === "list" ? "bg-background shadow-sm" : "hover:bg-background/50"
            ])}"${_scopeId}><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"${_scopeId}></path></svg><span class="hidden sm:inline"${_scopeId}>Liste</span></button><button class="${ssrRenderClass([
              "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
              unref(viewMode) === "map" ? "bg-background shadow-sm" : "hover:bg-background/50"
            ])}"${_scopeId}><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"${_scopeId}></path></svg><span class="hidden sm:inline"${_scopeId}>Carte</span></button></div></div><div class="flex flex-wrap gap-2"${_scopeId}><button class="${ssrRenderClass([
              "px-4 py-2 rounded-lg border transition-colors",
              unref(filterOpen) ? "bg-primary text-primary-foreground" : "hover:bg-accent"
            ])}"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg> Ouvertes maintenant </div></button><button class="px-4 py-2 rounded-lg border hover:bg-accent transition-colors"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"${_scopeId}></path></svg> Note 4+ </div></button><button class="px-4 py-2 rounded-lg border hover:bg-accent transition-colors"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"${_scopeId}></path></svg> Distance </div></button></div></div><div class="grid md:grid-cols-3 gap-6"${_scopeId}><div class="${ssrRenderClass(unref(viewMode) === "map" ? "md:col-span-2" : "md:col-span-3")}"${_scopeId}>`);
            if (unref(viewMode) === "list") {
              _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(unref(filteredPharmacies), (pharmacy, index) => {
                _push2(`<div class="group bg-card rounded-lg border p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"${_scopeId}><div class="flex gap-4"${_scopeId}><div class="flex-shrink-0"${_scopeId}><img${ssrRenderAttr("src", pharmacy.image)}${ssrRenderAttr("alt", pharmacy.name)} class="w-24 h-24 rounded-lg object-cover"${_scopeId}></div><div class="flex-1 min-w-0"${_scopeId}><div class="flex items-start justify-between mb-2"${_scopeId}><div${_scopeId}><h3 class="text-lg font-semibold group-hover:text-primary transition-colors"${_scopeId}>${ssrInterpolate(pharmacy.name)}</h3><p class="text-sm text-muted-foreground"${_scopeId}>${ssrInterpolate(pharmacy.address)}</p></div><div class="${ssrRenderClass([
                  "px-3 py-1 rounded-full text-xs font-medium",
                  pharmacy.isOpen ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                ])}"${_scopeId}>${ssrInterpolate(pharmacy.isOpen ? "Ouverte" : "Fermée")}</div></div><div class="flex items-center gap-4 text-sm text-muted-foreground mb-3"${_scopeId}><div class="flex items-center gap-1"${_scopeId}><svg class="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"${_scopeId}></path></svg><span class="font-medium"${_scopeId}>${ssrInterpolate(pharmacy.rating)}</span><span${_scopeId}>(${ssrInterpolate(pharmacy.reviewCount)})</span></div><div class="flex items-center gap-1"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(pharmacy.distance)} km</span></div></div><div class="flex items-center gap-2"${_scopeId}><button class="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"${_scopeId}> Voir les produits </button><button class="px-4 py-2 border rounded-md hover:bg-accent transition-colors"${_scopeId}><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"${_scopeId}></path></svg></button></div></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="bg-card rounded-lg border overflow-hidden" style="${ssrRenderStyle({ "height": "600px" })}"${_scopeId}><div class="w-full h-full flex items-center justify-center bg-muted"${_scopeId}><div class="text-center"${_scopeId}><svg class="h-16 w-16 mx-auto text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"${_scopeId}></path></svg><p class="text-muted-foreground"${_scopeId}>Carte Google Maps</p><p class="text-sm text-muted-foreground mt-2"${_scopeId}>Intégration en cours de développement</p></div></div></div>`);
            }
            _push2(`</div>`);
            if (unref(viewMode) === "map" && unref(selectedPharmacy)) {
              _push2(`<div class="bg-card rounded-lg border p-6"${_scopeId}><h3 class="text-xl font-semibold mb-4"${_scopeId}>${ssrInterpolate(unref(selectedPharmacy).name)}</h3><div class="space-y-4"${_scopeId}><div${_scopeId}><p class="text-sm text-muted-foreground mb-1"${_scopeId}>Adresse</p><p class="font-medium"${_scopeId}>${ssrInterpolate(unref(selectedPharmacy).address)}</p></div><div${_scopeId}><p class="text-sm text-muted-foreground mb-1"${_scopeId}>Téléphone</p><p class="font-medium"${_scopeId}>${ssrInterpolate(unref(selectedPharmacy).phone)}</p></div><div${_scopeId}><p class="text-sm text-muted-foreground mb-1"${_scopeId}>Statut</p><div class="${ssrRenderClass([
                "inline-block px-3 py-1 rounded-full text-sm font-medium",
                unref(selectedPharmacy).isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              ])}"${_scopeId}>${ssrInterpolate(unref(selectedPharmacy).isOpen ? "Ouverte" : "Fermée")}</div></div><div${_scopeId}><p class="text-sm text-muted-foreground mb-1"${_scopeId}>Évaluation</p><div class="flex items-center gap-2"${_scopeId}><div class="flex"${_scopeId}><!--[-->`);
              ssrRenderList(5, (i) => {
                _push2(`<svg class="${ssrRenderClass([
                  "h-5 w-5",
                  i <= Math.floor(unref(selectedPharmacy).rating) ? "text-yellow-500" : "text-gray-300"
                ])}" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"${_scopeId}></path></svg>`);
              });
              _push2(`<!--]--></div><span class="text-sm"${_scopeId}>${ssrInterpolate(unref(selectedPharmacy).rating)} (${ssrInterpolate(unref(selectedPharmacy).reviewCount)} avis)</span></div></div>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: `/pharmacy/${unref(selectedPharmacy).id}`,
                class: "block w-full text-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Voir les détails `);
                  } else {
                    return [
                      createTextVNode(" Voir les détails ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "container-custom py-8" }, [
                createVNode("div", {
                  class: "mb-8",
                  ref_key: "headerSection",
                  ref: headerSection
                }, [
                  createVNode("h1", { class: "text-4xl font-bold mb-2" }, "Pharmacies à proximité"),
                  createVNode("p", { class: "text-muted-foreground" }, "Trouvez les pharmacies ouvertes près de chez vous")
                ], 512),
                createVNode("div", {
                  class: "mb-6 space-y-4",
                  ref_key: "searchSection",
                  ref: searchSection
                }, [
                  createVNode("div", { class: "flex flex-col md:flex-row gap-4" }, [
                    createVNode("div", { class: "flex-1 relative" }, [
                      (openBlock(), createBlock("svg", {
                        class: "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        })
                      ])),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                        type: "text",
                        placeholder: "Rechercher une pharmacie...",
                        class: "w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(searchQuery)]
                      ])
                    ]),
                    createVNode("div", { class: "flex gap-2 p-1 bg-muted rounded-lg" }, [
                      createVNode("button", {
                        onClick: ($event) => viewMode.value = "list",
                        class: [
                          "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                          unref(viewMode) === "list" ? "bg-background shadow-sm" : "hover:bg-background/50"
                        ]
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "h-5 w-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M4 6h16M4 10h16M4 14h16M4 18h16"
                          })
                        ])),
                        createVNode("span", { class: "hidden sm:inline" }, "Liste")
                      ], 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => viewMode.value = "map",
                        class: [
                          "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                          unref(viewMode) === "map" ? "bg-background shadow-sm" : "hover:bg-background/50"
                        ]
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "h-5 w-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                          })
                        ])),
                        createVNode("span", { class: "hidden sm:inline" }, "Carte")
                      ], 10, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-wrap gap-2" }, [
                    createVNode("button", {
                      onClick: ($event) => filterOpen.value = !unref(filterOpen),
                      class: [
                        "px-4 py-2 rounded-lg border transition-colors",
                        unref(filterOpen) ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                      ]
                    }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        (openBlock(), createBlock("svg", {
                          class: "h-4 w-4",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          })
                        ])),
                        createTextVNode(" Ouvertes maintenant ")
                      ])
                    ], 10, ["onClick"]),
                    createVNode("button", { class: "px-4 py-2 rounded-lg border hover:bg-accent transition-colors" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        (openBlock(), createBlock("svg", {
                          class: "h-4 w-4",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          })
                        ])),
                        createTextVNode(" Note 4+ ")
                      ])
                    ]),
                    createVNode("button", { class: "px-4 py-2 rounded-lg border hover:bg-accent transition-colors" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        (openBlock(), createBlock("svg", {
                          class: "h-4 w-4",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          })
                        ])),
                        createTextVNode(" Distance ")
                      ])
                    ])
                  ])
                ], 512),
                createVNode("div", { class: "grid md:grid-cols-3 gap-6" }, [
                  createVNode("div", {
                    class: unref(viewMode) === "map" ? "md:col-span-2" : "md:col-span-3"
                  }, [
                    unref(viewMode) === "list" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredPharmacies), (pharmacy, index) => {
                        return openBlock(), createBlock("div", {
                          key: pharmacy.id,
                          ref_for: true,
                          ref_key: "pharmacyCards",
                          ref: pharmacyCards,
                          class: "group bg-card rounded-lg border p-6 hover:shadow-lg transition-all duration-300 cursor-pointer",
                          onClick: ($event) => selectPharmacy(pharmacy)
                        }, [
                          createVNode("div", { class: "flex gap-4" }, [
                            createVNode("div", { class: "flex-shrink-0" }, [
                              createVNode("img", {
                                src: pharmacy.image,
                                alt: pharmacy.name,
                                class: "w-24 h-24 rounded-lg object-cover"
                              }, null, 8, ["src", "alt"])
                            ]),
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("div", { class: "flex items-start justify-between mb-2" }, [
                                createVNode("div", null, [
                                  createVNode("h3", { class: "text-lg font-semibold group-hover:text-primary transition-colors" }, toDisplayString(pharmacy.name), 1),
                                  createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(pharmacy.address), 1)
                                ]),
                                createVNode("div", {
                                  class: [
                                    "px-3 py-1 rounded-full text-xs font-medium",
                                    pharmacy.isOpen ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                  ]
                                }, toDisplayString(pharmacy.isOpen ? "Ouverte" : "Fermée"), 3)
                              ]),
                              createVNode("div", { class: "flex items-center gap-4 text-sm text-muted-foreground mb-3" }, [
                                createVNode("div", { class: "flex items-center gap-1" }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "h-4 w-4 text-yellow-500",
                                    fill: "currentColor",
                                    viewBox: "0 0 20 20"
                                  }, [
                                    createVNode("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
                                  ])),
                                  createVNode("span", { class: "font-medium" }, toDisplayString(pharmacy.rating), 1),
                                  createVNode("span", null, "(" + toDisplayString(pharmacy.reviewCount) + ")", 1)
                                ]),
                                createVNode("div", { class: "flex items-center gap-1" }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "h-4 w-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    })
                                  ])),
                                  createVNode("span", null, toDisplayString(pharmacy.distance) + " km", 1)
                                ])
                              ]),
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode("button", { class: "flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors" }, " Voir les produits "),
                                createVNode("button", { class: "px-4 py-2 border rounded-md hover:bg-accent transition-colors" }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "h-5 w-5",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    })
                                  ]))
                                ])
                              ])
                            ])
                          ])
                        ], 8, ["onClick"]);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "bg-card rounded-lg border overflow-hidden",
                      style: { "height": "600px" }
                    }, [
                      createVNode("div", { class: "w-full h-full flex items-center justify-center bg-muted" }, [
                        createVNode("div", { class: "text-center" }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-16 w-16 mx-auto text-muted-foreground mb-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                            })
                          ])),
                          createVNode("p", { class: "text-muted-foreground" }, "Carte Google Maps"),
                          createVNode("p", { class: "text-sm text-muted-foreground mt-2" }, "Intégration en cours de développement")
                        ])
                      ])
                    ]))
                  ], 2),
                  unref(viewMode) === "map" && unref(selectedPharmacy) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-card rounded-lg border p-6"
                  }, [
                    createVNode("h3", { class: "text-xl font-semibold mb-4" }, toDisplayString(unref(selectedPharmacy).name), 1),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm text-muted-foreground mb-1" }, "Adresse"),
                        createVNode("p", { class: "font-medium" }, toDisplayString(unref(selectedPharmacy).address), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm text-muted-foreground mb-1" }, "Téléphone"),
                        createVNode("p", { class: "font-medium" }, toDisplayString(unref(selectedPharmacy).phone), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm text-muted-foreground mb-1" }, "Statut"),
                        createVNode("div", {
                          class: [
                            "inline-block px-3 py-1 rounded-full text-sm font-medium",
                            unref(selectedPharmacy).isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          ]
                        }, toDisplayString(unref(selectedPharmacy).isOpen ? "Ouverte" : "Fermée"), 3)
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm text-muted-foreground mb-1" }, "Évaluation"),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode("div", { class: "flex" }, [
                            (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                              return createVNode("svg", {
                                key: i,
                                class: [
                                  "h-5 w-5",
                                  i <= Math.floor(unref(selectedPharmacy).rating) ? "text-yellow-500" : "text-gray-300"
                                ],
                                fill: "currentColor",
                                viewBox: "0 0 20 20"
                              }, [
                                createVNode("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
                              ], 2);
                            }), 64))
                          ]),
                          createVNode("span", { class: "text-sm" }, toDisplayString(unref(selectedPharmacy).rating) + " (" + toDisplayString(unref(selectedPharmacy).reviewCount) + " avis)", 1)
                        ])
                      ]),
                      createVNode(_component_NuxtLink, {
                        to: `/pharmacy/${unref(selectedPharmacy).id}`,
                        class: "block w-full text-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Voir les détails ")
                        ]),
                        _: 1
                      }, 8, ["to"])
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pharmacies.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=pharmacies-De_egLKF.js.map
