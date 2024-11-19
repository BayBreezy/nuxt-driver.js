---
title: Install
---

[To get started, install the package with your package manager of choice.]{class="text-lg text-muted-foreground"}

```bash
npm install nuxt-driver.js
```

[Now add the module to the modules section of your nuxt.config file.]{class="text-lg text-muted-foreground"}

```ts
export default defineNuxtConfig({
  modules: ["nuxt-driver.js"];
});
```

[That is it! You are now ready to start creating guided tours and feature introductions for
your Nuxt.js applications. The example used on this page is a simple example of how you can
use Nuxt Driver.js to guide users through your application.]{class="text-lg text-muted-foreground"}

```ts
onMounted(() => {
  const driver = useDriver({
    showProgress: true,
    animate: true,
    steps: [
      {
        element: "#welcome",
        popover: {
          title: "Welcome to Nuxt Driver.js",
          description: "Quickly guide your users through your Nuxt.js application with Driver.js.",
          side: "bottom",
        },
      },
      {
        element: "#header",
        popover: {
          title: "Nuxt Driver.js",
          description:
            "A simple wrapper around the driver.js package for creating guided tours and feature introductions for your Nuxt.js applications.",
          side: "bottom",
        },
      },
      {
        element: "#description",
        popover: {
          title: "Nuxt Driver.js",
          description:
            "A simple wrapper around the driver.js package for creating guided tours and feature introductions for your Nuxt.js applications.",
          side: "bottom",
        },
      },
      {
        element: "#view-docs",
        popover: {
          title: "View Docs",
          description: "Learn more about Driver.js and how to use it in your Nuxt.js applications.",
          side: "top",
        },
      },
    ],
  });
  const tl = useGsap.timeline();

  tl.from("#welcome", { opacity: 0, y: 30, duration: 0.4 })
    .from("#header", { opacity: 0, y: 30, duration: 0.4 }, "-=0.1")
    .from("#description", { opacity: 0, y: 30, duration: 0.4 }, "-=0.1")
    .from("#view-docs", { opacity: 0, y: 30, duration: 0.4 }, "-=0.1")
    .from("#get-started-btn", { opacity: 0, y: 30, duration: 0.4 }, "-=0.1")
    .call(() => {
      driver.drive();
    });
});
```
