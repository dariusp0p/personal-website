"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

interface ImageCollectionProps {
  images: string[];
  alt?: string;
}

const ImageCollection: React.FC<ImageCollectionProps> = ({
  images,
  alt = "Project image",
}) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);

  const maxVisible = 3;
  const visible = images.slice(0, maxVisible);
  const overflow = images.length - maxVisible;

  // Navigation
  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  // Keyboard support
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, prev, next]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Touch / swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStart.current === null || touchEnd.current === null) return;
    const distance = touchStart.current - touchEnd.current;
    const minSwipe = 50;
    if (distance > minSwipe) next();
    if (distance < -minSwipe) prev();
    touchStart.current = null;
    touchEnd.current = null;
  };

  if (!images.length) return null;

  return (
    <>
      {/* Thumbnail card */}
      <button
        type="button"
        onClick={() => {
          setCurrent(0);
          setOpen(true);
        }}
        className="w-full cursor-pointer rounded-xl border-2 border-border bg-card p-3 shadow-md
          transition-all duration-200 hover:shadow-lg hover:scale-[1.01] focus:outline-none"
      >
        <div className="flex gap-3 items-center">
          {visible.map((src, i) => (
            <div
              key={i}
              className="relative h-24 flex-1 overflow-hidden rounded-lg bg-muted"
            >
              <Image
                src={src}
                alt={`${alt} ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 200px"
              />
            </div>
          ))}
          {overflow > 0 && (
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-muted">
              <span className="text-xl font-bold text-card-foreground">
                +{overflow}
              </span>
            </div>
          )}
        </div>
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          {/* Modal content */}
          <div
            className="relative flex w-full max-w-4xl flex-col items-center px-4"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-4 cursor-pointer text-white/80 hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <FiX className="text-3xl" />
            </button>

            {/* Prev button */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2
                cursor-pointer text-white/80 backdrop-blur-sm hover:bg-white/20 hover:text-white
                transition-all z-10 md:left-2"
              aria-label="Previous image"
            >
              <FiChevronLeft className="text-3xl" />
            </button>

            {/* Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src={images[current]}
                alt={`${alt} ${current + 1}`}
                fill
                className="object-contain transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, 900px"
                priority
              />
            </div>

            {/* Next button */}
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2
                cursor-pointer text-white/80 backdrop-blur-sm hover:bg-white/20 hover:text-white
                transition-all z-10 md:right-2"
              aria-label="Next image"
            >
              <FiChevronRight className="text-3xl" />
            </button>

            {/* Dots indicator */}
            <div className="mt-4 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 rounded-full transition-all duration-200 ${
                    i === current
                      ? "w-6 bg-white"
                      : "w-2.5 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <span className="mt-2 text-sm text-white/60">
              {current + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCollection;
