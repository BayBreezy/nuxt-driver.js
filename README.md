![Driver.js Image](/docs//public//driver-head.svg)

# Nuxt Driver.js

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]
[![CI](https://github.com/BayBreezy/nuxt-driver.js/actions/workflows/ci.yml/badge.svg)](https://github.com/BayBreezy/nuxt-driver.js/actions/workflows/ci.yml)

A Nuxt module that wraps [driver.js](https://driverjs.com) and adds persistent tour tracking via localStorage. Guide your users through your Nuxt application with multi-step tours that remember where they left off.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [📖 &nbsp;Documentation](https://nuxt-driverjs.behonbaker.com)
- [🤝 &nbsp;Contributing](./CONTRIBUTING.md)

## Deployment Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/13144247-7452-442a-a2ef-25296b730111/deploy-status)](https://app.netlify.com/sites/nuxt-driverjs/deploys)

## Features

- **Tour persistence** — completed tours are stored in localStorage so they are not replayed on every page load.
- **Restart support** — programmatically clear a tour's played state and replay it at any time.
- **Auto-skip** — optionally skip a tour silently if the user has already completed it.
- **Easy to use** — one auto-imported composable, zero boilerplate.
- **Customizable** — every driver.js option is available.
- **Responsive** — works on all devices and screen sizes.

## Quick Setup

```bash
bun add nuxt-driver.js
```

Add the module to your `nuxt.config`:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-driver.js"],
});
```

## `useDriver` Composable

```ts
const { start, restart, isPlayed, markPlayed, clear, driver } = useDriver(name, options?)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `string` | Unique identifier for the tour. Used as part of the localStorage key. |
| `options` | `UseDriverOptions` | Optional configuration (see below). |

### `UseDriverOptions`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `storageKey` | `string` | `"${storagePrefix}:${name}"` | Fully override the localStorage key. |
| `autoSkip` | `boolean` | `false` | Skip `start()` silently when the tour has already been played. |

### Return Value

| Member | Type | Description |
|--------|------|-------------|
| `start(config)` | `(config: Config) => void` | Start the tour. Marks as played on completion. |
| `restart(config)` | `(config: Config) => void` | Clear the played flag and start unconditionally. |
| `isPlayed()` | `() => boolean` | Returns `true` if the tour has been completed. |
| `markPlayed()` | `() => void` | Manually write the played flag to localStorage. |
| `clear()` | `() => void` | Remove the played flag from localStorage. |
| `driver` | `(options?: Config) => Driver` | Raw driver.js factory for advanced use. |

### Example

```vue
<script setup lang="ts">
onMounted(() => {
  const { start } = useDriver("onboarding", { autoSkip: true });

  start({
    showProgress: true,
    animate: true,
    steps: [
      {
        element: "#welcome",
        popover: {
          title: "Welcome",
          description: "Let us show you around.",
          side: "bottom",
        },
      },
      {
        element: "#dashboard",
        popover: {
          title: "Your Dashboard",
          description: "Everything you need in one place.",
          side: "right",
        },
      },
    ],
  });
});
</script>
```

### Restart a Tour

```vue
<script setup lang="ts">
const { restart } = useDriver("onboarding");

function replayTour() {
  restart({
    steps: [
      { element: "#welcome", popover: { title: "Welcome back!" } },
    ],
  });
}
</script>

<template>
  <button @click="replayTour">Replay tour</button>
</template>
```

## Module Options

Configure the module in `nuxt.config` under the `driverJs` key:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-driver.js"],
  driverJs: {
    storagePrefix: "my-app", // default: "nuxt-driver"
  },
});
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `storagePrefix` | `string` | `"nuxt-driver"` | Prefix for all localStorage tour keys. |

## Contribution

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full development guide.

```bash
# Install dependencies
bun install

# Generate type stubs and prepare the playground
bun run dev:prepare

# Start the playground dev server
bun run dev

# Run linting (ESLint + oxlint)
bun run lint

# Format with oxfmt
bun run fmt

# Run tests
bun run test

# Release (maintainers only)
bun run release
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-driver.js/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-driver.js
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-driver.js.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-driver.js
[license-src]: https://img.shields.io/npm/l/nuxt-driver.js.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-driver.js
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
