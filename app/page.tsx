import Link from "next/link";
import type { CSSProperties } from "react";
import { VISIBILITY_STATUS } from "@/lib/constants";
import { prisma } from "@/lib/db";

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
          <span className="eyebrow">Новая коллекция</span>
          <h1>Indira Home</h1>
          <p>
            Спокойная сервировка, теплые фактуры и предметы для дома,
            которые выглядят красиво каждый день.
          </p>
          <div className="hero-actions">
            <Link className="button" href={heroCategory ? `/category/${heroCategory.slug}` : "/"}>
              Смотреть каталог
            </Link>
            {heroCategory ? (
              <Link className="button secondary" href={`/category/${heroCategory.slug}`}>
                Открыть коллекцию
              </Link>
            ) : null}
          </div>
        </div>

        <div className="home-editorial-note" aria-label="Преимущества">
          <span>Доставка по Чеченской Республике</span>
          <span>Оплата после подтверждения</span>
        </div>

        <nav className="home-collection-links" aria-label="Коллекции">
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
