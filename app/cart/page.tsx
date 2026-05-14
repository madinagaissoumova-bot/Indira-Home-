import { PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { CartClient } from "./CartClient";

async function getCartProducts() {
  const products = await prisma.product.findMany({
    where: {
      status: PRODUCT_STATUS.published,
      category: { status: VISIBILITY_STATUS.visible },
      subcategory: { status: VISIBILITY_STATUS.visible }
    },
    include: {
      images: { orderBy: { displayOrder: "asc" }, take: 1 }
    }
  });

  return products.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    priceRub: product.priceRub,
    stockQuantity: product.stockQuantity,
    imageUrl: product.images[0]?.url ?? null,
    imageAlt: product.images[0]?.alt ?? product.name
  }));
}

export default async function CartPage() {
  const products = await getCartProducts();

  return (
    <main className="page">
      <section className="hero">
        <span className="eyebrow">Корзина</span>
        <h1>Ваша корзина</h1>
        <p>Проверьте товары и количество перед оформлением заказа.</p>
      </section>
      <CartClient products={products} />
    </main>
  );
}
