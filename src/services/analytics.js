export function trackEvent(name, properties = {}) {
  // Analytics stub — wire up to PostHog / GA4 when ready
  if (import.meta.env.DEV) {
    console.log('[analytics]', name, properties)
  }
}
