import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";
import { formatRub } from "@/lib/format";
import { prisma } from "@/lib/db";
import { ru } from "@/lib/i18n/ru";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
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
        where: {
          status: PRODUCT_STATUS.published,
          category: { status: VISIBILITY_STATUS.visible }
        },
        include: {
          category: true,
          images: { orderBy: { displayOrder: "asc" }, take: 1 }
        },
        orderBy: [
          { stockQuantity: "desc" },
          { isNew: "desc" },
          { displayOrder: "asc" },
          { createdAt: "desc" }
        ]
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
          {subcategory.products.map((product) => {
            const image = product.images[0];
            const isSoldOut = product.stockQuantity <= 0;

            return (
              <article className="product-card" key={product.id}>
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
                  <div className="product-meta">{product.category.name}</div>
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
          <p>{ru.catalog.noSubcategoryProducts}</p>
        </div>
      )}
    </main>
  );
}
