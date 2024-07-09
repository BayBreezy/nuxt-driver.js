import NuxtDriver from "../src/module";

const siteName = "Nuxt Driver.js";
const siteDescription = "Nuxt.js module for Driver.js";
const url = process.env.PUBLIC_URL || "http://localhost:3000";
const siteLocale = "en";

export default defineNuxtConfig({
  modules: [
    NuxtDriver,
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "nuxt-icon",
    "nuxt-simple-robots",
    "@nuxtjs/sitemap",
    "nuxt-og-image",
    "@vite-pwa/nuxt",
    "nuxt-security",
    "@hypernym/nuxt-gsap",
    "nuxt-shiki",
  ],

  shiki: {
    bundledLangs: ["js", "ts", "html", "css", "json", "vue", "vue-html", "bash", "yaml"],
    defaultTheme: {
      light: "andromeeda",
      dark: "andromeeda",
    },
  },

  vite: {
    optimizeDeps: { include: ["tailwind-variants", "radix-vue", "gsap", "gsap/ScrollTrigger"] },
  },

  gsap: {
    composables: true,
    provide: false,
    extraPlugins: { scrollTrigger: true },
  },

  pwa: {
    includeAssets: ["driver-head.svg"],
    workbox: { cleanupOutdatedCaches: true },
    client: { installPrompt: "nuxt-driver-install-prompt" },
    manifest: {
      name: siteName,
      short_name: siteName,
      description: siteDescription,
      theme_color: "#F5C84C",
      background_color: "#FFFFFF",
      icons: [
        {
          src: "/icons/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/pwa-maskable-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "/icons/pwa-maskable-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
  },

  devtools: { enabled: true },
  tailwindcss: { exposeConfig: true },
  colorMode: { classSuffix: "", fallback: "light" },
  experimental: { typedPages: true },

  imports: {
    imports: [
      { from: "tailwind-variants", name: "tv" },
      { from: "tailwind-variants", name: "VariantProps", type: true },
      { from: "vue-sonner", name: "toast", as: "useSonner" },
    ],
  },

  app: {
    head: {
      title: siteName,
      titleTemplate: `%s | ${siteName}`,
      link: [{ rel: "icon", type: "image/svg+xml", href: "/driver-head.svg" }],
    },
  },

  security: {
    hidePoweredBy: true,
    headers: {
      crossOriginEmbedderPolicy: "unsafe-none",
      contentSecurityPolicy: false,
    },
  },

  site: {
    name: siteName,
    url,
    trailingSlash: true,
    description: siteDescription,
    defaultLocale: siteLocale,
  },

  sitemap: {
    autoLastmod: true,
  },

  build: {
    transpile: ["vue-sonner"],
  },

  compatibilityDate: "2024-07-09",
});