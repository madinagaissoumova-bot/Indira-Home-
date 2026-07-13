import type { CSSProperties } from "react";

const CATEGORY_VISUALS: Record<string, { image: string; tone: string }> = {
  posuda: {
    image: "/uploads/brand/home-strict-posuda.png",
    tone: "#ead8c7"
  },
  kuhnya: {
    image: "/uploads/brand/home-strict-kuhnya.png",
    tone: "#ead8c7"
  },
  "bytovaya-tehnika": {
    image: "/uploads/brand/home-strict-tehnika-smeg.png",
    tone: "#ead8c7"
  },
  dekor: {
    image: "/uploads/brand/home-strict-dekor.png",
    tone: "#ead8c7"
  }
};

export function getCategoryVisual(slug: string) {
  return CATEGORY_VISUALS[slug] ?? CATEGORY_VISUALS.posuda;
}

export function getCategoryVisualStyle(slug: string): CSSProperties {
  const visual = getCategoryVisual(slug);

  return {
    "--category-image": `url("${visual.image}")`,
    "--category-hero-image": `url("${visual.image}")`,
    "--category-tone": visual.tone
  } as CSSProperties;
}
