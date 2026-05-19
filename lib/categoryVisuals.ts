import type { CSSProperties } from "react";

const CATEGORY_VISUALS: Record<string, { image: string; tone: string }> = {
  posuda: {
    image: "/uploads/products/nabor-posudy-belyi-serviz-premium.png",
    tone: "#ead6d9"
  },
  kuhnya: {
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80",
    tone: "#eadcc7"
  },
  "bytovaya-tehnika": {
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=900&q=80",
    tone: "#e9ded4"
  },
  dekor: {
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80",
    tone: "#efd8dc"
  }
};

export function getCategoryVisual(slug: string) {
  return CATEGORY_VISUALS[slug] ?? CATEGORY_VISUALS.posuda;
}

export function getCategoryVisualStyle(slug: string): CSSProperties {
  const visual = getCategoryVisual(slug);

  return {
    "--category-image": `url("${visual.image}")`,
    "--category-tone": visual.tone
  } as CSSProperties;
}
