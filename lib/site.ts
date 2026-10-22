function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  return "http://localhost:3000"
}

/** Canonical origin. Set NEXT_PUBLIC_SITE_URL once the custom domain is live. */
export const siteUrl = resolveSiteUrl().replace(/\/$/, "")
