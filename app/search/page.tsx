import Link from "next/link";
import { ProductCard } from "@/components/catalog/ProductCard";
import { prisma } from "@/lib/db";
import { ru } from "@/lib/.i18n/ru";
import { publicProductOrderBy, publicProductWhere } from "@/lib/publicCatalog";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const products = query
    ? await prisma.product.findMany({
        where: {
          ...publicProductWhere,
          OR: [
            { name: { contains: query } },
            { description: { contains: query } },
            { brand: { contains: query } }
          ]
        },
        include: {
          category: true,
          subcategory: true,
          images: { orderBy: { displayOrder: "asc" }, take: 1 }
        },
        orderBy: publicProductOrderBy
      })
    : [];

  return (
    <main className="page">
      <Breadcrumbs items={[{ label: ru.common.home, href: "/" }, { label: ru.common.search }]} />

      <section className="search-heading">
        <span className="eyebrow">{ru.common.search}</span>
        <h1>{query ? ru.search.resultsTitle(query) : ru.search.title}</h1>
        <p>
          {query
            ? ru.search.resultsCount(products.length)
            : ru.search.intro}
        </p>
      </section>

      {query && products.length > 0 ? (
        <div className="product-grid compact">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>
            {query
              ? ru.search.noResults
              : ru.search.hint}
          </p>
          <Link className="button secondary" href="/">
            {ru.search.backHome}
          </Link>
        </div>
      )}
    </main>
  );
}
