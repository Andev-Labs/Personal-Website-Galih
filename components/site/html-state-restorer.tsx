"use client"

import { useLayoutEffect } from "react"

import { restoreLoader } from "@/lib/loader"
import { restoreTheme } from "@/lib/theme"

/**
 * Hosts can inject markup into <head> (Netlify adds an HTML comment), which
 * makes React throw away the server HTML and re-render the whole document,
 * wiping what the <head> scripts set on <html>. Puts it back before paint.
 * Render it first in <body> so other components' effects see the restored state.
 */
export function HtmlStateRestorer() {
  useLayoutEffect(() => {
    restoreTheme()
    restoreLoader()
  }, [])

  return null
}
