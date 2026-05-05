<template>
  <div>basic</div>
</template>

<script setup lang="ts">
  // Verify that useDriver is auto-imported and callable without throwing
  const { isPlayed } = useDriver("fixture-tour");
  const _played = isPlayed();
</script>
