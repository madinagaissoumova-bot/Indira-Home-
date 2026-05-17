import Link from "next/link";
import { PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";
import { formatRub } from "@/lib/format";
import { prisma } from "@/lib/db";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";

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
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Поиск" }]} />

      <section className="search-heading">
        <span className="eyebrow">Поиск</span>
        <h1>{query ? `Результаты: ${query}` : "Поиск товаров"}</h1>
        <p>
          {query
            ? `${products.length} товаров найдено`
            : "Введите название, бренд или описание товара в поисковой строке."}
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
                  <div className="product-meta">
                    {product.category.name} / {product.subcategory.name}
                  </div>
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
          <p>
            {query
              ? "По этому запросу пока ничего не найдено."
              : "Поиск поможет быстро найти сервизы, посуду, аксессуары для кухни и декор."}
          </p>
          <Link className="button secondary" href="/">
            Вернуться на главную
          </Link>
        </div>
      )}
    </main>
  );
}
