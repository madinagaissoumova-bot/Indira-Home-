import Link from "next/link";
import type { CSSProperties } from "react";
import { VISIBILITY_STATUS } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { ru } from "@/lib/i18n/ru";

async function getHomeData() {
  return prisma.category.findMany({
    where: { status: VISIBILITY_STATUS.visible },
    orderBy: { displayOrder: "asc" },
    include: {
      subcategories: {
        where: { status: VISIBILITY_STATUS.visible },
        orderBy: { displayOrder: "asc" }
      }
    }
  });
}

export default async function HomePage() {
  const categories = await getHomeData();
  const heroCategory = categories[0];
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
          <div className="hero-actions">
            <Link className="button" href={heroCategory ? `/category/${heroCategory.slug}` : "/"}>
              {ru.home.viewCatalog}
            </Link>
            {heroCategory ? (
              <Link className="button secondary" href={`/category/${heroCategory.slug}`}>
                {ru.home.openCollection}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="home-editorial-note" aria-label={ru.home.benefitsLabel}>
          <span>{ru.home.delivery}</span>
          <span>{ru.home.paymentAfterConfirmation}</span>
        </div>

        <nav className="home-collection-links" aria-label={ru.home.collectionsLabel}>
          {categories.slice(0, 4).map((category) => (
            <Link href={`/category/${category.slug}`} key={category.id}>
              {category.name}
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}
