import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";
import { getCategoryVisual, getCategoryVisualStyle } from "@/lib/categoryVisuals";
import { formatRub } from "@/lib/format";
import { prisma } from "@/lib/db";
import { ru } from "@/lib/i18n/ru";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
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
        where: {
          status: PRODUCT_STATUS.published,
          subcategory: { status: VISIBILITY_STATUS.visible }
        },
        include: {
          subcategory: true,
          images: { orderBy: { displayOrder: "asc" }, take: 1 }
        },
        orderBy: [{ stockQuantity: "desc" }, { isNew: "desc" }]
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
          {category.products.map((product) => {
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
                  <div className="product-meta">{product.subcategory.name}</div>
                  <span className="price">{formatRub(product.priceRub)}</span>
                  <div className="card-actions">
                    <Link className="button secondary" href={`/product/${product.slug}`}>
                      {ru.common.viewProduct}
                    </Link>
                    <AddToCartButton
                      disabled={isSoldOut}
                      label={ru.common.addToCart}
                      maxQuantity={product.stockQuantity}
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
          <p>{ru.catalog.noCategoryProducts}</p>
          <Link className="button secondary" href="/">
            {ru.catalog.backToCategories}
          </Link>
        </div>
      )}
    </main>
  );
}
