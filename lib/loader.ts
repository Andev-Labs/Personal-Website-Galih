/** How long the loader stays before it enters the site on its own (ms). */
export const LOADER_FAILSAFE_MS = 8000

/**
 * Runs in <head> before first paint on every full page load (first visit or
 * refresh): reveals the server-rendered loader shell so the page never flashes
 * underneath. The timeout is a failsafe in case the app's JS never boots.
 */
export const loaderScript = `(function(){var d=document.documentElement;d.dataset.loader="open";setTimeout(function(){delete d.dataset.loader},${LOADER_FAILSAFE_MS})})()`
