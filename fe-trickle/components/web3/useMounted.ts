"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * SSR-safe "have we hydrated yet" — server snapshot is false, client true.
 * Lets wallet-dependent UI render a stable shell on the server without
 * hydration mismatches (and without setState-in-effect).
 */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
