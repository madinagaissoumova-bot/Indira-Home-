import Link from "next/link";
import { PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";
import { formatRub } from "@/lib/format";
import { prisma } from "@/lib/db";

async function getHomeData() {
  const [categories, products] = await Promise.all([
    prisma.category.findMany({
      where: { status: VISIBILITY_STATUS.visible },
      orderBy: { displayOrder: "asc" },
      include: {
        subcategories: {
          where: { status: VISIBILITY_STATUS.visible },
          orderBy: { displayOrder: "asc" }
        }
      }
    }),
    prisma.product.findMany({
      where: {
        status: PRODUCT_STATUS.published,
        category: { status: VISIBILITY_STATUS.visible },
        subcategory: { status: VISIBILITY_STATUS.visible }
      },
      orderBy: [
        { stockQuantity: "desc" },
        { isNew: "desc" },
        { displayOrder: "asc" },
        { createdAt: "desc" }
      ],
      include: {
        category: true,
        subcategory: true,
        images: { orderBy: { displayOrder: "asc" }, take: 1 }
      }
    })
  ]);

  return { categories, products };
}

export default async function HomePage() {
  const { categories, products } = await getHomeData();

  return (
    <main className="page">
      <section className="hero">
        <span className="eyebrow">Товары для дома</span>
        <h1>Indira Home</h1>
        <p>
          Посуда, кухня, техника и декор для дома. Доставка в Чеченской
          Республике, подтверждение заказа по телефону или WhatsApp.
        </p>
      </section>

      <form className="toolbar">
        <div className="field">
          <label htmlFor="search">Поиск товара</label>
          <input
            className="input"
            id="search"
            name="search"
            placeholder="Например: сервиз, чайник, ваза"
            type="search"
          />
        </div>
        <button className="button" type="submit">
          Найти
        </button>
      </form>

      <section aria-labelledby="categories-title">
        <div className="section-heading">
          <h2 id="categories-title">Категории</h2>
        </div>
        <div className="category-list">
          {categories.map((category) => (
            <Link className="chip" href={`/category/${category.slug}`} key={category.id}>
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="products-title">
        <div className="section-heading">
          <h2 id="products-title">Каталог</h2>
          <p>{products.length} товаров</p>
        </div>

        {products.length > 0 ? (
          <div className="product-grid">
            {products.map((product) => {
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
                      {isSoldOut ? (
                        <span className="badge sold-out">Нет в наличии</span>
                      ) : null}
                    </div>
                    <h3 className="product-title">{product.name}</h3>
                    <div className="product-meta">
                      {product.category.name} / {product.subcategory.name}
                    </div>
                    <div className="price-row">
                      <span className="price">{formatRub(product.priceRub)}</span>
                    </div>
                    <Link className="button secondary" href={`/product/${product.slug}`}>
                      Смотреть
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <p>Пока нет товаров для отображения.</p>
          </div>
        )}
      </section>
    </main>
  );
}
