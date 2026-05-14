import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";
import { formatRub } from "@/lib/format";
import { prisma } from "@/lib/db";
import { AddToCartButton } from "@/components/AddToCartButton";

export default async function CategoryPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await prisma.category.findFirst({
    where: { slug, status: VISIBILITY_STATUS.visible },
    include: {
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

  return (
    <main className="page">
      <Link className="chip" href="/">
        Назад
      </Link>
      <section className="hero">
        <span className="eyebrow">Категория</span>
        <h1>{category.name}</h1>
      </section>

      <div className="product-grid">
        {category.products.map((product) => {
          const image = product.images[0];
          const isSoldOut = product.stockQuantity <= 0;

          return (
            <article className="product-card" key={product.id}>
              {image ? <img className="product-image" src={image.url} alt={image.alt} /> : null}
              <div className="product-body">
                {isSoldOut ? <span className="badge sold-out">Нет в наличии</span> : null}
                <h3 className="product-title">{product.name}</h3>
                <div className="product-meta">{product.subcategory.name}</div>
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
    </main>
  );
}
