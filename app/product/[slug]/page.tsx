import Link from "next/link";
import { notFound } from "next/navigation";
import { formatRub } from "@/lib/format";
import { getFallbackProduct, getFallbackRelatedProducts, isDatabaseUnavailable } from "@/lib/fallbackCatalog";
import { prisma } from "@/lib/db";
import { ru } from "@/lib/i18n/ru";
import { publicProductOrderBy, publicProductWhere } from "@/lib/publicCatalog";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ProductGallery } from "@/components/catalog/ProductGallery";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let product;

  try {
    product = await prisma.product.findFirst({
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
  } catch (error) {
    if (!isDatabaseUnavailable(error)) {
      throw error;
    }

    product = getFallbackProduct(slug);
  }

  if (!product) {
    notFound();
  }

  const galleryImages = product.images.length > 0 ? product.images : [];
  const isSoldOut = product.stockQuantity <= 0;
  const whatsappText = encodeURIComponent(
    ru.product.whatsappText(product.name)
  );
  const whatsappHref = `https://wa.me/79889064106?text=${whatsappText}`;
  let relatedProducts;

  try {
    relatedProducts = await prisma.product.findMany({
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
      take: 5
    });
  } catch (error) {
    if (!isDatabaseUnavailable(error)) {
      throw error;
    }

    relatedProducts = getFallbackRelatedProducts(product);
  }

  const featureRows = [
    ru.product.materialCeramic,
    product.brand ? ru.product.brandLabel(product.brand) : ru.product.dishwasherSafe,
    product.characteristics?.split("\n")[0] ?? ru.product.dailyServing,
    ru.product.paymentOnReceipt
  ];

  return (
    <main className="page product-page">
      <div className="product-detail-layout">
        <section className="product-gallery" aria-label={ru.product.photos}>
          <Breadcrumbs
            items={[
              { label: ru.common.home, href: "/" },
              { label: ru.common.catalog, href: "/" },
              { label: product.category.name, href: `/category/${product.category.slug}` },
              { label: product.name }
            ]}
          />
          <ProductGallery images={galleryImages} />
        </section>

        <aside className="product-panel">
          <div className="product-panel-heading">
            {product.isNew ? <span className="eyebrow">{ru.common.new}</span> : null}
            <h1>{product.name}</h1>
            <span className="product-rating">{ru.product.ratingEmpty} <small>{ru.product.ratingCount}</small></span>
          </div>

          <div className="product-buy-row">
            <span className="product-detail-price">{formatRub(product.priceRub)}</span>
            {isSoldOut ? <span className="badge sold-out">{ru.common.soldOut}</span> : null}
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-feature-list" aria-label={ru.product.characteristics}>
            {featureRows.map((row) => (
              <span key={row}>
                <i aria-hidden="true">□</i>
                {row}
              </span>
            ))}
          </div>

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
            <FavoriteButton className="product-favorite-action" productId={product.id} />
          </div>
        </aside>
      </div>

      <section className="product-lower-grid" aria-label={ru.product.information}>
        <div className="product-accordions">
          {[
            ru.product.accordionDescription,
            ru.product.accordionCharacteristics,
            ru.product.accordionCare,
            ru.product.accordionDeliveryPayment
          ].map((title, index) => (
            <details key={title} open={index === 0}>
              <summary>{title}</summary>
              <p>
                {index === 0
                  ? product.description
                  : ru.product.confirmationDetails}
              </p>
            </details>
          ))}
        </div>
        <aside className="product-service-box">
          <div>
            <span aria-hidden="true">▱</span>
            <strong>{ru.product.freeDeliveryTitle}</strong>
            <small>{ru.product.freeDeliveryText}</small>
          </div>
          <div>
            <span aria-hidden="true">□</span>
            <strong>{ru.product.paymentTitle}</strong>
            <small>{ru.product.paymentText}</small>
          </div>
          <div>
            <span aria-hidden="true">○</span>
            <strong>{ru.product.supportTitle}</strong>
            <small>{ru.product.supportText}</small>
          </div>
        </aside>
      </section>

      {relatedProducts.length > 0 ? (
        <section aria-labelledby="related-title">
          <div className="section-heading">
            <h2 id="related-title">{ru.product.relatedTitle}</h2>
            <Link className="chip" href={`/subcategory/${product.subcategory.slug}`}>
              {ru.product.viewSection}
            </Link>
          </div>
          <div className="product-grid">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard compact={false} key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      ) : null}

      <PublicFooter />
    </main>
  );
}
