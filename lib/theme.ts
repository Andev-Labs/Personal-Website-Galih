export const THEME_STORAGE_KEY = "theme"

/**
 * Runs in <head> before first paint: a saved choice wins, otherwise follow the OS.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`
