import { PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { CheckoutClient } from "./CheckoutClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";

async function getCheckoutProducts() {
  const products = await prisma.product.findMany({
    where: {
      status: PRODUCT_STATUS.published,
      category: { status: VISIBILITY_STATUS.visible },
      subcategory: { status: VISIBILITY_STATUS.visible }
    },
    select: {
      id: true,
      name: true,
      priceRub: true,
      stockQuantity: true
    }
  });

  return products;
}

export default async function CheckoutPage() {
  const products = await getCheckoutProducts();

  return (
    <main className="page">
      <Breadcrumbs
        items={[{ label: "Каталог", href: "/" }, { label: "Корзина", href: "/cart" }, { label: "Оформление заказа" }]}
      />
      <section className="hero hero-compact">
        <span className="eyebrow">Оформление заказа</span>
        <h1>Данные для доставки</h1>
        <p>Заполните контакты. Мы подтвердим заказ по телефону или WhatsApp.</p>
      </section>
      <CheckoutClient products={products} />
    </main>
  );
}
