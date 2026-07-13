import Link from "next/link";
import type { ReactNode } from "react";
import { ru } from "@/lib/i18n/ru";
import type { PublicSearchSort } from "@/lib/publicCatalog";

type CatalogControlsProps = {
  basePath: string;
  currentSort: PublicSearchSort;
  inStockOnly?: boolean;
  newOnly?: boolean;
  query?: string;
  resetHref: string;
  leading?: ReactNode;
};

const sortOptions: { label: string; value: PublicSearchSort }[] = [
  { label: ru.catalog.sortPopular, value: "default" },
  { label: ru.catalog.sortCheaperFirst, value: "price-asc" },
  { label: ru.catalog.sortExpensiveFirst, value: "price-desc" },
  { label: ru.catalog.sortNewItems, value: "new-first" }
];

function buildCatalogHref(
  basePath: string,
  options: {
    query?: string;
    sort: PublicSearchSort;
    inStockOnly: boolean;
    newOnly: boolean;
  }
) {
  const params = new URLSearchParams();

  if (options.query) params.set("q", options.query);
  if (options.sort !== "default") params.set("sort", options.sort);
  if (options.inStockOnly) params.set("inStock", "1");
  if (options.newOnly) params.set("new", "1");

  const queryString = params.toString();

  return `${basePath}${queryString ? `?${queryString}` : ""}`;
}

export function CatalogControls({
  basePath,
  currentSort,
  inStockOnly = false,
  newOnly = false,
  query,
  resetHref,
  leading
}: CatalogControlsProps) {
  const currentSortLabel = sortOptions.find((option) => option.value === currentSort)?.label ?? sortOptions[0].label;
  const hasActiveControls = currentSort !== "default" || inStockOnly || newOnly;

  return (
    <section className="collection-toolbar" aria-label={ru.catalog.filtersAndSorting}>
      <div className="category-subcategory-chips">
        {leading}
        <Link
          aria-current={inStockOnly ? "true" : undefined}
          className={`chip category-chip${inStockOnly ? " is-active" : ""}`}
          href={buildCatalogHref(basePath, {
            query,
            sort: currentSort,
            inStockOnly: !inStockOnly,
            newOnly
          })}
        >
          {ru.catalog.inStockOnly}
        </Link>
        <Link
          aria-current={newOnly ? "true" : undefined}
          className={`chip category-chip${newOnly ? " is-active" : ""}`}
          href={buildCatalogHref(basePath, {
            query,
            sort: currentSort,
            inStockOnly,
            newOnly: !newOnly
          })}
        >
          {ru.catalog.newOnly}
        </Link>
        {hasActiveControls ? (
          <Link className="chip category-chip reset-chip" href={resetHref}>
            {ru.catalog.resetControls}
          </Link>
        ) : null}
      </div>

      <details className="collection-sort-menu">
        <summary aria-label={`${ru.catalog.sortButton}: ${currentSortLabel}`}>
          <span className="collection-sort-symbol" aria-hidden="true" />
          <span className="collection-sort-copy">
            <span className="collection-sort-kicker">{ru.catalog.sortButton}</span>
            <strong>{currentSortLabel}</strong>
          </span>
        </summary>
        <div className="collection-sort-options">
          {sortOptions.map((option) => (
            <Link
              aria-current={option.value === currentSort ? "true" : undefined}
              className="collection-sort-link"
              href={buildCatalogHref(basePath, {
                query,
                sort: option.value,
                inStockOnly,
                newOnly
              })}
              key={option.value}
            >
              {option.label}
            </Link>
          ))}
        </div>
      </details>
    </section>
  );
}
