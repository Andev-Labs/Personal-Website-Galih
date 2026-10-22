import Image, { type ImageProps } from "next/image"

import { cn } from "@/lib/utils"

type DuotoneImageProps = Omit<ImageProps, "className" | "fill"> & {
  className?: string
  imageClassName?: string
}

/**
 * The shared warm duotone grade: grayscale photo multiplied over the highlight
 * tone, with shadows lifted to Espresso. Any photo dropped in gets the same look.
 */
export function DuotoneImage({ className, imageClassName, alt, ...props }: DuotoneImageProps) {
  return (
    <div className={cn("relative isolate overflow-hidden bg-duo-highlight", className)}>
      <Image
        fill
        alt={alt}
        className={cn("object-cover mix-blend-multiply contrast-110 grayscale", imageClassName)}
        {...props}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-duo-shadow mix-blend-lighten" />
    </div>
  )
}
