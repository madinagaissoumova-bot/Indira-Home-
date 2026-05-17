import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";
import { getCategoryVisualStyle } from "@/lib/categoryVisuals";
import { formatRub } from "@/lib/format";
import { prisma } from "@/lib/db";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  posuda: "Сервировка, чашки, блюда и наборы для спокойного семейного стола.",
  kuhnya: "Теплые и практичные предметы для кухни, ежедневного ухода и готовки.",
  "bytovaya-tehnika": "Аккуратная техника для дома без лишнего визуального шума.",
  dekor: "Детали, которые добавляют дому мягкость, фактуру и завершенность."
};

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

  return (
    <main className="page">
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Каталог", href: "/" }, { label: category.name }]} />

      <section className="category-hero" style={getCategoryVisualStyle(category.slug)}>
        <div className="category-hero-copy">
          <span className="eyebrow">Коллекция</span>
          <h1>{category.name}</h1>
          <p>{CATEGORY_DESCRIPTIONS[category.slug] ?? "Подборка товаров для красивого и уютного дома."}</p>
        </div>
        <div className="category-hero-image" aria-hidden="true" />
      </section>

      <section className="subcategory-strip" aria-label="Подкатегории">
        {category.subcategories.map((subcategory) => (
          <Link className="chip" href={`/subcategory/${subcategory.slug}`} key={subcategory.id}>
            {subcategory.name}
          </Link>
        ))}
      </section>

      <section className="collection-toolbar" aria-label="Сортировка и фильтры">
        <span>{category.products.length} товаров</span>
        <div>
          <button className="text-control" type="button">Фильтры</button>
          <button className="text-control" type="button">По умолчанию</button>
        </div>
      </section>

      {category.products.length > 0 ? (
        <div className="product-grid compact">
          {category.products.map((product) => {
            const image = product.images[0];
            const isSoldOut = product.stockQuantity <= 0;

            return (
              <article className="product-card compact" key={product.id}>
                {image ? <img className="product-image" src={image.url} alt={image.alt} /> : <div className="product-image" />}
                <div className="product-body">
                  <div className="price-row">
                    {product.isNew ? <span className="badge new">Новинка</span> : <span />}
                    {isSoldOut ? <span className="badge sold-out">Нет в наличии</span> : null}
                  </div>
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
      ) : (
        <div className="empty-state">
          <p>Пока нет товаров в этой категории.</p>
        </div>
      )}
    </main>
  );
}
