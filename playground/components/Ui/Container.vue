<template>
  <Primitive :class="styles({ class: props.class })" v-bind="reactiveOmit(props, 'class')">
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core";
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, vue/require-default-prop
        class?: any;
      }
    >(),
    {
      as: "div",
    }
  );

  const styles = tv({
    base: "container mx-auto",
  });
</script>
