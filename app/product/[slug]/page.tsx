import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatRub } from "@/lib/format";
import { prisma } from "@/lib/db";
import { ru } from "@/lib/.i18n/ru";
import { publicProductOrderBy, publicProductWhere } from "@/lib/publicCatalog";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findFirst({
    where: {
      slug,
      ...publicProductWhere
    },
    include: {
      category: true,
      subcategory: true,
      images: { orderBy: { displayOrder: "asc" } }
    }
  });

  if (!product) {
    notFound();
  }

  const image = product.images[0];
  const galleryImages = product.images.length > 0 ? product.images : [];
  const isSoldOut = product.stockQuantity <= 0;
  const characteristics = product.characteristics
    ?.split("\n")
    .map((line) => line.trim())
    .filter(Boolean) ?? [];
  const whatsappText = encodeURIComponent(
    ru.product.whatsappText(product.name)
  );
  const whatsappHref = `https://wa.me/79889064106?text=${whatsappText}`;
  const relatedProducts = await prisma.product.findMany({
    where: {
      id: { not: product.id },
      ...publicProductWhere,
      category: { slug: product.category.slug, status: product.category.status },
      subcategory: { slug: product.subcategory.slug, status: product.subcategory.status }
    },
    include: {
      category: true,
      subcategory: true,
      images: { orderBy: { displayOrder: "asc" }, take: 1 }
    },
    orderBy: publicProductOrderBy,
    take: 4
  });

  return (
    <main className="page product-page">
      <Breadcrumbs
        items={[
          { label: ru.common.catalog, href: "/" },
          { label: product.category.name, href: `/category/${product.category.slug}` },
          { label: product.subcategory.name, href: `/subcategory/${product.subcategory.slug}` },
          { label: product.name }
        ]}
      />
      <div className="product-detail-layout">
        <section className="product-gallery" aria-label={ru.product.photos}>
          {image ? (
            <Image
              alt={image.alt}
              className="gallery-main"
              height={1125}
              src={image.url}
              unoptimized
              width={900}
            />
          ) : (
            <div className="gallery-main" />
          )}
          {galleryImages.length > 1 ? (
            <div className="gallery-thumbs">
              {galleryImages.map((galleryImage) => (
                <Image
                  alt={galleryImage.alt}
                  className="gallery-thumb"
                  height={240}
                  key={galleryImage.id}
                  src={galleryImage.url}
                  unoptimized
                  width={240}
                />
              ))}
            </div>
          ) : null}
        </section>

        <aside className="product-panel">
          <div className="product-panel-heading">
            <span className="eyebrow">
              {product.category.name} / {product.subcategory.name}
            </span>
            <h1>{product.name}</h1>
            {product.brand ? <span className="product-brand">{product.brand}</span> : null}
          </div>

          <div className="product-buy-row">
            <span className="product-detail-price">{formatRub(product.priceRub)}</span>
            {product.isNew ? <span className="badge new">{ru.common.new}</span> : null}
            {isSoldOut ? <span className="badge sold-out">{ru.common.soldOut}</span> : null}
          </div>

          <p className="product-description">{product.description}</p>

          {characteristics.length > 0 ? (
            <div className="product-specs" aria-label={ru.product.characteristics}>
              {characteristics.map((line) => {
                const [label, ...valueParts] = line.split(":");
                const value = valueParts.join(":").trim();

                return (
                  <div className="product-spec-row" key={line}>
                    <span>{value ? label : ru.product.fallbackSpecLabel}</span>
                    <strong>{value || line}</strong>
                  </div>
                );
              })}
            </div>
          ) : null}

          <div className="product-cta-stack">
            <AddToCartButton
              disabled={isSoldOut}
              maxQuantity={product.stockQuantity}
              productId={product.id}
              withQuantity
            />
            <a className="button secondary whatsapp-button" href={whatsappHref} target="_blank" rel="noreferrer">
              {ru.product.whatsappButton}
            </a>
          </div>
        </aside>
      </div>

      {relatedProducts.length > 0 ? (
        <section aria-labelledby="related-title">
          <div className="section-heading">
            <h2 id="related-title">{ru.product.relatedTitle}</h2>
            <Link className="chip" href={`/subcategory/${product.subcategory.slug}`}>
              {ru.product.viewSection}
            </Link>
          </div>
          <div className="product-grid">
            {relatedProducts.map((relatedProduct) => {
              const relatedImage = relatedProduct.images[0];
              const relatedSoldOut = relatedProduct.stockQuantity <= 0;

              return (
                <article className="product-card" key={relatedProduct.id}>
                  {relatedImage ? (
                    <Image
                      alt={relatedImage.alt}
                      className="product-image"
                      height={800}
                      src={relatedImage.url}
                      unoptimized
                      width={600}
                    />
                  ) : (
                    <div className="product-image" />
                  )}
                  <div className="product-body">
                    <div className="price-row">
                      {relatedProduct.isNew ? <span className="badge new">{ru.common.new}</span> : <span />}
                      {relatedSoldOut ? (
                        <span className="badge sold-out">{ru.common.soldOut}</span>
                      ) : null}
                    </div>
                    <h3 className="product-title">{relatedProduct.name}</h3>
                    <div className="product-meta">
                      {relatedProduct.category.name} / {relatedProduct.subcategory.name}
                    </div>
                    <div className="price-row">
                      <span className="price">{formatRub(relatedProduct.priceRub)}</span>
                    </div>
                    <div className="card-actions">
                      <Link className="button secondary" href={`/product/${relatedProduct.slug}`}>
                        {ru.common.viewProduct}
                      </Link>
                      <AddToCartButton
                        disabled={relatedSoldOut}
                        label={ru.common.addToCart}
                        maxQuantity={relatedProduct.stockQuantity}
                        productId={relatedProduct.id}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}
    </main>
  );
}
