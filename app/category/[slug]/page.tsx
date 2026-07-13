import Link from "next/link";
import { notFound } from "next/navigation";
import { VISIBILITY_STATUS } from "@/lib/constants";
import { CatalogControls } from "@/components/catalog/CatalogControls";
import { ProductCard } from "@/components/catalog/ProductCard";
import { getCategoryVisualStyle } from "@/lib/categoryVisuals";
import { getFallbackCategory, isDatabaseUnavailable } from "@/lib/fallbackCatalog";
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

const PRODUCTS_PER_PAGE = 12;

function getSearchValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeSort(value: string | undefined): PublicSearchSort {
  if (value === "price-asc" || value === "price-desc" || value === "new-first") {
    return value;
  }

  return "default";
}

function normalizePage(value: string | undefined) {
  const page = Number(value);

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return page;
}

function categoryHref(slug: string, options: {
  sort?: PublicSearchSort;
  page?: number;
  inStockOnly?: boolean;
  newOnly?: boolean;
} = {}) {
  const params = new URLSearchParams();
  const sort = options.sort ?? "default";
  const page = options.page ?? 1;

  if (sort !== "default") {
    params.set("sort", sort);
  }

  if (options.inStockOnly) {
    params.set("inStock", "1");
  }

  if (options.newOnly) {
    params.set("new", "1");
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();

  return `/category/${slug}${query ? `?${query}` : ""}`;
}

export default async function CategoryPage({
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
  const requestedPage = normalizePage(getSearchValue(query.page));
  let category;

  try {
    category = await prisma.category.findFirst({
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
        },
      }
    });
  } catch (error) {
    if (!isDatabaseUnavailable(error)) {
      throw error;
    }

    category = getFallbackCategory(slug);
  }

  if (!category) {
    notFound();
  }

  const sortedProducts = filterAndSortPublicProducts(category.products, {
    inStockOnly,
    newOnly,
    sort: currentSort
  });
  const pageCount = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const currentPage = pageCount > 0 ? Math.min(requestedPage, pageCount) : 1;
  const visibleProducts = sortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );
  const hasActiveControls = currentSort !== "default" || inStockOnly || newOnly;
  return (
    <main className="page collection-page">
      <section className="category-hero category-hero-bleed" style={getCategoryVisualStyle(category.slug)}>
        <div className="category-hero-copy">
          <Breadcrumbs items={[{ label: ru.common.home, href: "/" }, { label: ru.common.catalog, href: "/" }, { label: category.name }]} />
          <h1>{category.name}</h1>
          <p>{ru.catalog.categoryDescriptions[category.slug] ?? ru.catalog.defaultCategoryDescription}</p>
        </div>
      </section>

      <section className="collection-heading-row" aria-label={category.name}>
        <div>
          <h2>{category.name}</h2>
          <span>{ru.catalog.productCount(category.products.length)}</span>
        </div>
      </section>

      <CatalogControls
        basePath={`/category/${category.slug}`}
        currentSort={currentSort}
        inStockOnly={inStockOnly}
        newOnly={newOnly}
        resetHref={`/category/${category.slug}`}
        leading={
          category.subcategories.length > 0 ? (
            <>
              {category.subcategories.map((subcategory) => (
                <Link className="chip category-chip" href={`/subcategory/${subcategory.slug}`} key={subcategory.id}>
                  {subcategory.name}
                </Link>
              ))}
            </>
          ) : null
        }
      />

      {visibleProducts.length > 0 ? (
        <div className="product-grid compact">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>{hasActiveControls ? ru.catalog.noFilteredProducts : ru.catalog.noCategoryProducts}</p>
          <Link className="button secondary" href="/">
            {ru.catalog.backToCategories}
          </Link>
        </div>
      )}

      {pageCount > 1 ? (
        <nav className="catalog-pagination" aria-label={ru.catalog.pages}>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
            <Link
              aria-current={page === currentPage ? "page" : undefined}
              href={categoryHref(category.slug, {
                inStockOnly,
                newOnly,
                page,
                sort: currentSort
              })}
              key={page}
            >
              {page}
            </Link>
          ))}
          {currentPage < pageCount ? (
            <Link
              href={categoryHref(category.slug, {
                inStockOnly,
                newOnly,
                page: currentPage + 1,
                sort: currentSort
              })}
              aria-label={ru.common.nextPage}
            >
              →
            </Link>
          ) : null}
        </nav>
      ) : null}

      <PublicServiceStrip />
      <PublicFooter />
    </main>
  );
}
