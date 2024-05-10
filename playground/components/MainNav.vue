<template>
  <UiNavbar sticky>
    <UiContainer class="flex h-16 items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-4">
        <!--  eslint-disable-next-line vue/html-self-closing -->
        <img src="/driver-head.svg" alt="Driver.js Logo Head" class="h-8 object-contain" />
        <span class="text-xl font-semibold">Nuxt Driver.js</span>
      </NuxtLink>
      <div class="flex items-center gap-3">
        <UiButton size="icon-sm" variant="outline" @click="toggleMode">
          <Icon name="lucide:sun" class="size-4" />
          <span class="sr-only">Toggle theme</span>
        </UiButton>
      </div>
    </UiContainer>
  </UiNavbar>
</template>

<script lang="ts" setup>
  const colorMode = useColorMode();
  const toggleMode = () => (colorMode.preference = colorMode.value === "dark" ? "light" : "dark");
</script>
