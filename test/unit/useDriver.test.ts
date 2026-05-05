import { beforeEach, describe, expect, it, vi } from "vitest";

// ---------------------------------------------------------------------------
// Mock Nuxt's #imports so useRuntimeConfig is available outside a Nuxt app
// ---------------------------------------------------------------------------
vi.mock("#imports", () => ({
  useRuntimeConfig: () => ({
    public: { driverJs: { storagePrefix: "nuxt-driver" } },
  }),
}));

// ---------------------------------------------------------------------------
// Mock driver.js — we only care about localStorage logic in these unit tests
// ---------------------------------------------------------------------------
const mockDrive = vi.fn();
const mockDestroy = vi.fn();
let capturedOnDestroyed: ((...args: unknown[]) => void) | undefined;

vi.mock("driver.js", () => ({
  driver: vi.fn((config?: { onDestroyed?: (...args: unknown[]) => void }) => {
    capturedOnDestroyed = config?.onDestroyed;
    return { drive: mockDrive, destroy: mockDestroy };
  }),
}));

// eslint-disable-next-line import/first -- vi.mock calls above are hoisted by Vitest
import { useDriver } from "../../src/runtime/useDriver";

// ---------------------------------------------------------------------------
// Local storage mock
// ---------------------------------------------------------------------------
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      Reflect.deleteProperty(store, key);
    },
    clear: () => {
      store = {};
    },
  };
})();

vi.stubGlobal("localStorage", localStorageMock);

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("useDriver", () => {
  beforeEach(() => {
    localStorageMock.clear();
    mockDrive.mockClear();
    capturedOnDestroyed = undefined;
  });

  describe("isPlayed", () => {
    it("returns false for a brand-new tour name", () => {
      const { isPlayed } = useDriver("onboarding");
      expect(isPlayed()).toBe(false);
    });

    it("returns true after markPlayed is called", () => {
      const { isPlayed, markPlayed } = useDriver("onboarding");
      markPlayed();
      expect(isPlayed()).toBe(true);
    });
  });

  describe("markPlayed / clear", () => {
    it("persists the played flag using the default storage key", () => {
      const { markPlayed } = useDriver("welcome");
      markPlayed();
      expect(localStorage.getItem("nuxt-driver:welcome")).toBe("1");
    });

    it("clear() removes the flag and isPlayed() returns false again", () => {
      const { isPlayed, markPlayed, clear } = useDriver("welcome");
      markPlayed();
      clear();
      expect(isPlayed()).toBe(false);
    });

    it("respects a custom storageKey option", () => {
      const { markPlayed, isPlayed } = useDriver("tour", {
        storageKey: "my-app:tour",
      });
      markPlayed();
      expect(localStorage.getItem("my-app:tour")).toBe("1");
      expect(isPlayed()).toBe(true);
    });
  });

  describe("start", () => {
    it("calls driver.drive() when the tour has not been played", () => {
      const { start } = useDriver("features");
      start({ steps: [] });
      expect(mockDrive).toHaveBeenCalledOnce();
    });

    it("auto-marks played via the onDestroyed hook", () => {
      const { start, isPlayed } = useDriver("features");
      start({ steps: [] });
      capturedOnDestroyed?.();
      expect(isPlayed()).toBe(true);
    });

    it("chains the caller's onDestroyed hook", () => {
      const userHook = vi.fn();
      const { start } = useDriver("features");
      start({ steps: [], onDestroyed: userHook });
      capturedOnDestroyed?.();
      expect(userHook).toHaveBeenCalledOnce();
    });

    it("skips when autoSkip is true and tour is already played", () => {
      const { start, markPlayed } = useDriver("features", { autoSkip: true });
      markPlayed();
      start({ steps: [] });
      expect(mockDrive).not.toHaveBeenCalled();
    });

    it("runs normally when autoSkip is true but tour has not been played", () => {
      const { start } = useDriver("features", { autoSkip: true });
      start({ steps: [] });
      expect(mockDrive).toHaveBeenCalledOnce();
    });
  });

  describe("restart", () => {
    it("clears the played flag and calls driver.drive()", () => {
      const { restart, markPlayed, isPlayed } = useDriver("features");
      markPlayed();
      restart({ steps: [] });
      expect(isPlayed()).toBe(false);
      expect(mockDrive).toHaveBeenCalledOnce();
    });
  });
});
