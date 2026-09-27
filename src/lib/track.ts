/**
 * Analytics hook. There's no analytics library yet; this is the one place to
 * wire one in later. Intentionally a no-op.
 */
export function trackEvent(name: string, props?: Record<string, unknown>): void {
  void name;
  void props;
}
