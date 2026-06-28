import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { VISIBILITY_STATUS } from "@/lib/constants";
import { ProductCard } from "@/components/catalog/ProductCard";
import { getCategoryVisual, getCategoryVisualStyle } from "@/lib/categoryVisuals";
import { prisma } from "@/lib/db";
import { ru } from "@/lib/.i18n/ru";
import { publicProductOrderBy, publicProductWhere } from "@/lib/publicCatalog";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

export default async function CategoryPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await prisma.category.findFirst({
    where: { slug, status: VISIBILITY_STATUS.visible },
    include: {
      subcategories: {
        where: { status: VISIBILITY_STATUS.visible },
        orderBy: { displayOrder: "asc" }
      },
      products: {
        where: publicProductWhere,
        include: {
          category: true,
          subcategory: true,
          images: { orderBy: { displayOrder: "asc" }, take: 1 }
        },
        orderBy: publicProductOrderBy
      }
    }
  });

  if (!category) {
    notFound();
  }

  const visual = getCategoryVisual(category.slug);

  return (
    <main className="page">
      <Breadcrumbs items={[{ label: ru.common.home, href: "/" }, { label: ru.common.catalog, href: "/" }, { label: category.name }]} />

      <section className="category-hero" style={getCategoryVisualStyle(category.slug)}>
        <div className="category-hero-copy">
          <span className="eyebrow">{ru.catalog.collection}</span>
          <h1>{category.name}</h1>
          <p>{ru.catalog.categoryDescriptions[category.slug] ?? ru.catalog.defaultCategoryDescription}</p>
        </div>
        <div className="category-hero-image" aria-hidden="true">
          <Image
            alt=""
            className="category-hero-photo"
            height={720}
            src={visual.image}
            unoptimized
            width={960}
          />
        </div>
      </section>

      <section className="subcategory-strip" aria-label={ru.catalog.subcategories}>
        {category.subcategories.map((subcategory) => (
          <Link className="chip" href={`/subcategory/${subcategory.slug}`} key={subcategory.id}>
            {subcategory.name}
          </Link>
        ))}
      </section>

      <section className="collection-toolbar" aria-label={ru.catalog.collectionSummary}>
        <span>{ru.catalog.productCount(category.products.length)}</span>
      </section>

      {category.products.length > 0 ? (
        <div className="product-grid compact">
          {category.products.map((product) => (
            <ProductCard key={product.id} meta="subcategory" product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>{ru.catalog.noCategoryProducts}</p>
          <Link className="button secondary" href="/">
            {ru.catalog.backToCategories}
          </Link>
        </div>
      )}
    </main>
  );
}
