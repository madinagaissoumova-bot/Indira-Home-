import Link from "next/link";
import { notFound } from "next/navigation";
import { VISIBILITY_STATUS } from "@/lib/constants";
import { CatalogControls } from "@/components/catalog/CatalogControls";
import { ProductCard } from "@/components/catalog/ProductCard";
import { getCategoryVisualStyle } from "@/lib/categoryVisuals";
import { getFallbackSubcategory, isDatabaseUnavailable } from "@/lib/fallbackCatalog";
import { prisma } from "@/lib/db";
import { ru } from "@/lib/i18n/ru";
import {
  filterAndSortPublicProducts,
  publicProductOrderBy,
  publicProductWhere,
  type PublicSearchSort
} from "@/lib/publicCatalog";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PublicFooter, PublicServiceStrip } from "@/components/layout/PublicFooter";

function getSearchValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeSort(value: string | undefined): PublicSearchSort {
  if (value === "price-asc" || value === "price-desc" || value === "new-first") {
    return value;
  }

  return "default";
}

export default async function SubcategoryPage({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const query = (await searchParams) ?? {};
  const currentSort = normalizeSort(getSearchValue(query.sort));
  const inStockOnly = getSearchValue(query.inStock) === "1";
  const newOnly = getSearchValue(query.new) === "1";
  let subcategory;

  try {
    subcategory = await prisma.subcategory.findFirst({
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
        },
      }
    });
  } catch (error) {
    if (!isDatabaseUnavailable(error)) {
      throw error;
    }

    subcategory = getFallbackSubcategory(slug);
  }

  if (!subcategory) {
    notFound();
  }

  const visibleProducts = filterAndSortPublicProducts(subcategory.products, {
    inStockOnly,
    newOnly,
    sort: currentSort
  });
  const hasActiveControls = currentSort !== "default" || inStockOnly || newOnly;

  return (
    <main className="page collection-page">
      <section
        className="category-hero category-hero-bleed"
        style={getCategoryVisualStyle(subcategory.category.slug)}
      >
        <div className="category-hero-copy">
          <Breadcrumbs
            items={[
              { label: ru.common.home, href: "/" },
              { label: ru.common.catalog, href: "/" },
              { label: subcategory.category.name, href: `/category/${subcategory.category.slug}` },
              { label: subcategory.name }
            ]}
          />
          <h1>{subcategory.name}</h1>
        </div>
      </section>

      <section className="collection-heading-row" aria-label={subcategory.name}>
        <div>
          <h2>{subcategory.name}</h2>
          <span>{ru.catalog.productCount(subcategory.products.length)}</span>
        </div>
      </section>

      <CatalogControls
        basePath={`/subcategory/${subcategory.slug}`}
        currentSort={currentSort}
        inStockOnly={inStockOnly}
        newOnly={newOnly}
        resetHref={`/subcategory/${subcategory.slug}`}
        leading={
          <Link className="chip category-chip" href={`/category/${subcategory.category.slug}`}>
            {ru.catalog.backToCategory}
          </Link>
        }
      />

      {visibleProducts.length > 0 ? (
        <div className="product-grid compact">
          {visibleProducts.map((product) => (
            <ProductCard compact={false} key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>{hasActiveControls ? ru.catalog.noFilteredProducts : ru.catalog.noSubcategoryProducts}</p>
          <Link className="button secondary" href={`/category/${subcategory.category.slug}`}>
            {ru.catalog.backToCategory}
          </Link>
        </div>
      )}
      <PublicServiceStrip />
      <PublicFooter />
    </main>
  );
}
