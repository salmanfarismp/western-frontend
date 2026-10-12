"use client";

import React, { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { FALLBACK_IMAGE_URL } from "@/lib/utils/media";

export interface SafeImageProps extends Omit<ImageProps, "src"> {
  src?: string | null;
  fallbackSrc?: string;
}

export function SafeImage({
  src,
  fallbackSrc = FALLBACK_IMAGE_URL,
  alt = "Westernswings Handcrafted",
  className,
  fill,
  priority,
  onLoad,
  onError,
  ...rest
}: SafeImageProps) {
  const targetSrc = (!src || typeof src !== "string" || src.trim() === "") ? fallbackSrc : src;

  const [prevSrc, setPrevSrc] = useState<string>(targetSrc);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  if (prevSrc !== targetSrc) {
    setPrevSrc(targetSrc);
    setHasError(false);
    setIsLoading(true);
  }

  const finalSrc = hasError ? fallbackSrc : targetSrc;

  return (
    <>
      {isLoading && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-surface-container animate-pulse z-1 pointer-events-none"
        />
      )}
      <Image
        key={finalSrc}
        src={finalSrc}
        alt={alt}
        fill={fill}
        priority={priority}
        className={`${className || ""} transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={(e) => {
          setIsLoading(false);
          onLoad?.(e);
        }}
        onError={(e) => {
          setHasError(true);
          setIsLoading(false);
          onError?.(e);
        }}
        {...rest}
      />
    </>
  );
}
