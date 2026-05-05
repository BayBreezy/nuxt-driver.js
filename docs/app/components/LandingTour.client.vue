<template>
  <UiButton
    v-if="isPlayed()"
    @click="
      clear();
      playTour();
    "
    >Replay Landing Tour</UiButton
  >
</template>
<script setup lang="ts">
  const { start, isPlayed, clear } = useDriver("docs-landing-tour", { autoSkip: true });

  const playTour = () => {
    start({
      showProgress: true,
      animate: true,
      allowClose: false,
      disableActiveInteraction: true,
      steps: [
        {
          element: "h1",
          popover: {
            title: "Welcome to Nuxt Driver.js",
            description:
              "A Nuxt module that wraps Driver.js and adds persistent tour tracking — guided tours that remember where they left off.",
            side: "bottom",
            align: "start",
          },
        },
        {
          element: 'a[href="/getting-started/installation"]',
          popover: {
            title: "Get Started",
            description:
              "Follow the installation guide to add guided tours to your Nuxt application in two steps.",
            side: "top",
            align: "start",
          },
        },
      ],
    });
  };
  onMounted(() => {
    if (!isPlayed()) playTour();
  });
</script>
