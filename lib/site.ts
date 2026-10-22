/** Production origin on Netlify, used whenever NEXT_PUBLIC_SITE_URL is not set. */
const PRODUCTION_URL = "https://khrisanty.netlify.app"

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.NODE_ENV === "development") return "http://localhost:3000"
  return PRODUCTION_URL
}

/** Canonical origin. Set NEXT_PUBLIC_SITE_URL in Netlify once a custom domain is live. */
export const siteUrl = resolveSiteUrl().replace(/\/$/, "")
