/** How long the loader stays before it enters the site on its own (ms). */
export const LOADER_FAILSAFE_MS = 8000

declare global {
  interface Window {
    /** Mirrors `<html data-loader>` outside the DOM React manages. */
    __labLoader?: "open"
  }
}

/**
 * Runs in <head> before first paint on every full page load (first visit or
 * refresh): reveals the server-rendered loader shell so the page never flashes
 * underneath. The timeout is a failsafe in case the app's JS never boots.
 *
 * The state is mirrored on `window.__labLoader`: Netlify injects an HTML comment
 * into <head>, so React discards the server HTML, re-renders the whole document
 * and wipes `data-loader`. `restoreLoader` uses the mirror to put it back.
 */
export const loaderScript = `(function(){var d=document.documentElement;d.dataset.loader=window.__labLoader="open";setTimeout(function(){delete d.dataset.loader;delete window.__labLoader},${LOADER_FAILSAFE_MS})})()`

export function isLoaderOpen() {
  return document.documentElement.dataset.loader === "open" || window.__labLoader === "open"
}

/** Puts `data-loader` back on <html> if a client re-render dropped it. */
export function restoreLoader() {
  if (window.__labLoader === "open") document.documentElement.dataset.loader = "open"
}

/** Releases the scroll lock and un-hides the page behind (see globals.css). */
export function closeLoader() {
  delete document.documentElement.dataset.loader
  delete window.__labLoader
}
