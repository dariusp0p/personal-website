"use client";

import React, { useState } from "react";

interface ThumbnailCarouselProps {
  images: string[];
  alt: string;
  className?: string;
}

const ThumbnailCarousel: React.FC<ThumbnailCarouselProps> = ({
  images,
  alt,
  className,
}) => {
  const [current, setCurrent] = useState(0);

  const prevImage = () =>
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const nextImage = () =>
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div
      className={`relative w-full flex items-center justify-center mb-4 ${
        className || ""
      }`}
    >
      <img
        src={images[current]}
        alt={alt}
        className="rounded-lg object-cover w-full h-48"
      />
      {images.length > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow hover:bg-white"
            onClick={prevImage}
            aria-label="Previous"
          >
            &#8592;
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow hover:bg-white"
            onClick={nextImage}
            aria-label="Next"
          >
            &#8594;
          </button>
        </>
      )}
    </div>
  );
};

export default ThumbnailCarousel;
