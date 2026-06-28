import Link from "next/link";
import { notFound } from "next/navigation";
import { VISIBILITY_STATUS } from "@/lib/constants";
import { ProductCard } from "@/components/catalog/ProductCard";
import { prisma } from "@/lib/db";
import { ru } from "@/lib/.i18n/ru";
import { publicProductOrderBy, publicProductWhere } from "@/lib/publicCatalog";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

export default async function SubcategoryPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const subcategory = await prisma.subcategory.findFirst({
    where: {
      slug,
      status: VISIBILITY_STATUS.visible,
      category: { status: VISIBILITY_STATUS.visible }
    },
    include: {
      category: true,
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

  if (!subcategory) {
    notFound();
  }

  return (
    <main className="page">
      <Breadcrumbs
        items={[
          { label: ru.common.catalog, href: "/" },
          { label: subcategory.category.name, href: `/category/${subcategory.category.slug}` },
          { label: subcategory.name }
        ]}
      />
      <section className="hero hero-compact">
        <span className="eyebrow">{subcategory.category.name}</span>
        <h1>{subcategory.name}</h1>
        <p>{ru.catalog.productCount(subcategory.products.length)} {ru.catalog.inSection}</p>
      </section>

      {subcategory.products.length > 0 ? (
        <div className="product-grid">
          {subcategory.products.map((product) => (
            <ProductCard compact={false} key={product.id} meta="category" product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>{ru.catalog.noSubcategoryProducts}</p>
          <Link className="button secondary" href={`/category/${subcategory.category.slug}`}>
            {ru.catalog.backToCategory}
          </Link>
        </div>
      )}
    </main>
  );
}
