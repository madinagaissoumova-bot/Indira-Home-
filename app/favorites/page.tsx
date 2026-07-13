import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { FavoritesClient } from "@/components/favorites/FavoritesClient";
import { PublicFooter, PublicServiceStrip } from "@/components/layout/PublicFooter";
import { ru } from "@/lib/i18n/ru";
import { listPublicProductsForFavorites } from "@/lib/publicCatalog";

export const metadata: Metadata = {
  title: `${ru.common.favorites} - ${ru.brand.name}`,
  description: ru.favorites.intro
};

export default async function FavoritesPage() {
  const products = await listPublicProductsForFavorites();

  return (
    <main className="page collection-page favorites-page">
      <Breadcrumbs items={[{ label: ru.common.home, href: "/" }, { label: ru.common.favorites }]} />

      <section className="search-heading favorites-heading">
        <span className="eyebrow">{ru.favorites.eyebrow}</span>
        <h1>{ru.favorites.title}</h1>
        <p>{ru.favorites.intro}</p>
      </section>

      <FavoritesClient products={products} />
      <PublicServiceStrip />
      <PublicFooter />
    </main>
  );
}
