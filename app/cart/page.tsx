import { ru } from "@/lib/i18n/ru";
import { listPublicProductsForCart } from "@/lib/publicCatalog";
import { CartClient } from "./CartClient";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PublicFooter } from "@/components/layout/PublicFooter";

export const dynamic = "force-dynamic";

async function getCartProducts() {
  const products = await listPublicProductsForCart();

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
    <main className="page collection-page">
      <Breadcrumbs items={[{ label: ru.common.catalog, href: "/" }, { label: ru.common.cart }]} />
      <section className="hero hero-compact">
        <span className="eyebrow">{ru.cart.eyebrow}</span>
        <h1>{ru.cart.title}</h1>
        <p>{ru.cart.intro}</p>
      </section>
      <CartClient products={products} />
      <PublicFooter />
    </main>
  );
}
