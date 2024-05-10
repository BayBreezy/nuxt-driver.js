import { defineNuxtModule, addImports, createResolver } from "@nuxt/kit";
import { name, version } from "../package.json";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: "driverJs",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);
    const runtimeDir = resolver.resolve("./runtime");
    // transpile runtime files
    _nuxt.options.build.transpile ||= [];
    _nuxt.options.build.transpile.push(runtimeDir);
    //Add css for driver.js
    _nuxt.options.css ||= [];
    _nuxt.options.css.unshift("driver.js/dist/driver.css");
    // import composable
    addImports({
      from: resolver.resolve("./runtime/useDriver"),
      name: "useDriver",
      as: "useDriver",
    });
    // optimize driver.js
    _nuxt.options.vite.optimizeDeps ||= {};
    _nuxt.options.vite.optimizeDeps.include ||= [];
    _nuxt.options.vite.optimizeDeps.include.push("driver.js");
    // add tab for driver docs
    _nuxt.hook("devtools:customTabs", (tabs) => {
      tabs.push({
        // unique identifier
        name: "nuxt-driver.js-docs",
        // title to display in the tab
        title: "Driver.js Docs",
        // any icon from Iconify, or a URL to an image
        icon: "https://driverjs.com/driver-head.svg",
        // iframe view
        view: {
          type: "iframe",
          src: "https://driverjs.com/",
        },
      });
    });
  },
});
