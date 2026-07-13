"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type GalleryImage = {
  id: string;
  url: string;
  alt: string;
};

type ProductGalleryProps = {
  images: GalleryImage[];
};

export function ProductGallery({ images }: ProductGalleryProps) {
  const items = useMemo(() => images.filter((image) => image?.url), [images]);
  const [activeIndex, setActiveIndex] = useState(0);

  if (items.length === 0) {
    return <div className="gallery-main" />;
  }

  const activeImage = items[activeIndex] ?? items[0];

  function goToPrevious() {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  }

  function goToNext() {
    setActiveIndex((current) => (current + 1) % items.length);
  }

  return (
    <div className="product-gallery-carousel">
      <div className="gallery-stage">
        <Image
          alt={activeImage.alt}
          className="gallery-main"
          height={1125}
          src={activeImage.url}
          unoptimized
          width={900}
        />
        {items.length > 1 ? (
          <div className="gallery-nav" aria-label="Navigation des photos">
            <button className="gallery-nav-button" onClick={goToPrevious} type="button" aria-label="Photo précédente">
              ‹
            </button>
            <span className="gallery-counter" aria-live="polite">
              {activeIndex + 1} / {items.length}
            </span>
            <button className="gallery-nav-button" onClick={goToNext} type="button" aria-label="Photo suivante">
              ›
            </button>
          </div>
        ) : null}
      </div>

      {items.length > 1 ? (
        <div className="gallery-thumbs" aria-label="Vignettes des photos">
          {items.map((image, index) => (
            <button
              aria-label={`Afficher la photo ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={`gallery-thumb-button${index === activeIndex ? " is-active" : ""}`}
              key={image.id}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <Image
                alt={image.alt}
                className="gallery-thumb"
                height={240}
                src={image.url}
                unoptimized
                width={240}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
