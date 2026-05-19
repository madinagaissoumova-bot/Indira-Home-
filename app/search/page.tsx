import Link from "next/link";
import Image from "next/image";
import { PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";
import { formatRub } from "@/lib/format";
import { prisma } from "@/lib/db";
import { ru } from "@/lib/i18n/ru";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
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
          status: PRODUCT_STATUS.published,
          category: { status: VISIBILITY_STATUS.visible },
          subcategory: { status: VISIBILITY_STATUS.visible },
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
        orderBy: [
          { stockQuantity: "desc" },
          { isNew: "desc" },
          { createdAt: "desc" }
        ]
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
          {products.map((product) => {
            const image = product.images[0];
            const isSoldOut = product.stockQuantity <= 0;

            return (
              <article className="product-card compact" key={product.id}>
                {image ? (
                  <Image
                    alt={image.alt}
                    className="product-image"
                    height={800}
                    src={image.url}
                    unoptimized
                    width={600}
                  />
                ) : (
                  <div className="product-image" />
                )}
                <div className="product-body">
                  <div className="price-row">
                    {product.isNew ? <span className="badge new">{ru.common.new}</span> : <span />}
                    {isSoldOut ? <span className="badge sold-out">{ru.common.soldOut}</span> : null}
                  </div>
                  <h3 className="product-title">{product.name}</h3>
                  <div className="product-meta">
                    {product.category.name} / {product.subcategory.name}
                  </div>
                  <span className="price">{formatRub(product.priceRub)}</span>
                  <div className="card-actions">
                    <Link className="button secondary" href={`/product/${product.slug}`}>
                      {ru.common.viewProduct}
                    </Link>
                    <AddToCartButton
                      disabled={isSoldOut}
                      label={ru.common.addToCart}
                      productId={product.id}
                    />
                  </div>
                </div>
              </article>
            );
          })}
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
