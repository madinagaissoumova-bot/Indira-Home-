import { PRODUCT_STATUS, VISIBILITY_STATUS } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { ru } from "@/lib/i18n/ru";
import { CheckoutClient } from "./CheckoutClient";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

export const dynamic = "force-dynamic";

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
        items={[
          { label: ru.common.catalog, href: "/" },
          { label: ru.common.cart, href: "/cart" },
          { label: ru.checkout.breadcrumb }
        ]}
      />
      <section className="hero hero-compact">
        <span className="eyebrow">{ru.checkout.eyebrow}</span>
        <h1>{ru.checkout.title}</h1>
        <p>{ru.checkout.intro}</p>
      </section>
      <CheckoutClient products={products} />
    </main>
  );
}
