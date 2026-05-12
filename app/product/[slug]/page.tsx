import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";
import { formatRub } from "@/lib/format";
import { prisma } from "@/lib/db";

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
  const isSoldOut = product.stockQuantity <= 0;

  return (
    <main className="page">
      <Link className="chip" href="/">
        Назад в каталог
      </Link>
      <section className="hero">
        <span className="eyebrow">
          {product.category.name} / {product.subcategory.name}
        </span>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </section>

      <div className="product-grid">
        <article className="product-card">
          {image ? <img className="product-image" src={image.url} alt={image.alt} /> : null}
          <div className="product-body">
            <div className="price-row">
              <span className="price">{formatRub(product.priceRub)}</span>
              {isSoldOut ? <span className="badge sold-out">Нет в наличии</span> : null}
            </div>
            <button className="button" disabled={isSoldOut} type="button">
              {isSoldOut ? "Недоступно" : "Добавить в корзину"}
            </button>
          </div>
        </article>
      </div>
    </main>
  );
}
