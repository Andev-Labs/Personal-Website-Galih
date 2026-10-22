export const LOADER_STORAGE_KEY = "lab-loader-seen"

/**
 * Runs in <head> before first paint: on the first home visit of a session,
 * reveal the server-rendered loader shell so Home never flashes underneath.
 */
export const loaderScript = `(function(){try{if(location.pathname==="/"&&!sessionStorage.getItem("${LOADER_STORAGE_KEY}"))document.documentElement.dataset.loader="open"}catch(e){}})()`
