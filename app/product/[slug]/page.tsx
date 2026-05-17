import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";
import { formatRub } from "@/lib/format";
import { prisma } from "@/lib/db";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findFirst({
    where: {
      slug,
      status: PRODUCT_STATUS.published,
      category: { status: VISIBILITY_STATUS.visible },
      subcategory: { status: VISIBILITY_STATUS.visible }
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
    `Здравствуйте! Хочу уточнить наличие товара: ${product.name}`
  );
  const whatsappHref = `https://wa.me/79889064106?text=${whatsappText}`;
  const relatedProducts = await prisma.product.findMany({
    where: {
      id: { not: product.id },
      status: PRODUCT_STATUS.published,
      category: { status: VISIBILITY_STATUS.visible, slug: product.category.slug },
      subcategory: { status: VISIBILITY_STATUS.visible, slug: product.subcategory.slug }
    },
    include: {
      category: true,
      subcategory: true,
      images: { orderBy: { displayOrder: "asc" }, take: 1 }
    },
    orderBy: [
      { stockQuantity: "desc" },
      { isNew: "desc" },
      { displayOrder: "asc" },
      { createdAt: "desc" }
    ],
    take: 4
  });

  return (
    <main className="page">
      <Breadcrumbs
        items={[
          { label: "Каталог", href: "/" },
          { label: product.category.name, href: `/category/${product.category.slug}` },
          { label: product.subcategory.name, href: `/subcategory/${product.subcategory.slug}` },
          { label: product.name }
        ]}
      />
      <div className="product-detail-layout">
        <section className="product-gallery" aria-label="Фотографии товара">
          {image ? (
            <img className="gallery-main" src={image.url} alt={image.alt} />
          ) : (
            <div className="gallery-main" />
          )}
          <div className="gallery-thumbs">
            {galleryImages.map((galleryImage) => (
              <img
                className="gallery-thumb"
                key={galleryImage.id}
                src={galleryImage.url}
                alt={galleryImage.alt}
              />
            ))}
          </div>
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
            {product.isNew ? <span className="badge new">Новинка</span> : null}
            {isSoldOut ? <span className="badge sold-out">Нет в наличии</span> : null}
          </div>

          <p className="product-description">{product.description}</p>

          {characteristics.length > 0 ? (
            <div className="product-specs" aria-label="Характеристики">
              {characteristics.map((line) => {
                const [label, ...valueParts] = line.split(":");
                const value = valueParts.join(":").trim();

                return (
                  <div className="product-spec-row" key={line}>
                    <span>{value ? label : "Деталь"}</span>
                    <strong>{value || line}</strong>
                  </div>
                );
              })}
            </div>
          ) : null}

          <div className="product-service-note">
            <span>Заказ без аккаунта</span>
            <span>Подтверждение по телефону или WhatsApp</span>
            <span>Доставка по Чеченской Республике</span>
          </div>

          <div className="product-cta-stack">
            <AddToCartButton disabled={isSoldOut} productId={product.id} />
            <a className="button secondary whatsapp-button" href={whatsappHref} target="_blank" rel="noreferrer">
              Написать в WhatsApp
            </a>
          </div>
        </aside>
      </div>

      {relatedProducts.length > 0 ? (
        <section aria-labelledby="related-title">
          <div className="section-heading">
            <h2 id="related-title">Похожие товары</h2>
            <Link className="chip" href={`/subcategory/${product.subcategory.slug}`}>
              Смотреть раздел
            </Link>
          </div>
          <div className="product-grid">
            {relatedProducts.map((relatedProduct) => {
              const relatedImage = relatedProduct.images[0];
              const relatedSoldOut = relatedProduct.stockQuantity <= 0;

              return (
                <article className="product-card" key={relatedProduct.id}>
                  {relatedImage ? (
                    <img
                      className="product-image"
                      src={relatedImage.url}
                      alt={relatedImage.alt}
                    />
                  ) : (
                    <div className="product-image" />
                  )}
                  <div className="product-body">
                    <div className="price-row">
                      {relatedProduct.isNew ? <span className="badge new">Новинка</span> : <span />}
                      {relatedSoldOut ? (
                        <span className="badge sold-out">Нет в наличии</span>
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
                        Смотреть
                      </Link>
                      <AddToCartButton
                        disabled={relatedSoldOut}
                        label="В корзину"
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
