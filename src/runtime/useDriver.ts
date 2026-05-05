import { driver as createDriver } from "driver.js";
import type { Config, Driver } from "driver.js";

import { useRuntimeConfig } from "#imports";

export interface UseDriverOptions {
  /** Fully override the localStorage key for this tour. */
  storageKey?: string;
  /** When true, calling start() is a no-op if the tour has already been played. */
  autoSkip?: boolean;
}

export interface UseDriverReturn {
  /** Start the tour. Auto-marks as played when driver is destroyed. Respects autoSkip. */
  start: (config: Config) => void;
  /** Clear the played flag from storage, then start the tour unconditionally. */
  restart: (config: Config) => void;
  /** Returns true if this tour has been marked as played in localStorage. */
  isPlayed: () => boolean;
  /** Manually write the played flag to localStorage. */
  markPlayed: () => void;
  /** Remove the played flag from localStorage. */
  clear: () => void;
  /** Raw driver.js factory for advanced usage. */
  driver: (options?: Config) => Driver;
}

export function useDriver(name: string, options: UseDriverOptions = {}): UseDriverReturn {
  const runtimeConfig = useRuntimeConfig();
  const prefix =
    (runtimeConfig.public.driverJs as { storagePrefix?: string })?.storagePrefix ?? "nuxt-driver";
  const storageKey = options.storageKey ?? `${prefix}:${name}`;

  function isPlayed(): boolean {
    if (!import.meta.client) return false;
    return localStorage.getItem(storageKey) === "1";
  }

  function markPlayed(): void {
    if (!import.meta.client) return;
    localStorage.setItem(storageKey, "1");
  }

  function clear(): void {
    if (!import.meta.client) return;
    localStorage.removeItem(storageKey);
  }

  function start(config: Config): void {
    if (!import.meta.client) return;
    if (options.autoSkip && isPlayed()) return;

    const userOnDestroyed = config.onDestroyed;
    const instance = createDriver({
      ...config,
      onDestroyed(element, step, opts) {
        markPlayed();
        userOnDestroyed?.(element, step, opts);
      },
    });
    instance.drive();
  }

  function restart(config: Config): void {
    clear();
    start(config);
  }

  return { start, restart, isPlayed, markPlayed, clear, driver: createDriver };
}
