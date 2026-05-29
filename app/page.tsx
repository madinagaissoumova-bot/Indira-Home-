import Link from "next/link";
import type { CSSProperties } from "react";
import type { Prisma } from "@prisma/client";
import { ProductCard } from "@/components/catalog/ProductCard";
import { prisma } from "@/lib/db";
import { ru } from "@/lib/i18n/ru";
import { listVisibleCategories, publicProductOrderBy, publicProductWhere } from "@/lib/publicCatalog";

type HomeSearchParams = {
  q?: string;
  category?: string;
  subcategory?: string;
  inStock?: string;
  new?: string;
  sort?: string;
};

function selectedOrderBy(sort: string | undefined): Prisma.ProductOrderByWithRelationInput[] {
  if (sort === "price-asc") return [{ priceRub: "asc" }, ...publicProductOrderBy];
  if (sort === "price-desc") return [{ priceRub: "desc" }, ...publicProductOrderBy];
  if (sort === "new") return [{ isNew: "desc" }, ...publicProductOrderBy];
  return publicProductOrderBy;
}

function buildProductsWhere(params: HomeSearchParams): Prisma.ProductWhereInput {
  const query = params.q?.trim();

  return {
    ...publicProductWhere,
    ...(params.category ? { category: { ...publicProductWhere.category, slug: params.category } } : {}),
    ...(params.subcategory ? { subcategory: { ...publicProductWhere.subcategory, slug: params.subcategory } } : {}),
    ...(params.inStock === "1" ? { stockQuantity: { gt: 0 } } : {}),
    ...(params.new === "1" ? { isNew: true } : {}),
    ...(query
      ? {
          OR: [
            { name: { contains: query } },
            { description: { contains: query } },
            { brand: { contains: query } }
          ]
        }
      : {})
  };
}

async function getHomeData(params: HomeSearchParams) {
  const [categories, products] = await Promise.all([
    listVisibleCategories(),
    prisma.product.findMany({
      where: buildProductsWhere(params),
      include: {
        category: true,
        subcategory: true,
        images: { orderBy: { displayOrder: "asc" }, take: 1 }
      },
      orderBy: selectedOrderBy(params.sort)
    })
  ]);

  return { categories, products };
}

export default async function HomePage({
  searchParams
}: {
  searchParams: Promise<HomeSearchParams>;
}) {
  const params = await searchParams;
  const { categories, products } = await getHomeData(params);
  const heroCategory = categories[0];
  const selectedCategory = categories.find((category) => category.slug === params.category);
  const availableSubcategories = selectedCategory?.subcategories ?? categories.flatMap((category) => category.subcategories);
  const hasActiveFilters = Boolean(params.q || params.category || params.subcategory || params.inStock || params.new || params.sort);
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

      <section className="catalogue-section" aria-labelledby="catalogue-title">
        <div className="section-heading catalogue-heading">
          <div>
            <span className="eyebrow">{ru.catalog.collection}</span>
            <h2 id="catalogue-title">{ru.catalog.title}</h2>
            <p>{ru.catalog.intro}</p>
          </div>
          <span>{ru.catalog.productCount(products.length)}</span>
        </div>

        <form className="catalogue-controls" action="/">
          <label>
            <span>{ru.catalog.searchLabel}</span>
            <input
              className="input"
              defaultValue={params.q ?? ""}
              name="q"
              placeholder={ru.catalog.searchPlaceholder}
              type="search"
            />
          </label>

          <label>
            <span>{ru.catalog.categoryLabel}</span>
            <select className="input" defaultValue={params.category ?? ""} name="category">
              <option value="">{ru.catalog.allCategories}</option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>{ru.catalog.subcategoryLabel}</span>
            <select className="input" defaultValue={params.subcategory ?? ""} name="subcategory">
              <option value="">{ru.catalog.allSubcategories}</option>
              {availableSubcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.slug}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>{ru.catalog.sortLabel}</span>
            <select className="input" defaultValue={params.sort ?? ""} name="sort">
              <option value="">{ru.catalog.defaultSort}</option>
              <option value="price-asc">{ru.catalog.sortPriceAsc}</option>
              <option value="price-desc">{ru.catalog.sortPriceDesc}</option>
              <option value="new">{ru.catalog.sortNewFirst}</option>
            </select>
          </label>

          <div className="checkbox-row catalogue-checks">
            <label>
              <input defaultChecked={params.inStock === "1"} name="inStock" type="checkbox" value="1" />
              {ru.catalog.inStockOnly}
            </label>
            <label>
              <input defaultChecked={params.new === "1"} name="new" type="checkbox" value="1" />
              {ru.catalog.newOnly}
            </label>
          </div>

          <div className="filter-actions">
            {hasActiveFilters ? (
              <Link className="button secondary" href="/">
                {ru.catalog.resetFilters}
              </Link>
            ) : null}
            <button className="button" type="submit">
              {ru.catalog.applyFilters}
            </button>
          </div>
        </form>

        {products.length > 0 ? (
          <div className="product-grid compact home-products">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>{hasActiveFilters ? ru.catalog.noFilteredProducts : ru.catalog.noProducts}</p>
            {hasActiveFilters ? (
              <Link className="button secondary" href="/">
                {ru.catalog.resetFilters}
              </Link>
            ) : null}
          </div>
        )}
      </section>
    </main>
  );
}
