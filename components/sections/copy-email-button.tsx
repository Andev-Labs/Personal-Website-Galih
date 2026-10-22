"use client"

import { Check, Copy } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2400)
    return () => clearTimeout(timer)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      toast.success("Email copied to clipboard")
    } catch {
      toast.error("Couldn't copy — please select the address instead")
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        {copied ? (
          <Check aria-hidden="true" className="size-4" />
        ) : (
          <Copy aria-hidden="true" className="size-4" />
        )}
        <span>{copied ? "Copied" : "Copy email"}</span>
      </button>
      {/* Redundant live region so the result is announced even if the toast is missed */}
      <span className="sr-only" role="status">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </>
  )
}
