<script setup lang="ts">
  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "title",
      description: "",
    }
  );
</script>

<template>
  <div class="flex h-full w-full items-start justify-start bg-white">
    <div class="flex items-center justify-center pt-24">
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <img
        src="https://nuxt-driverjs.behonbaker.com/driver-head.svg"
        alt="Driver.js Logo"
        width="210"
        height="210"
        class="h-[210px] object-contain pb-6"
      />
      <div class="flex w-full flex-col items-center justify-center">
        <h1 class="text-center text-[80px] font-black">
          {{ title }}
        </h1>
        <p class="mb-0 px-20 pb-10 text-center text-4xl leading-relaxed">{{ description }}</p>
      </div>
    </div>
  </div>
</template>
