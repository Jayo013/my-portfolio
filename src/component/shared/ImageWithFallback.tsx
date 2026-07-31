"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageWithFallbackProps = {
  src?: string;
  alt: string;
  wrapperClassName?: string;
  sizes?: string;
};

export default function ImageWithFallback({ src, alt, wrapperClassName, sizes }: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);
  const showFallback = !src || failed;

  return (
    <div className={cn("relative overflow-hidden bg-muted", wrapperClassName)}>
      {showFallback ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/15 via-muted to-primary/5">
          <ImageOff className="h-8 w-8 text-muted-foreground/40" aria-hidden />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
