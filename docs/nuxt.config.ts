import NuxtDriver from "../src/module";

const siteName = "Nuxt Driver.js";
const siteDescription = "Nuxt module for Driver.js";
const url = "https://nuxt-driverjs.behonbaker.com";
const siteLocale = "en";

export default defineNuxtConfig({
  extends: ["@baybreezy/docd"],
  modules: [NuxtDriver, "@vite-pwa/nuxt", "nuxt-security"],

  llms: {
    title: siteName,
    description: siteDescription,
    domain: url,
    full: {
      title: siteName,
      description: siteDescription,
    },
  },

  pwa: {
    includeAssets: ["icon.png"],
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
          src: "/icons/icon.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/icon.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/web-app-manifest-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "/icons/web-app-manifest-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
  },

  app: {
    head: {
      title: siteName,
      titleTemplate: `%s | ${siteName}`,
      link: [{ rel: "icon", type: "image/svg+xml", href: "/icon.png" }],
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
  compatibilityDate: "latest",
});
