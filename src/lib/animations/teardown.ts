/**
 * Registry for session-level listeners that must not survive a view
 * transition. init* functions register their window/document listeners here;
 * teardownMotion() flushes them before scenes re-run, so handlers never
 * accumulate across navigations.
 */
const fns: Array<() => void> = [];

export function onTeardown(fn: () => void): void {
  fns.push(fn);
}

export function runTeardown(): void {
  while (fns.length) fns.pop()?.();
}
