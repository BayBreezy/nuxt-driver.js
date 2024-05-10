<template>
  <Primitive :class="styles({ sticky, class: props.class })" v-bind="reactiveOmit(props, 'class')">
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        // eslint-disable-next-line vue/require-default-prop, @typescript-eslint/no-explicit-any
        class?: any;
        sticky?: boolean;
      }
    >(),
    {
      as: "header",
    }
  );

  const styles = tv({
    base: "z-20 border-b bg-background/90 backdrop-blur",
    variants: {
      sticky: {
        true: "sticky top-0",
      },
    },
  });
</script>
