import Link from "next/link";
import type { CSSProperties } from "react";
import { ru } from "@/lib/.i18n/ru";
import { listVisibleCategories } from "@/lib/publicCatalog";

export default async function HomePage() {
  const categories = await listVisibleCategories();
  const primaryCategory = categories[0];
  const heroStyle = {
    "--home-hero-image": 'url("/uploads/brand/home-hero-tableware.png")'
  } as CSSProperties;

  return (
    <main className="page home-page">
      <section className="hero-home-editorial" style={heroStyle}>
        <div className="hero-copy">
          <span className="eyebrow">{ru.home.eyebrow}</span>
          <h1>{ru.brand.name}</h1>
          <p>{ru.home.description}</p>
          {primaryCategory ? (
            <div className="hero-actions">
              <Link className="button" href={`/category/${primaryCategory.slug}`}>
                {ru.home.openCollection}
              </Link>
            </div>
          ) : null}
        </div>

        <div className="home-editorial-note" aria-label={ru.home.benefitsLabel}>
          <span>{ru.home.delivery}</span>
          <span>{ru.home.paymentAfterConfirmation}</span>
        </div>
      </section>
    </main>
  );
}
