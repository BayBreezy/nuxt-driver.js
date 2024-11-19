<template>
  <div>
    <div class="pointer-events-none fixed inset-0 overflow-x-hidden">
      <div class="relative hidden h-full w-full bg-background dark:block">
        <div
          class="absolute bottom-0 left-[-10%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"
        />
        <div
          class="absolute bottom-20 right-[-10%] top-[0%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"
        />
      </div>
      <div
        class="pointer-events-none absolute inset-0 size-full bg-[linear-gradient(to_right,theme(colors.border)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border)_1px,transparent_1px)] bg-[size:80px_90px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_170%)] dark:hidden"
      />
    </div>
    <UiContainer
      class="relative z-10 flex flex-col items-center justify-center py-20 lg:h-dvh lg:py-0"
    >
      <p id="welcome" class="text-center font-medium text-muted-foreground">Welcome</p>
      <h1
        id="header"
        class="mt-5 text-center text-4xl font-semibold tracking-tight md:text-5xl lg:mt-10 lg:text-7xl"
      >
        Nuxt Driver.js
      </h1>
      <p
        id="description"
        class="mx-auto mt-5 max-w-xl text-pretty text-center text-xl text-muted-foreground lg:text-xl"
      >
        Quickly guide your users through your Nuxt.js application with Driver.js. Nuxt Driver.js is
        a simple wrapper around the driver.js package(all credits to them) for creating guided tours
        and feature introductions for your Nuxt.js applications.
      </p>
      <div class="mt-8 grid w-full grid-cols-1 gap-3 sm:flex sm:items-center sm:justify-center">
        <UiButton
          id="view-docs"
          size="lg"
          external
          class="w-full md:w-auto"
          href="https://driverjs.com/docs/basic-usage"
          target="_blank"
          text="View Docs"
        />
        <UiButton
          id="get-started-btn"
          href="#get-started"
          size="lg"
          class="w-full md:w-auto"
          text="Get Started"
          variant="outline"
        />
      </div>
    </UiContainer>
    <UiContainer id="get-started" class="relative scroll-mt-20 py-16 lg:py-24">
      <h2 class="mb-2 text-2xl font-semibold tracking-tight lg:text-4xl">Getting started</h2>
      <ContentRenderer :value="data" />
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  const title = "Nuxt Driver.js";
  const description =
    "A simple wrapper around the driver.js package for creating guided tours and feature introductions for your Nuxt.js applications.";
  defineOgImageComponent("Doc", {
    title,
    description,
  });
  useSeoMeta({ title, description, ogTitle: title, ogDescription: description });
  const { data } = await useAsyncData("page-data", () => queryContent("/install").findOne());
  onMounted(() => {
    const driver = useDriver({
      showProgress: true,
      animate: true,
      steps: [
        {
          element: "#welcome",
          popover: {
            title: "Welcome to Nuxt Driver.js",
            description:
              "Quickly guide your users through your Nuxt.js application with Driver.js.",
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
            description:
              "Learn more about Driver.js and how to use it in your Nuxt.js applications.",
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
    useGsap.from("#get-started", {
      opacity: 0,
      y: 30,
      duration: 0.7,
      scale: 0.95,
      scrollTrigger: {
        trigger: "#get-started",
        toggleActions: "play none none reset",
      },
    });
  });

  useHead({
    htmlAttrs: {
      class: "scroll-smooth",
    },
  });
</script>

<style>
  pre {
    @apply my-5 max-h-[450px] overflow-auto rounded-md bg-[#23262E] p-4 leading-relaxed;
  }
</style>
