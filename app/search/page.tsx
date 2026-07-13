import Link from "next/link";
import { CatalogControls } from "@/components/catalog/CatalogControls";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ru } from "@/lib/i18n/ru";
import { searchPublicProducts, type PublicSearchSort } from "@/lib/publicCatalog";
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

function getSearchTitle(query: string, newOnly: boolean, sort: PublicSearchSort) {
  if (query) return ru.search.resultsTitle(query);
  if (newOnly || sort === "new-first") return ru.catalog.sortNewItems;
  if (sort === "price-asc") return ru.catalog.sortCheaperFirst;
  if (sort === "price-desc") return ru.catalog.sortExpensiveFirst;

  return ru.search.title;
}

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = getSearchValue(params.q)?.trim() ?? "";
  const currentSort = normalizeSort(getSearchValue(params.sort));
  const newOnly = getSearchValue(params.new) === "1";
  const inStockOnly = getSearchValue(params.inStock) === "1";
  const hasActiveSearch = Boolean(query || newOnly || inStockOnly || currentSort !== "default");

  const products = await searchPublicProducts(query, { inStockOnly, newOnly, sort: currentSort });

  return (
    <main className="page collection-page">
      <Breadcrumbs items={[{ label: ru.common.home, href: "/" }, { label: ru.common.search }]} />

      <section className="search-heading">
        <span className="eyebrow">{ru.common.search}</span>
        <h1>{getSearchTitle(query, newOnly, currentSort)}</h1>
        {hasActiveSearch ? <p>{ru.search.resultsCount(products.length)}</p> : null}
      </section>

      <CatalogControls
        basePath="/search"
        currentSort={currentSort}
        inStockOnly={inStockOnly}
        newOnly={newOnly}
        query={query}
        resetHref="/search"
      />

      {hasActiveSearch && products.length > 0 ? (
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
      {hasActiveSearch ? <PublicServiceStrip /> : null}
      <PublicFooter />
    </main>
  );
}
