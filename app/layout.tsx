import type { Metadata } from "next";
import Link from "next/link";
import { listVisibleCategories } from "@/lib/publicCatalog";
import { ru } from "@/lib/i18n/ru";
import { CartNavLink } from "@/components/cart/CartNavLink";
import { FavoritesNavLink } from "@/components/favorites/FavoritesNavLink";
import { CategoryDrawer } from "@/components/layout/CategoryDrawer";
import { PhoneIcon } from "@/components/layout/PublicIcons";
import "./globals.css";

export const metadata: Metadata = {
  title: ru.brand.name,
  description: ru.brand.metadataDescription
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await listVisibleCategories();

  return (
    <html lang="ru">
      <body>
        <header className="site-header">
          <div className="site-header-top">
            <CategoryDrawer categories={categories} />
            <Link className="brand" href="/">
              <span className="brand-mark">Indira</span>
              <span className="brand-home">Home</span>
              <span className="brand-tagline">{ru.brand.tagline}</span>
            </Link>
            <nav className="site-nav" aria-label={ru.layout.mainNav}>
              <Link href="/">{ru.common.home}</Link>
              <Link href="/search?new=1">{ru.common.new}</Link>
              <Link href="/search?sort=price-asc">{ru.common.sale}</Link>
              <Link href="/search?sort=new-first">{ru.common.bestsellers}</Link>
            </nav>
            <form className="header-search" action="/search">
              <label className="sr-only" htmlFor="header-search">
                {ru.layout.searchLabel}
              </label>
              <input
                id="header-search"
                name="q"
                placeholder={ru.layout.searchPlaceholder}
                type="search"
              />
            </form>
            <nav className="site-actions" aria-label={ru.common.pageNavigation}>
              <a className="site-action-link" href="https://wa.me/79889064106" aria-label="WhatsApp" target="_blank" rel="noreferrer">
                <PhoneIcon className="site-action-icon" />
              </a>
              <FavoritesNavLink />
              <CartNavLink />
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
