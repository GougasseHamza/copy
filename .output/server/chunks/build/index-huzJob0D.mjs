import { _ as __nuxt_component_0 } from './nuxt-layout-cRFj3n2g.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-V1O1A3kR.mjs';
import { defineComponent, useSSRContext, ref, mergeProps, unref, watch, resolveDirective, withCtx, createBlock, createTextVNode, openBlock, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrGetDirectiveProps, ssrRenderComponent } from 'vue/server-renderer';
import { gsap } from 'gsap';
import { S as ScrollTrigger } from '../_/ScrollTrigger.mjs';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { u as useHead } from './server.mjs';
import 'vue-router';
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

function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Globe",
  __ssrInlineRender: true,
  props: {
    className: { default: "" },
    config: { default: () => ({
      width: 800,
      height: 800,
      onRender: () => {
      },
      devicePixelRatio: 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 0.4,
      mapSamples: 16e3,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor: [1, 1, 1],
      markers: [
        { location: [14.5995, 120.9842], size: 0.03 },
        { location: [19.076, 72.8777], size: 0.1 },
        { location: [23.8103, 90.4125], size: 0.05 },
        { location: [30.0444, 31.2357], size: 0.07 },
        { location: [39.9042, 116.4074], size: 0.08 },
        { location: [-23.5505, -46.6333], size: 0.1 },
        { location: [19.4326, -99.1332], size: 0.1 },
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [34.6937, 135.5022], size: 0.05 },
        { location: [41.0082, 28.9784], size: 0.06 }
      ]
    }) }
  },
  setup(__props) {
    ref(null);
    ref(null);
    ref(0);
    ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]", __props.className)
      }, _attrs))}><canvas class="${ssrRenderClass(unref(cn)("size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"))}"></canvas></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/Globe.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NavigationPill",
  __ssrInlineRender: true,
  setup(__props) {
    const activeSection = ref("home");
    const expanded = ref(false);
    const hovering = ref(false);
    const isTransitioning = ref(false);
    const pillWidth = ref(140);
    const containerRef = ref(null);
    const navItems = [
      { label: "Home", id: "home" },
      { label: "Problem", id: "problem" },
      { label: "Solution", id: "solution" },
      { label: "Contact", id: "contact" }
    ];
    let hoverTimeout = null;
    watch(hovering, (newValue) => {
      if (newValue) {
        expanded.value = true;
        pillWidth.value = 580;
        if (hoverTimeout) {
          clearTimeout(hoverTimeout);
        }
      } else {
        hoverTimeout = setTimeout(() => {
          expanded.value = false;
          pillWidth.value = 140;
        }, 600);
      }
    });
    const getButtonStyle = (isActive) => {
      return {
        fontSize: isActive ? "15.5px" : "15px",
        fontWeight: isActive ? 680 : 510,
        color: isActive ? "#1a1a1a" : "#656565",
        textDecoration: "none",
        letterSpacing: "0.45px",
        background: "transparent",
        border: "none",
        padding: "10px 16px",
        whiteSpace: "nowrap",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, SF Pro Display, Poppins, sans-serif",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        transform: isActive ? "translateY(-1.5px)" : "translateY(0)",
        textShadow: isActive ? `
        0 1px 0 rgba(0, 0, 0, 0.35),
        0 -1px 0 rgba(255, 255, 255, 0.8),
        1px 1px 0 rgba(0, 0, 0, 0.18),
        -1px 1px 0 rgba(0, 0, 0, 0.15)
      ` : `
        0 1px 0 rgba(0, 0, 0, 0.22),
        0 -1px 0 rgba(255, 255, 255, 0.65),
        1px 1px 0 rgba(0, 0, 0, 0.12),
        -1px 1px 0 rgba(0, 0, 0, 0.10)
      `
      };
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<nav${ssrRenderAttrs(mergeProps({
        ref_key: "containerRef",
        ref: containerRef,
        class: "relative rounded-full",
        style: {
          width: `${pillWidth.value}px`,
          height: "56px",
          background: `
        linear-gradient(135deg,
          #fcfcfd 0%,
          #f8f8fa 15%,
          #f3f4f6 30%,
          #eeeff2 45%,
          #e9eaed 60%,
          #e4e5e8 75%,
          #dee0e3 90%,
          #e2e3e6 100%
        )
      `,
          boxShadow: expanded.value ? `
          0 2px 4px rgba(0, 0, 0, 0.08),
          0 6px 12px rgba(0, 0, 0, 0.12),
          0 12px 24px rgba(0, 0, 0, 0.14),
          0 24px 48px rgba(0, 0, 0, 0.10),
          inset 0 2px 2px rgba(255, 255, 255, 0.8),
          inset 0 -3px 8px rgba(0, 0, 0, 0.12),
          inset 3px 3px 8px rgba(0, 0, 0, 0.10),
          inset -3px 3px 8px rgba(0, 0, 0, 0.09),
          inset 0 -1px 2px rgba(0, 0, 0, 0.08)
        ` : isTransitioning.value ? `
          0 3px 6px rgba(0, 0, 0, 0.10),
          0 8px 16px rgba(0, 0, 0, 0.08),
          0 16px 32px rgba(0, 0, 0, 0.06),
          0 1px 2px rgba(0, 0, 0, 0.10),
          inset 0 2px 1px rgba(255, 255, 255, 0.85),
          inset 0 -2px 6px rgba(0, 0, 0, 0.08),
          inset 2px 2px 8px rgba(0, 0, 0, 0.06),
          inset -2px 2px 8px rgba(0, 0, 0, 0.05),
          inset 0 0 1px rgba(0, 0, 0, 0.12),
          inset 0 0 20px rgba(255, 255, 255, 0.15)
        ` : `
          0 3px 6px rgba(0, 0, 0, 0.12),
          0 8px 16px rgba(0, 0, 0, 0.10),
          0 16px 32px rgba(0, 0, 0, 0.08),
          0 1px 2px rgba(0, 0, 0, 0.12),
          inset 0 2px 1px rgba(255, 255, 255, 0.7),
          inset 0 -2px 6px rgba(0, 0, 0, 0.10),
          inset 2px 2px 8px rgba(0, 0, 0, 0.08),
          inset -2px 2px 8px rgba(0, 0, 0, 0.07),
          inset 0 0 1px rgba(0, 0, 0, 0.15)
        `,
          overflow: "hidden",
          transition: "all 0.3s ease-out"
        }
      }, _attrs))} data-v-7201d70c><div class="absolute inset-x-0 top-0 rounded-t-full pointer-events-none" style="${ssrRenderStyle({ "height": "2px", "background": "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.95) 5%, rgba(255, 255, 255, 1) 15%, rgba(255, 255, 255, 1) 85%, rgba(255, 255, 255, 0.95) 95%, rgba(255, 255, 255, 0) 100%)", "filter": "blur(0.3px)" })}" data-v-7201d70c></div><div class="absolute inset-x-0 top-0 rounded-full pointer-events-none" style="${ssrRenderStyle({ "height": "55%", "background": "linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.25) 30%, rgba(255, 255, 255, 0.10) 60%, rgba(255, 255, 255, 0) 100%)" })}" data-v-7201d70c></div><div class="absolute inset-0 rounded-full pointer-events-none" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.20) 20%, rgba(255, 255, 255, 0.08) 40%, rgba(255, 255, 255, 0) 65%)" })}" data-v-7201d70c></div><div class="absolute rounded-full pointer-events-none transition-all duration-300" style="${ssrRenderStyle({
        left: expanded.value ? "18%" : "15%",
        top: "16%",
        width: expanded.value ? "140px" : "60px",
        height: "14px",
        background: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0.35) 40%, rgba(255, 255, 255, 0.10) 70%, rgba(255, 255, 255, 0) 100%)",
        filter: "blur(4px)",
        transform: "rotate(-12deg)"
      })}" data-v-7201d70c></div><div class="relative z-10 h-full flex items-center justify-center px-6" style="${ssrRenderStyle({ "font-family": "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro', Poppins, sans-serif" })}" data-v-7201d70c>`);
      if (!expanded.value) {
        _push(`<div class="flex items-center relative" data-v-7201d70c><span style="${ssrRenderStyle({
          fontSize: "15.5px",
          fontWeight: 680,
          color: "#1a1a1a",
          letterSpacing: "0.45px",
          whiteSpace: "nowrap",
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, SF Pro Display, Poppins, sans-serif",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          textShadow: `
                0 1px 0 rgba(0, 0, 0, 0.35),
                0 -1px 0 rgba(255, 255, 255, 0.8),
                1px 1px 0 rgba(0, 0, 0, 0.18),
                -1px 1px 0 rgba(0, 0, 0, 0.15)
              `
        })}" data-v-7201d70c>${ssrInterpolate((_a = navItems.find((item) => item.id === activeSection.value)) == null ? void 0 : _a.label)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (expanded.value) {
        _push(`<div class="flex items-center justify-evenly w-full" data-v-7201d70c><!--[-->`);
        ssrRenderList(navItems, (item, index2) => {
          _push(`<button class="relative cursor-pointer transition-all duration-200 outline-none" style="${ssrRenderStyle(getButtonStyle(item.id === activeSection.value))}" data-v-7201d70c>${ssrInterpolate(item.label)}</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></nav>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/NavigationPill.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const NavigationPill = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-7201d70c"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AnimatedTestimonials",
  __ssrInlineRender: true,
  props: {
    testimonials: {},
    autoplay: { type: Boolean, default: false },
    className: { default: "" }
  },
  setup(__props) {
    const IconArrowLeft = {
      template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>'
    };
    const IconArrowRight = {
      template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>'
    };
    const active = ref(0);
    const randomRotateY = () => {
      return Math.floor(Math.random() * 21) - 10;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_motion = resolveDirective("motion");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-20", __props.className)
      }, _attrs))} data-v-a98145d3><div class="relative grid grid-cols-1 md:grid-cols-2 gap-20" data-v-a98145d3><div data-v-a98145d3><div class="relative h-80 w-full" data-v-a98145d3><!--[-->`);
      ssrRenderList(__props.testimonials, (testimonial, index2) => {
        _push(`<div${ssrRenderAttrs(mergeProps({
          key: testimonial.src,
          initial: {
            opacity: 0,
            scale: 0.9,
            rotateY: randomRotateY()
          },
          enter: {
            opacity: index2 === active.value ? 1 : 0.7,
            scale: index2 === active.value ? 1 : 0.95,
            rotateY: index2 === active.value ? 0 : randomRotateY(),
            transition: {
              duration: 400
            }
          },
          class: "absolute inset-0 origin-bottom",
          style: [
            { zIndex: index2 === active.value ? 999 : __props.testimonials.length + 2 - index2 },
            index2 === active.value ? null : { display: "none" }
          ]
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))} data-v-a98145d3><img${ssrRenderAttr("src", testimonial.src)}${ssrRenderAttr("alt", testimonial.name)} draggable="false" class="h-full w-full rounded-3xl object-cover object-center" data-v-a98145d3></div>`);
      });
      _push(`<!--]--></div></div><div class="flex justify-between flex-col py-4" data-v-a98145d3><div data-v-a98145d3><!--[-->`);
      if (__props.testimonials[active.value]) {
        _push(`<div data-v-a98145d3><h3 class="text-2xl font-bold text-foreground" data-v-a98145d3>${ssrInterpolate(__props.testimonials[active.value].name)}</h3><p class="text-sm text-muted-foreground" data-v-a98145d3>${ssrInterpolate(__props.testimonials[active.value].designation)}</p><p class="text-lg text-muted-foreground mt-8" data-v-a98145d3><!--[-->`);
        ssrRenderList(__props.testimonials[active.value].quote.split(" "), (word, index2) => {
          _push(`<span${ssrRenderAttrs(mergeProps({
            key: index2,
            initial: { filter: "blur(10px)", opacity: 0, y: 5 },
            enter: {
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
              transition: {
                duration: 200,
                delay: 20 * index2
              }
            },
            class: "inline-block"
          }, ssrGetDirectiveProps(_ctx, _directive_motion)))} data-v-a98145d3>${ssrInterpolate(word)}\xA0 </span>`);
        });
        _push(`<!--]--></p></div>`);
      }
      _push(`<!--]--></div><div class="flex gap-4 pt-12 md:pt-0" data-v-a98145d3><button class="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button" data-v-a98145d3>`);
      _push(ssrRenderComponent(IconArrowLeft, { class: "h-5 w-5 text-foreground group-hover/button:rotate-12 transition-transform duration-300" }, null, _parent));
      _push(`</button><button class="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button" data-v-a98145d3>`);
      _push(ssrRenderComponent(IconArrowRight, { class: "h-5 w-5 text-foreground group-hover/button:-rotate-12 transition-transform duration-300" }, null, _parent));
      _push(`</button></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/AnimatedTestimonials.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AnimatedTestimonials = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a98145d3"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    gsap.registerPlugin(ScrollTrigger);
    const heroContent = ref(null);
    const heroTitle = ref(null);
    const heroDesc = ref(null);
    const heroSearch = ref(null);
    const heroStats = ref(null);
    const heroGlobe = ref(null);
    const leaf1 = ref(null);
    const leaf2 = ref(null);
    const leaf3 = ref(null);
    const featuresTitle = ref(null);
    const featuresGrid = ref(null);
    const testimonialsSection = ref(null);
    const ctaSection = ref(null);
    const globeConfig = {
      width: 800,
      height: 800,
      onRender: () => {
      },
      devicePixelRatio: 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 0.4,
      mapSamples: 16e3,
      mapBrightness: 1.2,
      baseColor: [0.7, 0.9, 0.7],
      // Soft green
      markerColor: [34 / 255, 139 / 255, 34 / 255],
      // Forest green
      glowColor: [0.6, 0.9, 0.6],
      // Light green glow
      markers: [
        { location: [31.7917, -7.0926], size: 0.1 },
        // Morocco - Marrakech
        { location: [33.5731, -7.5898], size: 0.12 },
        // Morocco - Casablanca
        { location: [34.0209, -6.8416], size: 0.1 },
        // Morocco - Rabat
        { location: [35.7595, -5.834], size: 0.08 },
        // Morocco - Tangier
        { location: [48.8566, 2.3522], size: 0.08 },
        // France - Paris
        { location: [51.5074, -0.1278], size: 0.07 },
        // UK - London
        { location: [40.7128, -74.006], size: 0.09 }
        // USA - New York
      ]
    };
    const testimonials = [
      {
        quote: "Cette plateforme a compl\xE8tement chang\xE9 ma fa\xE7on d'aborder ma sant\xE9. Les produits naturels recommand\xE9s sont de qualit\xE9 exceptionnelle.",
        name: "Amina Benjelloun",
        designation: "Utilisatrice depuis 2023",
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop"
      },
      {
        quote: "L'engagement \xE9cologique des pharmacies partenaires est remarquable. Enfin une plateforme qui allie sant\xE9 et respect de l'environnement.",
        name: "Youssef Alami",
        designation: "Pharmacien partenaire",
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop"
      },
      {
        quote: "Les conseils personnalis\xE9s bas\xE9s sur la phytoth\xE9rapie m'ont aid\xE9e \xE0 trouver des alternatives naturelles efficaces.",
        name: "Sofia Rahimi",
        designation: "Cliente fid\xE8le",
        src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop"
      },
      {
        quote: "Un service innovant qui respecte vraiment l'environnement. Le programme z\xE9ro d\xE9chet est brillamment mis en \u0153uvre.",
        name: "Karim Tazi",
        designation: "Ambassadeur \xE9cologique",
        src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop"
      }
    ];
    useHead({
      title: "PharmFinder - Sant\xE9 Naturelle & \xC9cologique",
      meta: [
        { name: "description", content: "D\xE9couvrez une approche \xE9cologique de la sant\xE9. Trouvez les pharmacies vertes pr\xE8s de chez vous et adoptez des produits naturels certifi\xE9s au Maroc." }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "default" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative" data-v-0d9d0886${_scopeId}><div class="fixed top-8 left-1/2 -translate-x-1/2 z-50" data-v-0d9d0886${_scopeId}>`);
            _push2(ssrRenderComponent(NavigationPill, null, null, _parent2, _scopeId));
            _push2(`</div><section class="relative overflow-hidden bg-gradient-to-br from-nature-50 via-earth-50 to-nature-100 dark:from-nature-900 dark:via-nature-800 dark:to-earth-900 min-h-screen flex items-center" data-v-0d9d0886${_scopeId}><div class="container-custom py-32 md:py-40 relative z-10" data-v-0d9d0886${_scopeId}><div class="grid md:grid-cols-2 gap-16 items-center" data-v-0d9d0886${_scopeId}><div class="space-y-8 opacity-0" data-v-0d9d0886${_scopeId}><div class="inline-block" data-v-0d9d0886${_scopeId}><span class="bg-nature-500/20 text-nature-700 dark:text-nature-300 px-5 py-2 rounded-full text-sm font-semibold border border-nature-500/30" data-v-0d9d0886${_scopeId}> \u{1F33F} Plateforme \xE9co-responsable </span></div><h1 class="text-6xl md:text-7xl font-bold tracking-tight opacity-0" data-v-0d9d0886${_scopeId}><span class="bg-gradient-to-r from-nature-700 to-nature-500 dark:from-nature-300 dark:to-nature-100 bg-clip-text text-transparent" data-v-0d9d0886${_scopeId}> Votre Sant\xE9, </span><span class="block mt-3 text-nature-600 dark:text-nature-400" data-v-0d9d0886${_scopeId}> Notre Nature </span></h1><p class="text-xl text-nature-700/80 dark:text-nature-200/80 max-w-lg leading-relaxed opacity-0" data-v-0d9d0886${_scopeId}> D\xE9couvrez une approche naturelle de la sant\xE9. Trouvez les pharmacies engag\xE9es dans le d\xE9veloppement durable pr\xE8s de chez vous. </p><div class="flex flex-col sm:flex-row gap-4 max-w-xl opacity-0" data-v-0d9d0886${_scopeId}><div class="relative flex-1" data-v-0d9d0886${_scopeId}><svg class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-nature-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0d9d0886${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-0d9d0886${_scopeId}></path></svg><input type="text" placeholder="Rechercher un m\xE9dicament naturel..." class="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-nature-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-nature-500 focus:border-transparent transition-all shadow-lg shadow-nature-100" data-v-0d9d0886${_scopeId}></div>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/pharmacies",
              class: "inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-nature-600 to-nature-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-nature-500/30 hover:shadow-xl hover:shadow-nature-500/40 hover:scale-105 transition-all duration-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0d9d0886${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-v-0d9d0886${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-v-0d9d0886${_scopeId2}></path></svg> Explorer `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "mr-2 h-5 w-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      }),
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      })
                    ])),
                    createTextVNode(" Explorer ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex gap-10 pt-6 opacity-0" data-v-0d9d0886${_scopeId}><div class="group" data-v-0d9d0886${_scopeId}><div class="text-4xl font-bold bg-gradient-to-br from-nature-700 to-nature-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform" data-v-0d9d0886${_scopeId}> 250+ </div><div class="text-sm text-nature-600 dark:text-nature-400 flex items-center gap-1" data-v-0d9d0886${_scopeId}> \u{1F331} Pharmacies vertes </div></div><div class="group" data-v-0d9d0886${_scopeId}><div class="text-4xl font-bold bg-gradient-to-br from-nature-700 to-nature-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform" data-v-0d9d0886${_scopeId}> 5000+ </div><div class="text-sm text-nature-600 dark:text-nature-400 flex items-center gap-1" data-v-0d9d0886${_scopeId}> \u{1F343} Produits naturels </div></div><div class="group" data-v-0d9d0886${_scopeId}><div class="text-4xl font-bold bg-gradient-to-br from-nature-700 to-nature-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform" data-v-0d9d0886${_scopeId}> 24/7 </div><div class="text-sm text-nature-600 dark:text-nature-400 flex items-center gap-1" data-v-0d9d0886${_scopeId}> \u267B\uFE0F \xC9co-service </div></div></div></div><div class="relative h-[600px] opacity-0" data-v-0d9d0886${_scopeId}><div class="absolute inset-0 bg-gradient-to-tr from-nature-400/20 to-transparent rounded-full blur-3xl" data-v-0d9d0886${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, { config: globeConfig }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="absolute bottom-0 left-0 right-0" data-v-0d9d0886${_scopeId}><svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full" data-v-0d9d0886${_scopeId}><path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="currentColor" class="text-background" data-v-0d9d0886${_scopeId}></path></svg></div><div class="absolute inset-0 overflow-hidden pointer-events-none" data-v-0d9d0886${_scopeId}><div class="absolute text-6xl opacity-20" data-v-0d9d0886${_scopeId}>\u{1F343}</div><div class="absolute text-5xl opacity-15" data-v-0d9d0886${_scopeId}>\u{1F33F}</div><div class="absolute text-7xl opacity-10" data-v-0d9d0886${_scopeId}>\u{1F342}</div></div></section><section class="py-28 relative overflow-hidden" data-v-0d9d0886${_scopeId}><div class="absolute inset-0 opacity-5" data-v-0d9d0886${_scopeId}><div class="absolute inset-0" style="${ssrRenderStyle({ "background-image": "radial-gradient(circle, hsl(var(--nature-500)) 1px, transparent 1px)", "background-size": "30px 30px" })}" data-v-0d9d0886${_scopeId}></div></div><div class="container-custom relative z-10" data-v-0d9d0886${_scopeId}><div class="text-center mb-20 opacity-0" data-v-0d9d0886${_scopeId}><div class="inline-block mb-4" data-v-0d9d0886${_scopeId}><span class="text-nature-600 dark:text-nature-400 font-semibold text-sm uppercase tracking-wider" data-v-0d9d0886${_scopeId}> \u{1F30D} Engagement \xC9cologique </span></div><h2 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-nature-700 to-nature-500 bg-clip-text text-transparent" data-v-0d9d0886${_scopeId}> Une Sant\xE9 Durable </h2><p class="text-nature-700/70 dark:text-nature-300/70 text-lg max-w-3xl mx-auto leading-relaxed" data-v-0d9d0886${_scopeId}> Rejoignez le mouvement pour une sant\xE9 respectueuse de l&#39;environnement avec notre plateforme innovante </p></div><div class="grid md:grid-cols-3 gap-8 opacity-0" data-v-0d9d0886${_scopeId}><div class="group p-8 rounded-3xl border-2 border-nature-200 dark:border-nature-700 bg-gradient-to-br from-nature-50 to-white dark:from-nature-900 dark:to-nature-800 hover:shadow-2xl hover:shadow-nature-500/20 transition-all duration-500 hover:-translate-y-2" data-v-0d9d0886${_scopeId}><div class="h-16 w-16 rounded-2xl bg-gradient-to-br from-nature-500 to-nature-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-nature-500/30" data-v-0d9d0886${_scopeId}><span class="text-3xl" data-v-0d9d0886${_scopeId}>\u{1F331}</span></div><h3 class="text-2xl font-bold mb-3 text-nature-800 dark:text-nature-200" data-v-0d9d0886${_scopeId}>Bio &amp; Naturel</h3><p class="text-nature-600 dark:text-nature-300 leading-relaxed" data-v-0d9d0886${_scopeId}> D\xE9couvrez une s\xE9lection de produits biologiques et naturels certifi\xE9s pour votre bien-\xEAtre. </p></div><div class="group p-8 rounded-3xl border-2 border-nature-200 dark:border-nature-700 bg-gradient-to-br from-earth-50 to-white dark:from-nature-900 dark:to-nature-800 hover:shadow-2xl hover:shadow-earth-500/20 transition-all duration-500 hover:-translate-y-2" data-v-0d9d0886${_scopeId}><div class="h-16 w-16 rounded-2xl bg-gradient-to-br from-earth-400 to-earth-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-earth-400/30" data-v-0d9d0886${_scopeId}><span class="text-3xl" data-v-0d9d0886${_scopeId}>\u267B\uFE0F</span></div><h3 class="text-2xl font-bold mb-3 text-nature-800 dark:text-nature-200" data-v-0d9d0886${_scopeId}>Z\xE9ro D\xE9chet</h3><p class="text-nature-600 dark:text-nature-300 leading-relaxed" data-v-0d9d0886${_scopeId}> Participez \xE0 notre programme de recyclage et r\xE9duisez votre empreinte \xE9cologique. </p></div><div class="group p-8 rounded-3xl border-2 border-nature-200 dark:border-nature-700 bg-gradient-to-br from-nature-50 to-white dark:from-nature-900 dark:to-nature-800 hover:shadow-2xl hover:shadow-nature-500/20 transition-all duration-500 hover:-translate-y-2" data-v-0d9d0886${_scopeId}><div class="h-16 w-16 rounded-2xl bg-gradient-to-br from-nature-600 to-nature-700 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-nature-600/30" data-v-0d9d0886${_scopeId}><span class="text-3xl" data-v-0d9d0886${_scopeId}>\u{1F33F}</span></div><h3 class="text-2xl font-bold mb-3 text-nature-800 dark:text-nature-200" data-v-0d9d0886${_scopeId}>Conseils Naturels</h3><p class="text-nature-600 dark:text-nature-300 leading-relaxed" data-v-0d9d0886${_scopeId}> B\xE9n\xE9ficiez de recommandations personnalis\xE9es bas\xE9es sur la phytoth\xE9rapie et l&#39;aromath\xE9rapie. </p></div></div></div></section><section class="py-28 bg-gradient-to-br from-nature-100 to-earth-50 dark:from-nature-900 dark:to-nature-800 opacity-0" data-v-0d9d0886${_scopeId}><div class="container-custom" data-v-0d9d0886${_scopeId}><div class="text-center mb-16" data-v-0d9d0886${_scopeId}><h2 class="text-5xl font-bold mb-4 bg-gradient-to-r from-nature-700 to-nature-500 bg-clip-text text-transparent" data-v-0d9d0886${_scopeId}> T\xE9moignages Nature </h2><p class="text-nature-700/70 dark:text-nature-300/70 text-lg" data-v-0d9d0886${_scopeId}> Ce que nos utilisateurs disent de notre engagement \xE9cologique </p></div>`);
            _push2(ssrRenderComponent(AnimatedTestimonials, {
              testimonials,
              autoplay: true
            }, null, _parent2, _scopeId));
            _push2(`</div></section><section class="py-32 relative overflow-hidden" data-v-0d9d0886${_scopeId}><div class="absolute inset-0 bg-gradient-to-br from-nature-600 via-nature-500 to-earth-500" data-v-0d9d0886${_scopeId}></div><div class="absolute inset-0 opacity-10" data-v-0d9d0886${_scopeId}><div class="absolute inset-0" style="${ssrRenderStyle({ "background-image": `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')` })}" data-v-0d9d0886${_scopeId}></div></div><div class="container-custom relative z-10" data-v-0d9d0886${_scopeId}><div class="text-center max-w-4xl mx-auto opacity-0" data-v-0d9d0886${_scopeId}><div class="mb-6 inline-block" data-v-0d9d0886${_scopeId}><span class="text-white/90 text-lg font-medium" data-v-0d9d0886${_scopeId}>\u{1F30D} Rejoignez la r\xE9volution verte</span></div><h2 class="text-5xl md:text-6xl font-bold mb-8 text-white" data-v-0d9d0886${_scopeId}> Ensemble pour une Sant\xE9<br data-v-0d9d0886${_scopeId}><span class="text-earth-100" data-v-0d9d0886${_scopeId}>Plus Naturelle</span></h2><p class="text-xl mb-12 text-white/90 leading-relaxed max-w-2xl mx-auto" data-v-0d9d0886${_scopeId}> Faites partie du changement. Adoptez une approche \xE9cologique de votre sant\xE9 d\xE8s aujourd&#39;hui. </p><div class="flex flex-col sm:flex-row gap-6 justify-center" data-v-0d9d0886${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/pharmacies",
              class: "group inline-flex items-center justify-center rounded-2xl bg-white text-nature-700 px-10 py-5 text-base font-semibold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="mr-2 text-2xl" data-v-0d9d0886${_scopeId2}>\u{1F33F}</span> D\xE9couvrir les Pharmacies Vertes <svg class="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0d9d0886${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" data-v-0d9d0886${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createVNode("span", { class: "mr-2 text-2xl" }, "\u{1F33F}"),
                    createTextVNode(" D\xE9couvrir les Pharmacies Vertes "),
                    (openBlock(), createBlock("svg", {
                      class: "ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M13 7l5 5m0 0l-5 5m5-5H6"
                      })
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/chatbot",
              class: "inline-flex items-center justify-center rounded-2xl border-2 border-white text-white px-10 py-5 text-base font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="mr-2 text-2xl" data-v-0d9d0886${_scopeId2}>\u{1F4AC}</span> Assistant Naturel IA `);
                } else {
                  return [
                    createVNode("span", { class: "mr-2 text-2xl" }, "\u{1F4AC}"),
                    createTextVNode(" Assistant Naturel IA ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="absolute top-10 left-10 text-8xl opacity-10" data-v-0d9d0886${_scopeId}>\u{1F33F}</div><div class="absolute bottom-10 right-10 text-9xl opacity-10" data-v-0d9d0886${_scopeId}>\u{1F343}</div></section></div>`);
          } else {
            return [
              createVNode("div", { class: "relative" }, [
                createVNode("div", { class: "fixed top-8 left-1/2 -translate-x-1/2 z-50" }, [
                  createVNode(NavigationPill)
                ]),
                createVNode("section", { class: "relative overflow-hidden bg-gradient-to-br from-nature-50 via-earth-50 to-nature-100 dark:from-nature-900 dark:via-nature-800 dark:to-earth-900 min-h-screen flex items-center" }, [
                  createVNode("div", { class: "container-custom py-32 md:py-40 relative z-10" }, [
                    createVNode("div", { class: "grid md:grid-cols-2 gap-16 items-center" }, [
                      createVNode("div", {
                        ref_key: "heroContent",
                        ref: heroContent,
                        class: "space-y-8 opacity-0"
                      }, [
                        createVNode("div", { class: "inline-block" }, [
                          createVNode("span", { class: "bg-nature-500/20 text-nature-700 dark:text-nature-300 px-5 py-2 rounded-full text-sm font-semibold border border-nature-500/30" }, " \u{1F33F} Plateforme \xE9co-responsable ")
                        ]),
                        createVNode("h1", {
                          ref_key: "heroTitle",
                          ref: heroTitle,
                          class: "text-6xl md:text-7xl font-bold tracking-tight opacity-0"
                        }, [
                          createVNode("span", { class: "bg-gradient-to-r from-nature-700 to-nature-500 dark:from-nature-300 dark:to-nature-100 bg-clip-text text-transparent" }, " Votre Sant\xE9, "),
                          createVNode("span", { class: "block mt-3 text-nature-600 dark:text-nature-400" }, " Notre Nature ")
                        ], 512),
                        createVNode("p", {
                          ref_key: "heroDesc",
                          ref: heroDesc,
                          class: "text-xl text-nature-700/80 dark:text-nature-200/80 max-w-lg leading-relaxed opacity-0"
                        }, " D\xE9couvrez une approche naturelle de la sant\xE9. Trouvez les pharmacies engag\xE9es dans le d\xE9veloppement durable pr\xE8s de chez vous. ", 512),
                        createVNode("div", {
                          ref_key: "heroSearch",
                          ref: heroSearch,
                          class: "flex flex-col sm:flex-row gap-4 max-w-xl opacity-0"
                        }, [
                          createVNode("div", { class: "relative flex-1" }, [
                            (openBlock(), createBlock("svg", {
                              class: "absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-nature-600",
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
                            createVNode("input", {
                              type: "text",
                              placeholder: "Rechercher un m\xE9dicament naturel...",
                              class: "w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-nature-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-nature-500 focus:border-transparent transition-all shadow-lg shadow-nature-100"
                            })
                          ]),
                          createVNode(_component_NuxtLink, {
                            to: "/pharmacies",
                            class: "inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-nature-600 to-nature-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-nature-500/30 hover:shadow-xl hover:shadow-nature-500/40 hover:scale-105 transition-all duration-300"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock("svg", {
                                class: "mr-2 h-5 w-5",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                }),
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                })
                              ])),
                              createTextVNode(" Explorer ")
                            ]),
                            _: 1
                          })
                        ], 512),
                        createVNode("div", {
                          ref_key: "heroStats",
                          ref: heroStats,
                          class: "flex gap-10 pt-6 opacity-0"
                        }, [
                          createVNode("div", { class: "group" }, [
                            createVNode("div", { class: "text-4xl font-bold bg-gradient-to-br from-nature-700 to-nature-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform" }, " 250+ "),
                            createVNode("div", { class: "text-sm text-nature-600 dark:text-nature-400 flex items-center gap-1" }, " \u{1F331} Pharmacies vertes ")
                          ]),
                          createVNode("div", { class: "group" }, [
                            createVNode("div", { class: "text-4xl font-bold bg-gradient-to-br from-nature-700 to-nature-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform" }, " 5000+ "),
                            createVNode("div", { class: "text-sm text-nature-600 dark:text-nature-400 flex items-center gap-1" }, " \u{1F343} Produits naturels ")
                          ]),
                          createVNode("div", { class: "group" }, [
                            createVNode("div", { class: "text-4xl font-bold bg-gradient-to-br from-nature-700 to-nature-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform" }, " 24/7 "),
                            createVNode("div", { class: "text-sm text-nature-600 dark:text-nature-400 flex items-center gap-1" }, " \u267B\uFE0F \xC9co-service ")
                          ])
                        ], 512)
                      ], 512),
                      createVNode("div", {
                        ref_key: "heroGlobe",
                        ref: heroGlobe,
                        class: "relative h-[600px] opacity-0"
                      }, [
                        createVNode("div", { class: "absolute inset-0 bg-gradient-to-tr from-nature-400/20 to-transparent rounded-full blur-3xl" }),
                        createVNode(_sfc_main$3, { config: globeConfig })
                      ], 512)
                    ])
                  ]),
                  createVNode("div", { class: "absolute bottom-0 left-0 right-0" }, [
                    (openBlock(), createBlock("svg", {
                      viewBox: "0 0 1440 120",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "w-full"
                    }, [
                      createVNode("path", {
                        d: "M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z",
                        fill: "currentColor",
                        class: "text-background"
                      })
                    ]))
                  ]),
                  createVNode("div", { class: "absolute inset-0 overflow-hidden pointer-events-none" }, [
                    createVNode("div", {
                      ref_key: "leaf1",
                      ref: leaf1,
                      class: "absolute text-6xl opacity-20"
                    }, "\u{1F343}", 512),
                    createVNode("div", {
                      ref_key: "leaf2",
                      ref: leaf2,
                      class: "absolute text-5xl opacity-15"
                    }, "\u{1F33F}", 512),
                    createVNode("div", {
                      ref_key: "leaf3",
                      ref: leaf3,
                      class: "absolute text-7xl opacity-10"
                    }, "\u{1F342}", 512)
                  ])
                ]),
                createVNode("section", { class: "py-28 relative overflow-hidden" }, [
                  createVNode("div", { class: "absolute inset-0 opacity-5" }, [
                    createVNode("div", {
                      class: "absolute inset-0",
                      style: { "background-image": "radial-gradient(circle, hsl(var(--nature-500)) 1px, transparent 1px)", "background-size": "30px 30px" }
                    })
                  ]),
                  createVNode("div", { class: "container-custom relative z-10" }, [
                    createVNode("div", {
                      ref_key: "featuresTitle",
                      ref: featuresTitle,
                      class: "text-center mb-20 opacity-0"
                    }, [
                      createVNode("div", { class: "inline-block mb-4" }, [
                        createVNode("span", { class: "text-nature-600 dark:text-nature-400 font-semibold text-sm uppercase tracking-wider" }, " \u{1F30D} Engagement \xC9cologique ")
                      ]),
                      createVNode("h2", { class: "text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-nature-700 to-nature-500 bg-clip-text text-transparent" }, " Une Sant\xE9 Durable "),
                      createVNode("p", { class: "text-nature-700/70 dark:text-nature-300/70 text-lg max-w-3xl mx-auto leading-relaxed" }, " Rejoignez le mouvement pour une sant\xE9 respectueuse de l'environnement avec notre plateforme innovante ")
                    ], 512),
                    createVNode("div", {
                      ref_key: "featuresGrid",
                      ref: featuresGrid,
                      class: "grid md:grid-cols-3 gap-8 opacity-0"
                    }, [
                      createVNode("div", { class: "group p-8 rounded-3xl border-2 border-nature-200 dark:border-nature-700 bg-gradient-to-br from-nature-50 to-white dark:from-nature-900 dark:to-nature-800 hover:shadow-2xl hover:shadow-nature-500/20 transition-all duration-500 hover:-translate-y-2" }, [
                        createVNode("div", { class: "h-16 w-16 rounded-2xl bg-gradient-to-br from-nature-500 to-nature-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-nature-500/30" }, [
                          createVNode("span", { class: "text-3xl" }, "\u{1F331}")
                        ]),
                        createVNode("h3", { class: "text-2xl font-bold mb-3 text-nature-800 dark:text-nature-200" }, "Bio & Naturel"),
                        createVNode("p", { class: "text-nature-600 dark:text-nature-300 leading-relaxed" }, " D\xE9couvrez une s\xE9lection de produits biologiques et naturels certifi\xE9s pour votre bien-\xEAtre. ")
                      ]),
                      createVNode("div", { class: "group p-8 rounded-3xl border-2 border-nature-200 dark:border-nature-700 bg-gradient-to-br from-earth-50 to-white dark:from-nature-900 dark:to-nature-800 hover:shadow-2xl hover:shadow-earth-500/20 transition-all duration-500 hover:-translate-y-2" }, [
                        createVNode("div", { class: "h-16 w-16 rounded-2xl bg-gradient-to-br from-earth-400 to-earth-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-earth-400/30" }, [
                          createVNode("span", { class: "text-3xl" }, "\u267B\uFE0F")
                        ]),
                        createVNode("h3", { class: "text-2xl font-bold mb-3 text-nature-800 dark:text-nature-200" }, "Z\xE9ro D\xE9chet"),
                        createVNode("p", { class: "text-nature-600 dark:text-nature-300 leading-relaxed" }, " Participez \xE0 notre programme de recyclage et r\xE9duisez votre empreinte \xE9cologique. ")
                      ]),
                      createVNode("div", { class: "group p-8 rounded-3xl border-2 border-nature-200 dark:border-nature-700 bg-gradient-to-br from-nature-50 to-white dark:from-nature-900 dark:to-nature-800 hover:shadow-2xl hover:shadow-nature-500/20 transition-all duration-500 hover:-translate-y-2" }, [
                        createVNode("div", { class: "h-16 w-16 rounded-2xl bg-gradient-to-br from-nature-600 to-nature-700 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-nature-600/30" }, [
                          createVNode("span", { class: "text-3xl" }, "\u{1F33F}")
                        ]),
                        createVNode("h3", { class: "text-2xl font-bold mb-3 text-nature-800 dark:text-nature-200" }, "Conseils Naturels"),
                        createVNode("p", { class: "text-nature-600 dark:text-nature-300 leading-relaxed" }, " B\xE9n\xE9ficiez de recommandations personnalis\xE9es bas\xE9es sur la phytoth\xE9rapie et l'aromath\xE9rapie. ")
                      ])
                    ], 512)
                  ])
                ]),
                createVNode("section", {
                  ref_key: "testimonialsSection",
                  ref: testimonialsSection,
                  class: "py-28 bg-gradient-to-br from-nature-100 to-earth-50 dark:from-nature-900 dark:to-nature-800 opacity-0"
                }, [
                  createVNode("div", { class: "container-custom" }, [
                    createVNode("div", { class: "text-center mb-16" }, [
                      createVNode("h2", { class: "text-5xl font-bold mb-4 bg-gradient-to-r from-nature-700 to-nature-500 bg-clip-text text-transparent" }, " T\xE9moignages Nature "),
                      createVNode("p", { class: "text-nature-700/70 dark:text-nature-300/70 text-lg" }, " Ce que nos utilisateurs disent de notre engagement \xE9cologique ")
                    ]),
                    createVNode(AnimatedTestimonials, {
                      testimonials,
                      autoplay: true
                    })
                  ])
                ], 512),
                createVNode("section", { class: "py-32 relative overflow-hidden" }, [
                  createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-nature-600 via-nature-500 to-earth-500" }),
                  createVNode("div", { class: "absolute inset-0 opacity-10" }, [
                    createVNode("div", {
                      class: "absolute inset-0",
                      style: { "background-image": `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')` }
                    })
                  ]),
                  createVNode("div", { class: "container-custom relative z-10" }, [
                    createVNode("div", {
                      ref_key: "ctaSection",
                      ref: ctaSection,
                      class: "text-center max-w-4xl mx-auto opacity-0"
                    }, [
                      createVNode("div", { class: "mb-6 inline-block" }, [
                        createVNode("span", { class: "text-white/90 text-lg font-medium" }, "\u{1F30D} Rejoignez la r\xE9volution verte")
                      ]),
                      createVNode("h2", { class: "text-5xl md:text-6xl font-bold mb-8 text-white" }, [
                        createTextVNode(" Ensemble pour une Sant\xE9"),
                        createVNode("br"),
                        createVNode("span", { class: "text-earth-100" }, "Plus Naturelle")
                      ]),
                      createVNode("p", { class: "text-xl mb-12 text-white/90 leading-relaxed max-w-2xl mx-auto" }, " Faites partie du changement. Adoptez une approche \xE9cologique de votre sant\xE9 d\xE8s aujourd'hui. "),
                      createVNode("div", { class: "flex flex-col sm:flex-row gap-6 justify-center" }, [
                        createVNode(_component_NuxtLink, {
                          to: "/pharmacies",
                          class: "group inline-flex items-center justify-center rounded-2xl bg-white text-nature-700 px-10 py-5 text-base font-semibold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "mr-2 text-2xl" }, "\u{1F33F}"),
                            createTextVNode(" D\xE9couvrir les Pharmacies Vertes "),
                            (openBlock(), createBlock("svg", {
                              class: "ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M13 7l5 5m0 0l-5 5m5-5H6"
                              })
                            ]))
                          ]),
                          _: 1
                        }),
                        createVNode(_component_NuxtLink, {
                          to: "/chatbot",
                          class: "inline-flex items-center justify-center rounded-2xl border-2 border-white text-white px-10 py-5 text-base font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "mr-2 text-2xl" }, "\u{1F4AC}"),
                            createTextVNode(" Assistant Naturel IA ")
                          ]),
                          _: 1
                        })
                      ])
                    ], 512)
                  ]),
                  createVNode("div", { class: "absolute top-10 left-10 text-8xl opacity-10" }, "\u{1F33F}"),
                  createVNode("div", { class: "absolute bottom-10 right-10 text-9xl opacity-10" }, "\u{1F343}")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0d9d0886"]]);

export { index as default };
//# sourceMappingURL=index-huzJob0D.mjs.map
