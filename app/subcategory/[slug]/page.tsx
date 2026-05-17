import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";
import { formatRub } from "@/lib/format";
import { prisma } from "@/lib/db";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";

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
          { label: "Каталог", href: "/" },
          { label: subcategory.category.name, href: `/category/${subcategory.category.slug}` },
          { label: subcategory.name }
        ]}
      />
      <section className="hero hero-compact">
        <span className="eyebrow">{subcategory.category.name}</span>
        <h1>{subcategory.name}</h1>
        <p>{subcategory.products.length} товаров в разделе</p>
      </section>

      {subcategory.products.length > 0 ? (
        <div className="product-grid">
          {subcategory.products.map((product) => {
            const image = product.images[0];
            const isSoldOut = product.stockQuantity <= 0;

            return (
              <article className="product-card" key={product.id}>
                {image ? (
                  <img className="product-image" src={image.url} alt={image.alt} />
                ) : (
                  <div className="product-image" />
                )}
                <div className="product-body">
                  <div className="price-row">
                    {product.isNew ? <span className="badge new">Новинка</span> : <span />}
                    {isSoldOut ? <span className="badge sold-out">Нет в наличии</span> : null}
                  </div>
                  <h3 className="product-title">{product.name}</h3>
                  <div className="product-meta">{product.category.name}</div>
                  <span className="price">{formatRub(product.priceRub)}</span>
                  <div className="card-actions">
                    <Link className="button secondary" href={`/product/${product.slug}`}>
                      Смотреть
                    </Link>
                    <AddToCartButton
                      disabled={isSoldOut}
                      label="В корзину"
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
          <p>В этой подкатегории пока нет товаров.</p>
        </div>
      )}
    </main>
  );
}
